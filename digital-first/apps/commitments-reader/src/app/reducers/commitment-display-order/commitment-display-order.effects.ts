import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducers'
import {
  CommitmentDisplayOrderActionTypes,
  SetReOrderedCommitments,
  CommitmentDisplayOrderActions,
  LoadCommitmentDisplayOrders,
  GetCommitmentDisplayOrders
} from './commitment-display-order.actions'
import {
  map,
  concatMap,
  withLatestFrom,
  first,
  catchError,
  delayWhen,
  switchMap,
  delay
} from 'rxjs/operators'
import {
  GetSiteCommitmentDisplayOrdersGQL,
  ApplyCommitmentDisplayOrderGQL
} from '../../generated/graphql'
import { generateGUID } from '../../utils'
import {
  AppNotification,
  ClearAppNotification,
  HideSpinner
} from '../app/app.actions'
import { interval } from 'rxjs'
import { GetRefinedCommitments } from '../overview/overview.actions'

@Injectable()
export class CommitmentDisplayOrderEffects {
  constructor(
    private actions$: Actions<CommitmentDisplayOrderActions>,
    private store$: Store<fromRoot.State>,
    private getSiteDisplayOrderGraphQL: GetSiteCommitmentDisplayOrdersGQL,
    private applyCommitmentDisplayOrder: ApplyCommitmentDisplayOrderGQL
  ) {}

  @Effect()
  $getCommitmentDisplayOrder = this.actions$.pipe(
    ofType(CommitmentDisplayOrderActionTypes.GetCommitmentDisplayOrders),
    withLatestFrom(this.store$),
    map(([_, store]) => {
      const rootStore = <any>store
      const config = rootStore.app.config
      const webId = config.webId
      const siteId = config.siteId
      return {
        siteId: siteId,
        webId: webId
      }
    }),
    switchMap(config =>
      this.getSiteDisplayOrderGraphQL
        .fetch(config, { fetchPolicy: 'no-cache' })
        .pipe(
          first(),
          concatMap(result => {
            const orderedCommitmentIds = result.data.siteCommitmentDisplayOrders.map(
              c => c.commitmentId
            )
            return [
              new LoadCommitmentDisplayOrders(result),
              new SetReOrderedCommitments(orderedCommitmentIds)
            ]
          }),
          this.catchError()
        )
    )
  )

  @Effect()
  $applyCommitmentDisplayOrder = this.actions$.pipe(
    ofType(CommitmentDisplayOrderActionTypes.ApplyCommitmentDisplayOrders),
    withLatestFrom(this.store$),
    map(([_, store]) => {
      const rootStore = <any>store
      const config = rootStore.app.config
      const webId = config.webId
      const siteId = config.siteId
      const orderedCommitmentIds =
        rootStore.commitmentDisplayOrder.reOrderedCommitmentIds
      return {
        messageId: generateGUID(),
        //conversationId: generateGUID(),
        applyCommitmentDisplayOrder: {
          siteId: siteId,
          webId: webId,
          orderedCommitmentIds: orderedCommitmentIds
        }
      }
    }),
    concatMap(config =>
      this.applyCommitmentDisplayOrder
        .mutate(config, { fetchPolicy: 'no-cache' })
        .pipe(
          delay(2500),
          concatMap(_ => [
            new GetCommitmentDisplayOrders(null),
            new GetRefinedCommitments(null),
            new HideSpinner(),
            new AppNotification({
              message: 'Commitment Display Order applied'
            })
          ]),
          this.catchError()
        )
    )
  )

  private catchError() {
    return catchError(error => {
      let message = 'an error occured'
      if (error.networkError) {
        message = `${message} - ${error.networkError.message}`
      }
      return [
        new AppNotification({ message: message }),
        new ClearAppNotification(),
        new HideSpinner()
      ]
    })
  }
}
