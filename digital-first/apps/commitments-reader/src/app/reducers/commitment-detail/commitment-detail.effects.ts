import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import {
  concatMap,
  switchMap,
  map,
  withLatestFrom,
  catchError,
  first
} from 'rxjs/operators'
import { RouteChange, CHANGE, ofRoute } from '../router.actions'
import * as fromRoot from '../../reducers'
import { EMPTY, of } from 'rxjs'
import {
  CommitmentDetailActionTypes,
  CommitmentDetailActions,
  LoadDetailedCommitment,
  LoadHandlingAdvices,
  GetDetailedCommitmentFailure,
  GetHandlingAdvicesFailure,
  UpdatePMCHandlingAdviceFailure,
  UpdatePMOHandlingAdviceFailure,
  GetHandlingAdvices,
  SetPMOHandlingAdviceResult,
  SetPMCHandlingAdviceResult
} from './commitment-detail.actions'

import {
  GetCommitmentDetailGQL,
  GetHandlingAdvicesGQL,
  UpdatePmcHandlingAdviceCommitmentGQL,
  UpdatePmoHandlingAdviceCommitmentGQL
} from '../../generated/graphql'
import { Config } from '../../services/config/config-model'
import { Store } from '@ngrx/store'
import { CommitmentLocation } from '../../models/commitment.model';
import { AppNotification, ClearAppNotification } from '../app/app.actions'
import { generateGUID } from '../../utils'

const mapElectorates = (commitmentLocations) => {
     let commitmentLoation: CommitmentLocation[] = []
       if (commitmentLocations && commitmentLocations.length) {
         commitmentLocations.map(electorate => {
           commitmentLoation.push({
            id: electorate.location.id,
             state: electorate.location.state,
             title: electorate.location.title
           })
         })
       }
     return commitmentLoation
  } 

const setAdvice = (advice) => {
     let label = advice.label
     let value = advice.value

     return {value: value, label: label}
}

const mapCommitmentDetail = (item): any => {
  const mapResult = {
    id: item.id,
    title: item.title,
    description: item.description,
    bookType: item.bookType,
    cost: item.cost,
    date: item.date,
    politicalParty: item.politicalParty,
    announcedBy: item.announcedBy,
    commitmentType: item.commitmentType ? item.commitmentType.title : '',
    status: item.status ? item.status.title : '',
    announcementType: item.announcementType ? item.announcementType.title : '',
    criticalDate: item.criticalDate ? item.criticalDate.title : '',
    portfolio: item.portfolioLookup ? item.portfolioLookup.title : '',
    electorates: mapElectorates(item.commitmentLocations),
    pmcHandlingAdvice: item.pmcHandlingAdviceCommitments.length ? setAdvice(item.pmcHandlingAdviceCommitments[0].handlingAdvice) : { value: "", label: "" },
    pmoHandlingAdvice: item.pmoHandlingAdviceCommitments.length ? setAdvice(item.pmoHandlingAdviceCommitments[0].handlingAdvice) : { value: "", label: "" }
    
  }
  return mapResult
}

@Injectable()
export class CommitmentDetailEffects {
  constructor(
    private actions$: Actions<CommitmentDetailActions>,
    private store$: Store<fromRoot.State>,
    private getCommitmentDetailGQL: GetCommitmentDetailGQL,
    private getHandlingAdvicesGQL: GetHandlingAdvicesGQL,
    private updatePmcHandlingAdviceCommitmentGQL: UpdatePmcHandlingAdviceCommitmentGQL,
    private updatePmoHandlingAdviceCommitmentGQL: UpdatePmoHandlingAdviceCommitmentGQL
  ) {}

