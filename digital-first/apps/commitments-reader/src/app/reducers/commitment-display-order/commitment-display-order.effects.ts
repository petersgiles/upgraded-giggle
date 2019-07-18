import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducers'
import {
  CommitmentDisplayOrderActionTypes,
  SetReOrderedCommitments,
  CommitmentDisplayOrderActions,
  LoadCommitmentDisplayOrders,
  GetCommitmentDisplayOrders,
  SetDisplayOrderListChanged,
  ApplyCommitmentDisplayOrdersFailure
} from './commitment-display-order.actions'
import {
  map,
  concatMap,
  withLatestFrom,
  first,
  catchError,
  switchMap,
  delay} from 'rxjs/operators'
import {
  GetSiteCommitmentDisplayOrdersGQL,
  ApplyCommitmentDisplayOrderGQL
} from '../../generated/graphql'
import { generateGUID } from '../../utils'
import {
  AppNotification} from '@digital-first/df-app-core'
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
  getCommitmentDisplayOrder$ = this.actions$.pipe(
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
    switchMap(request =>
      this.getSiteDisplayOrderGraphQL
        .fetch(request, { fetchPolicy: 'no-cache' })
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
          catchError(error => [
            new ApplyCommitmentDisplayOrdersFailure(error),
            new AppNotification({ message: 'Error occured' })
          ])
        )
    )
  )

  @Effect()
  applyCommitmentDisplayOrder$ = this.actions$.pipe(
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
        applyCommitmentDisplayOrder: {
          siteId: siteId,
          webId: webId,
          orderedCommitmentIds: orderedCommitmentIds
        }
      }
    }),
    concatMap(request =>
       this.applyCommitmentDisplayOrder
        .mutate(request, { fetchPolicy: 'no-cache' })
        .pipe(
          delay(2500),
          concatMap(_ => [
            new SetDisplayOrderListChanged(false),
            new GetCommitmentDisplayOrders(null),
            new GetRefinedCommitments(null),
            new AppNotification({
              message: 'Commitment Display Order Updated'
            })
          ]),
          catchError(error => [
            new ApplyCommitmentDisplayOrdersFailure(error),
            new AppNotification({ message: 'Error occured' })
          ])
        )
    )
  )
}
