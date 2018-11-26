import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { RelatedCommitmentActionTypes, LoadRelatedCommitments, GetAllRelatedCommitments,
  RelatedCommitmentsActionFailure, GetRelatedCommitmentsByCommitment, StoreRelatedCommitment } from './related-commitment.actions'
import { switchMap, map, catchError, tap } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, RelatedCommitmentsResult } from '../../models'
import { AppNotification, ClearAppNotification } from '../app.actions'

@Injectable()
export class RelatedCommitmentEffects {

  @Effect()
  getRelatedCommitmentsByCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(RelatedCommitmentActionTypes.GetRelatedCommitmentsByCommitment),
      map((action: GetRelatedCommitmentsByCommitment) => action.payload),
      switchMap((payload: any) => this.service.getRelatedCommitmentsByCommitment(payload.commitment)
        .pipe(
          map((result: DataResult<RelatedCommitmentsResult>) => new LoadRelatedCommitments(result)),
          catchError(error => of(new RelatedCommitmentsActionFailure(error)))
        )
      ))

  @Effect()
  storeRelatedCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(RelatedCommitmentActionTypes.StoreRelatedCommitment),
      map((action: StoreRelatedCommitment) => action.payload),
      switchMap((payload: any) => this.service.addCommitmentToCommitment(payload)
      .pipe(
        switchMap((result: DataResult<RelatedCommitmentsResult>) => [
          new AppNotification({ message: 'Map Point Stored' }),
          new GetRelatedCommitmentsByCommitment({ commitment: payload.commitment }),
          new ClearAppNotification()
        ]),
        catchError(error => of(new RelatedCommitmentsActionFailure(error)))
      )
      ),
    )

  constructor(private actions$: Actions, private service: AppDataService) { }
}
