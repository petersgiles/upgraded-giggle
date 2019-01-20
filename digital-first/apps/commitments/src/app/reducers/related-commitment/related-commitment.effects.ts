import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import {
  RelatedCommitmentActionTypes,
  LoadRelatedCommitments,
  RelatedCommitmentsActionFailure,
  GetRelatedCommitmentsByCommitment,
  RemoveCommitmentFromCommitment,
  AddCommitmentToCommitment,
} from './related-commitment.actions'
import { switchMap, map, catchError } from 'rxjs/operators'

import { DataResult, RelatedCommitmentsResult } from '../../models'
import { AppNotification, ClearAppNotification } from '../app.actions'
import {
  SetCurrentCommitment
} from '../commitment/commitment.actions'
import { RelatedCommitmentDataService } from './related-commitment-data.service'

@Injectable()
export class RelatedCommitmentEffects {
  @Effect()
  getRelatedCommitmentsByCommitment$: Observable<Action> = this.actions$.pipe(
    ofType(RelatedCommitmentActionTypes.GetRelatedCommitmentsByCommitment),
    map((action: GetRelatedCommitmentsByCommitment) => action.payload),
    switchMap((payload: any) =>
      this.service.getItemsByCommitment(payload.commitment).pipe(
        map(
          (result: DataResult<RelatedCommitmentsResult>) =>
            new LoadRelatedCommitments(result)
        ),
        catchError(error => of(new RelatedCommitmentsActionFailure(error)))
      )
    )
  )

  @Effect()
  addCommitmentToCommitment$: Observable<Action> = this.actions$.pipe(
    ofType(RelatedCommitmentActionTypes.AddCommitmentToCommitment),
    map((action: AddCommitmentToCommitment) => action.payload),
    switchMap((payload: any) =>
      this.service.addItemToCommitment(payload)
    ),
    switchMap((result: any) => [
      new AppNotification({ message: 'Related Commitment Added' }),
      new SetCurrentCommitment({ id: result.commitment.id }),
      new ClearAppNotification()
    ]),
    catchError(error => of(new RelatedCommitmentsActionFailure(error)))
  )

  @Effect()
  removeCommitmentFromCommitment$: Observable<Action> = this.actions$.pipe(
    ofType(RelatedCommitmentActionTypes.RemoveCommitmentFromCommitment),
    map((action: RemoveCommitmentFromCommitment) => action.payload),
    switchMap((payload: any) =>
      this.service.removeItemFromCommitment(payload)
    ),
    switchMap((result: any) => [
      new AppNotification({ message: 'Related Commitment Removed' }),
      new SetCurrentCommitment({ id: result.commitment.id }),
      new ClearAppNotification()
    ]),
    catchError(error => of(new RelatedCommitmentsActionFailure(error)))
  )

  constructor(
    private actions$: Actions,
    private service: RelatedCommitmentDataService
  ) {}
}
