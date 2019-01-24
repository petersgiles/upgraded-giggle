import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import {
  CommitmentActionActionTypes,
  AddActionToCommitment,
  RemoveActionFromCommitment,
  CommitmentActionActionFailure,
  GetActionsByCommitment,
  LoadCommitmentActions,
} from './commitment-action.actions'
import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators'

import { AppNotification, ClearAppNotification } from '../app.actions'
import { CommitmentActionDataService } from './commitment-action-data.service'
import { DataResult, CommitmentActionsResult } from '../../models'
import { LoggerService } from '@digital-first/df-logging'

@Injectable()
export class CommitmentActionEffects {

  @Effect()
  getActionsByCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentActionActionTypes.GetActionsByCommitment),
      map((action: GetActionsByCommitment) => action.payload.commitment),

      concatMap((commitment: any) => this.service.getActionsByCommitment(commitment)
        .pipe(

          map((result: DataResult<CommitmentActionsResult>) => new LoadCommitmentActions({ actions: result.data.commitmentActions })),
          catchError(error => of(new CommitmentActionActionFailure(error)))
        )
      ))

  @Effect()
  addActionToCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentActionActionTypes.AddActionToCommitment),
      map((action: AddActionToCommitment) => action.payload),
      switchMap((payload: any) => this.service.addActionToCommitment(payload)),
      switchMap((result: any) => [
        new AppNotification({ message: 'Action Stored' }),
        new GetActionsByCommitment({ commitment: result.data.commitment }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentActionActionFailure(error)))

    )

  @Effect()
  removeActionFromCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentActionActionTypes.RemoveActionFromCommitment),
      map((action: RemoveActionFromCommitment) => action.payload),
      switchMap((payload: any) => this.service.removeActionFromCommitment(payload)),
      switchMap((result: any) => [
        new AppNotification({ message: 'Action Removed' }),
        new GetActionsByCommitment({ commitment: result.data.commitment }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentActionActionFailure(error)))

    )

  constructor(private actions$: Actions, private service: CommitmentActionDataService, private logger: LoggerService) { }
}
