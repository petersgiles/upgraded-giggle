import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducers'
import {
  CommitmentDisplayOrderActionTypes,
  SetReOrderedCommitments,
  CommitmentDisplayOrderActions,
  LoadCommitmentDisplayOrders,
  GetCommitmentDisplayOrdersFailure
} from './commitment-display-order.actions'
import {
  map,
  switchMap,
  concatMap,
  withLatestFrom,
  first,
  catchError
} from 'rxjs/operators'
import { GetSiteCommitmentDisplayOrdersGQL } from '../../generated/graphql'

@Injectable()
export class CommitmentDisplayOrderEffects {
  constructor(
    private actions$: Actions<CommitmentDisplayOrderActions>,
    private store$: Store<fromRoot.State>,
    private getSiteDisplayOrderGraphQL: GetSiteCommitmentDisplayOrdersGQL
  ) {}

  @Effect()
  $getCommitmentDisplayOrder = this.actions$.pipe(
    ofType(CommitmentDisplayOrderActionTypes.GetCommitmentDisplayOrders),
    withLatestFrom(this.store$),
    map(([action, store]) => {
      const rootStore = <any>store
      const config = rootStore.app.config
      const webId = config.webId
      const siteId = config.siteId
      return {
        siteId: siteId,
        webId: webId
      }
    }),
    concatMap(config =>
      this.getSiteDisplayOrderGraphQL.fetch(config).pipe(
        first(),
        concatMap(result => [new LoadCommitmentDisplayOrders(result)]),
        catchError(error => [new GetCommitmentDisplayOrdersFailure(error)])
      )
    )
  )

  @Effect()
  $applyCommitmentDisplayOrder = this.actions$.pipe(
    ofType(CommitmentDisplayOrderActionTypes.ApplyCommitmentDisplayOrders),
    concatMap(action => [])
  )

  @Effect()
  $setReOrderedCommitments = this.actions$.pipe(
    ofType(CommitmentDisplayOrderActionTypes.SetReOrderedCommitments),
    switchMap(action => [new SetReOrderedCommitments(action.payload)])
  )
}
