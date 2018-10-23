import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { CommitmentTypeActionTypes, LoadCommitmentTypes, GetAllCommitmentTypes, CommitmentTypesActionFailure } from './commitment-type.actions'
import { switchMap, map, catchError } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, CommitmentTypesResult } from '../../models'

@Injectable()
export class CommitmentTypeEffects {

  @Effect()
  getAllCommitmentTypes$: Observable<Action> = this.actions$
    .ofType(CommitmentTypeActionTypes.GetAllCommitmentTypes)
    .pipe(
      map((action: GetAllCommitmentTypes) => action.payload ? action.payload.filter : null),
      switchMap((filter: any) => this.service.filterCommitmentTypes(filter)
        .pipe(
          map((result: DataResult<CommitmentTypesResult>) =>
            new LoadCommitmentTypes(result)),
          catchError(error => of(new CommitmentTypesActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}
