import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { CommitmentActionTypes, CommitmentsActionFailure, LoadCommitments, GetAllCommitments, SetCurrentCommitment, UpsertCommitment } from './commitment.actions'
import { switchMap, map, catchError } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, CommitmentsResult, CommitmentResult } from '../../models'

@Injectable()
export class CommitmentEffects {

  @Effect()
  getAllCommitments$: Observable<Action> = this.actions$
    .ofType(CommitmentActionTypes.GetAllCommitments)
    .pipe(
      map((action: GetAllCommitments) => action.payload ? action.payload.filter : null),
      switchMap((filter: any) => this.service.filterCommitments(filter)
        .pipe(
          map((result: DataResult<CommitmentsResult>) => new LoadCommitments(result)),
          catchError(error => of(new CommitmentsActionFailure(error)))
        )
      ))

    @Effect()
    getCommitmentsById$: Observable<Action> = this.actions$
      .ofType(CommitmentActionTypes.SetCurrentCommitment)
      .pipe(
        map((action: SetCurrentCommitment) => action.payload.id),
        switchMap((id: any) => this.service.getCommitment({id})
          .pipe(
            map((result: DataResult<CommitmentResult>) => new UpsertCommitment(result)),
            catchError(error => of(new CommitmentsActionFailure(error)))
          )
        ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}
