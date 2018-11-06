import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import {
  CommitmentActionTypes,
  CommitmentsActionFailure,
  LoadCommitments,
  GetAllCommitments,
  SetCurrentCommitment,
  UpsertCommitment,
  StoreCommitment,
  AddContactToCommitment,
  RemoveContactFromCommitment
} from './commitment.actions'
import { switchMap, map, catchError, tap, switchMapTo } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, CommitmentsResult, CommitmentResult } from '../../models'
import { Notification, ClearNotification } from '../app.actions'

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
      switchMap((id: any) => this.service.getCommitment({ id })
        .pipe(
          map((result: DataResult<CommitmentResult>) => new UpsertCommitment(result)),
          catchError(error => of(new CommitmentsActionFailure(error)))
        )
      ))

  @Effect()
  storeCommitment$: Observable<Action> = this.actions$
    .ofType(CommitmentActionTypes.StoreCommitment)
    .pipe(
      map((action: StoreCommitment) => action.payload),
      switchMap((commitment: any) => this.service.storeCommitment(commitment)),
      switchMap((result: DataResult<CommitmentResult>) => [
        new Notification({ message: 'Changes Saved' }),
        new SetCurrentCommitment({ id: result.data.commitment.id }),
        new ClearNotification()
      ]),
      catchError(error => of(new CommitmentsActionFailure(error)))

    )

  @Effect()
  addContactToCommitment$: Observable<Action> = this.actions$
    .ofType(CommitmentActionTypes.AddContactToCommitment)
    .pipe(
      map((action: AddContactToCommitment) => action.payload),
      switchMap((payload: any) => this.service.addContactToCommitment(payload)),
      switchMap((result: any) => [
        new Notification({ message: 'Contact Added' }),
        new SetCurrentCommitment({ id: result.commitment.id }),
        new ClearNotification()
      ]),
      catchError(error => of(new CommitmentsActionFailure(error)))

    )

  @Effect()
  removeContactFromCommitment$: Observable<Action> = this.actions$
    .ofType(CommitmentActionTypes.RemoveContactFromCommitment)
    .pipe(
      map((action: RemoveContactFromCommitment) => action.payload),
      switchMap((payload: any) => this.service.removeContactFromCommitment(payload)),
      switchMap((result: any) => [
        new Notification({ message: 'Contact Removed' }),
        new SetCurrentCommitment({ id: result.commitment.id }),
        new ClearNotification()
      ]),
      catchError(error => of(new CommitmentsActionFailure(error)))

    )

  constructor(private actions$: Actions, private service: AppDataService) { }
}