  @Effect()
  loadCommitmentDetails$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.GetDetailedCommitment),
    withLatestFrom(this.store$),
    map(([a, s]) => {
      const store = <any>s
      const action = <any>a
      const config: Config = store.app.config
      const bookType = config.header.bookType
      const webId = config.webId
      const siteId = config.siteId
      return {
        id: action.payload.id,
        book: bookType,
        webId: [webId],
        siteId: [siteId]
      }
    }),
    switchMap(config =>
      this.getCommitmentDetailGQL.fetch(config, { fetchPolicy: 'network-only' }).pipe(
        first(),
        map((result: any) => result.data.commitments[0]),
        map(mapCommitmentDetail),
        concatMap(result => [
          new LoadDetailedCommitment(result),
          new GetHandlingAdvices(null)
        ])
      )
    ),
    catchError(error => {
      return of(new GetDetailedCommitmentFailure(error))
    })
  )

  @Effect()
  getHandlingAdvices$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.GetHandlingAdvices),
    withLatestFrom(this.store$),
    map(([a, s]) => {
      const store = <any>s
      const action = <any>a
      const config: Config = store.app.config
      const bookType = config.header.bookType
      const webId = config.webId
      const siteId = config.siteId
      return {
        book: bookType,
        webId: [webId],
        siteId: [siteId]
      }
    }),
    switchMap(config =>
      this.getHandlingAdvicesGQL.fetch(config, { fetchPolicy: 'network-only' }).pipe(
        first(),
        map((result: any) => result.data.handlingAdvices),
        concatMap(advices => [new LoadHandlingAdvices({ advices })])
      )
    ),
    catchError(error => {
      return of(new GetHandlingAdvicesFailure(error))
    })
  )

  @Effect()
  updatePMOHandlingAdvice$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.UpdatePMOHandlingAdvice),
    withLatestFrom(this.store$),
    map(([a, s]) => {
      const store = <any>s
      const action = <any>a
      const config: Config = store.app.config
      const webId = config.webId
      const siteId = config.siteId

      const commitmentId = store.commitmentDetail.commitment.id
      const handlingAdvices = store.commitmentDetail.handlingAdvices
      return {
        messageId: generateGUID(),
        conversationId: generateGUID(),
        data: {
          commitmentId: commitmentId,
          handlingAdviceId: action.payload.handlingAdviceId,
          webId: webId,
          siteId: siteId
        },
        handlingAdvice: handlingAdvices.find(item => { return item.value === action.payload.handlingAdviceId})
      }
    }),
    switchMap(config =>
      this.updatePmoHandlingAdviceCommitmentGQL
        .mutate(config, { fetchPolicy: 'no-cache' })
        .pipe(
          first(),
          map(response => response.data.updatePmoHandlingAdviceCommitment.id),
          concatMap(response => [
            new SetPMOHandlingAdviceResult({
              handlingAdviceId: config.data.handlingAdviceId
            }),
            new AppNotification({ message: `PMO Handling Advice Saved` }),
            new ClearAppNotification()
          ]),
          catchError(error => of(new UpdatePMOHandlingAdviceFailure(error)))
        )
    )
  )

  @Effect()
  updatePMOHandlingAdviceFailure$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.UpdatePMOHandlingAdviceFailure),
    switchMap((error: any) => {
      let message = 'an error occured'

      if (error.payload.networkError) {
        message = `${message} - ${error.payload.networkError.message}`
      }
      return [
        new AppNotification({ message: message }),
        new ClearAppNotification()
      ]
    })
  )

  @Effect()
  updatePMCHandlingAdvice$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.UpdatePMCHandlingAdvice),
    withLatestFrom(this.store$),
    map(([a, s]) => {
      const store = <any>s
      const action = <any>a
      const config: Config = store.app.config
      const webId = config.webId
      const siteId = config.siteId

      const commitmentId = store.commitmentDetail.commitment.id
      const handlingAdvices = store.commitmentDetail.handlingAdvices
      return {
        messageId: generateGUID(),
        conversationId: generateGUID(),
        data: {
          commitmentId: commitmentId,
          handlingAdviceId: action.payload.handlingAdviceId,
          webId: webId,
          siteId: siteId
        },
        handlingAdvice: handlingAdvices.find(item => { return item.value === action.payload.handlingAdviceId})
      }
    }),
    switchMap(config =>
      this.updatePmcHandlingAdviceCommitmentGQL
        .mutate(config, { fetchPolicy: 'no-cache' })
        .pipe(
          first(),
          map(response => response.data.updatePmcHandlingAdviceCommitment.id),
          concatMap(response => [
            new SetPMCHandlingAdviceResult({
              handlingAdviceId: config.data.handlingAdviceId
            })
          ]),
          catchError(error =>
            of(new UpdatePMCHandlingAdviceFailure(error)))
        )
    )
  )

    @Effect()
  updatePMCHandlingAdviceFailure$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.UpdatePMCHandlingAdviceFailure),
    switchMap((error: any) => {
      let message = 'an error occured'

      if (error.payload.networkError) {
        message = `${message} - ${error.payload.networkError.message}`
      }
      return [
        new AppNotification({ message: message }),
        new ClearAppNotification()
      ]
    })
  )  
}
