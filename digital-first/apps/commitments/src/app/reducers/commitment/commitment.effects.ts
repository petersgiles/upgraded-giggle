import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { CommitmentActionTypes, CommitmentsActionFailure, LoadCommitments, GetAllCommitments } from './commitment.actions'
import { switchMap, map, catchError } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, CommitmentsResult } from '../../models'

@Injectable()
export class CommitmentEffects {

  @Effect()
  getAllCommitments$: Observable<Action> = this.actions$
    .ofType(CommitmentActionTypes.GetAllCommitments)
    .pipe(
      map((action: GetAllCommitments) => action.payload ? action.payload.filter : null),
      switchMap((filter: any) => this.service.filterCommitments(filter)
        .pipe(
          map((result: DataResult<CommitmentsResult>) =>
            new LoadCommitments(result)),
          catchError(error => of(new CommitmentsActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}
