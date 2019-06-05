import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import {
  concatMap,
  switchMap,
  map,
  withLatestFrom,
  catchError,
  first, mergeMap
} from 'rxjs/operators'

import * as fromRoot from '../../reducers'
import { of, config } from 'rxjs'
import {
  CommitmentDetailActionTypes,
  CommitmentDetailActions,
  LoadDetailedCommitment,
  GetDetailedCommitmentFailure,
  UpdatePMCHandlingAdviceFailure,
  UpdatePMOHandlingAdviceFailure,
  GetHandlingAdvices,
  SetPMOHandlingAdviceResult,
  SetPMCHandlingAdviceResult,
  LoadHandlingAdvices,
  GetHandlingAdvicesFailure
} from './commitment-detail.actions'

import {
  GetCommitmentDetailGQL,
  GetHandlingAdvicesGQL,
  UpdatePmcHandlingAdviceCommitmentGQL,
  UpdatePmoHandlingAdviceCommitmentGQL
} from '../../generated/graphql'
import { Store, select } from '@ngrx/store'
import { CommitmentLocation } from '../../models/commitment.model'
import { generateGUID } from '../../utils'
import {
  AppNotification,
  ClearAppNotification,
  Config,
  HandleGlobalError
} from '@digital-first/df-app-core'

const mapElectorates = commitmentLocations => {
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

const setAdvice = advice => {
  let label = advice.label
  let value = advice.value

  return { value: value, label: label }
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
    pmcHandlingAdvice: item.pmcHandlingAdviceCommitments.length
      ? setAdvice(item.pmcHandlingAdviceCommitments[0].handlingAdvice)
      : { value: ' ', label: ' ' },
    pmoHandlingAdvice: item.pmoHandlingAdviceCommitments.length
      ? setAdvice(item.pmoHandlingAdviceCommitments[0].handlingAdvice)
      : { value: ' ', label: ' ' }
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
      const appConfig: Config = store.app.config
      const bookType = appConfig.header.bookType
      const webId = appConfig.webId
      const siteId = appConfig.siteId
      return {
        id: a.payload.id,
        book: bookType,
        webId: [webId],
        siteId: [siteId]
      }
    }),
    switchMap(request =>
      this.getCommitmentDetailGQL
        .fetch(request, { fetchPolicy: 'network-only' })
        .pipe(
          first(),
          map((result: any) => result.data.commitments[0]),
          map(mapCommitmentDetail),
          concatMap(result => [
            new LoadDetailedCommitment(result),
            new GetHandlingAdvices()
          ]),
          catchError(errorResp => {
            return [new GetDetailedCommitmentFailure(errorResp),
            new  HandleGlobalError({error: {action: 'CommitmentDetailActionTypes.GetDetailedCommitment',
             error: { errorMessage: errorResp.message, stacktrace: errorResp.stack}}}),
             new AppNotification({ message: `Fetching commitment error` }),
             new ClearAppNotification()]
            
})
        )
    )
    
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
        map(result => result.data.handlingAdvices),
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
        handlingAdvice: handlingAdvices.find(
          item => item.value === action.payload.handlingAdviceId
        )
      }
    }),
    switchMap(request =>
      this.updatePmoHandlingAdviceCommitmentGQL
        .mutate(request, { fetchPolicy: 'no-cache' })
        .pipe(
          first(),
          map(response => response.data.updatePmoHandlingAdviceCommitment.id),
          concatMap(response => [
            new SetPMOHandlingAdviceResult({
              handlingAdvice: request.handlingAdvice
            }),
            new AppNotification({ message: `PMO Handling Advice Saved` })
          ]),
          catchError((error: Error) => [
            new UpdatePMOHandlingAdviceFailure(error),
            new AppNotification({
              message: 'An error occured updating PMO Handling'
            })
          ])
        )
    )
  )

  @Effect()
  updatePMCHandlingAdvice$ = this.actions$.pipe(
    ofType(CommitmentDetailActionTypes.UpdatePMCHandlingAdvice),
    withLatestFrom(this.store$),
    map(([a, s]) => {
      const store = <any>s
      const action = <any>a
      const appConfig: Config = store.app.config
      const webId = appConfig.webId
      const siteId = appConfig.siteId

      const commitmentId = store.commitmentDetail.commitment.id
      const handlingAdvices = store.commitmentDetail.handlingAdvices
      return {
        messageId: generateGUID(),
        conversationId: generateGUID(),
        data: {
          commitmentId: commitmentId,
          handlingAdviceId: action.payload.handlingAdviceId,
          webId: webId,
          siteId: siteId,
          test: null
        },
        handlingAdvice: handlingAdvices.find(
          item => item.value === action.payload.handlingAdviceId
        )
      }
    }),
    switchMap(request =>
      this.updatePmcHandlingAdviceCommitmentGQL
        .mutate(request, { fetchPolicy: 'no-cache' })
        .pipe(
          first(),
          map(response => response.data.updatePmcHandlingAdviceCommitment.id),
          concatMap(response => [
            new SetPMCHandlingAdviceResult({
              handlingAdvice: request.handlingAdvice
            }),
            new AppNotification({ message: `PMC Handling Advice Saved` })
          ]),
          catchError(error => [
            new UpdatePMCHandlingAdviceFailure(error),
            new AppNotification({
              message: 'An error occured updating PMO Handling'
            })
          ])
        )
    )
  )
}
