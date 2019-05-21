import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import * as fromRoot from '../../reducers'
import {
  CommitmentDisplayOrderActionTypes,
  SetReOrderedCommitments,
  CommitmentDisplayOrderActions
} from './commitment-display-order.actions'
import { map, switchMap, concatMap } from 'rxjs/operators'

@Injectable()
export class CommitmentDisplayOrderEffects {
  constructor(
    private actions$: Actions<CommitmentDisplayOrderActions>,
    private store$: Store<fromRoot.State>
  ) {}

  @Effect()
  $getCommitmentDisplayOrder = this.actions$.pipe(
    ofType(CommitmentDisplayOrderActionTypes.GetCommitmentDisplayOrders),
    concatMap(action => [])
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
