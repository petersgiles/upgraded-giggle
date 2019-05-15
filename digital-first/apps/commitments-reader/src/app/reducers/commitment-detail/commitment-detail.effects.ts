import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import {
  concatMap,
  filter,
  switchMap,
  map,
  withLatestFrom,
  tap,
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
import { AppNotification, ClearAppNotification } from '../app/app.actions'
import { generateGUID } from '../../utils'

const mapHandlingadvice = (item): any => {
  if (item && item[0]) {
    const handlingAdvice = item[0].handlingAdvice
    return handlingAdvice.value
  }
  return null
}

const mapCommitmentDetail = (item): any => {
  const mapResult = {
    ...item,
    commitmentType: item.commitmentType ? item.commitmentType.title : '',
    status: item.status ? item.status.title : '',
    announcementType: item.announcementType ? item.announcementType.title : '',
    criticalDate: item.criticalDate ? item.criticalDate.title : '',
    portfolio: item.portfolioLookup ? item.portfolioLookup.title : '',
    // electorates: this.handleElectorates(item.commitmentLocations)
    pmcHandlingAdvice: mapHandlingadvice(item.pmcHandlingAdviceCommitments),
    pmoHandlingAdvice: mapHandlingadvice(item.pmoHandlingAdviceCommitments)
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
      this.getCommitmentDetailGQL
        .fetch(config, { fetchPolicy: 'network-only' })
        .pipe(
          first(),
          map(result => result.data.commitments[0]),
          map(mapCommitmentDetail),
          concatMap(result => [
            new LoadDetailedCommitment(result),
            new GetHandlingAdvices(null)
          ])
        )
    ),
    catchError(error => {
      // tslint:disable-next-line: no-console
      console.log(`💥 error => `, error)
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
      this.getHandlingAdvicesGQL
        .fetch(config, { fetchPolicy: 'network-only' })
        .pipe(
          first(),
          map(result => result.data.handlingAdvices),
          concatMap(advices => [new LoadHandlingAdvices({ advices })])
        )
    ),
    catchError(error => {
      // tslint:disable-next-line: no-console
      console.log(`💥 error => `, error)
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
      return {
        messageId: generateGUID(),
        conversationId: generateGUID(),
        data: {
          commitmentId: commitmentId,
          handlingAdviceId: action.payload.handlingAdviceId,
          webId: webId,
          siteId: siteId
        }
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
          catchError(error => {
            // tslint:disable-next-line: no-console
            console.log(`💥 error => `, error)
            return of(new UpdatePMOHandlingAdviceFailure(error))
          })
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
      return {
        messageId: generateGUID(),
        conversationId: generateGUID(),
        data: {
          commitmentId: commitmentId,
          handlingAdviceId: action.payload.handlingAdviceId,
          webId: webId,
          siteId: siteId
        }
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
          ])
        )
    ),
    catchError(error => {
      // tslint:disable-next-line: no-console
      console.log(`💥 error => `, error)
      return of(new UpdatePMCHandlingAdviceFailure(error))
    })
  )
}
