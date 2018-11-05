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
  AddContactToCommitment
} from './commitment.actions'
import { switchMap, map, catchError, tap } from 'rxjs/operators'

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
      switchMap((commitment: any) => this.service.storeCommitment(commitment)
        .pipe(
          // tslint:disable-next-line:no-console
          tap((result: DataResult<CommitmentResult>) => console.log('Reload Commitment =>', result)),
          map((result: DataResult<CommitmentResult>) => new SetCurrentCommitment({ id: result.data.commitment.id })),
          catchError(error => of(new CommitmentsActionFailure(error)))
        )
      ))

  @Effect()
  addContactToCommitment$: Observable<Action> = this.actions$
    .ofType(CommitmentActionTypes.AddContactToCommitment)
    .pipe(
      map((action: AddContactToCommitment) => action.payload),
      // tslint:disable-next-line:no-console
      tap((payload: any) => console.log('Add Contact To Commitment Payload=>', payload)),
      switchMap((payload: any) => this.service.addContactToCommitment(payload)
        .pipe(
          // tslint:disable-next-line:no-console
          tap((result: any) => console.log('Reload Commitment =>', result)),
          map((result: any) => new SetCurrentCommitment({ id: result.commitment.id })),
          catchError(error => of(new CommitmentsActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}
