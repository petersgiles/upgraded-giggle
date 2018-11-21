import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
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
  RemoveContactFromCommitment,
  AddMapPointToCommitment,
  RemoveMapPointFromCommitment,
  AddElectorateToCommitment,
  RemoveElectorateFromCommitment
} from './commitment.actions'
import { switchMap, map, catchError, tap, switchMapTo, concatMap } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, CommitmentsResult, CommitmentResult } from '../../models'
import { AppNotification, ClearAppNotification } from '../app.actions'
import { GetMapPointsByCommitment } from '../map-point/map-point.actions'

@Injectable()
export class CommitmentEffects {

  @Effect()
  getAllCommitments$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentActionTypes.GetAllCommitments),
      map((action: GetAllCommitments) => action.payload ? action.payload.filter : null),
      switchMap((filter: any) => this.service.filterCommitments(filter)
        .pipe(
          map((result: DataResult<CommitmentsResult>) => new LoadCommitments(result)),
          catchError(error => of(new CommitmentsActionFailure(error)))
        )
      ))

  @Effect()
  getCommitmentsById$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentActionTypes.SetCurrentCommitment),
      map((action: SetCurrentCommitment) => action.payload.id),
      switchMap((id: any) => this.service.getCommitment({ id })
        .pipe(
          map((result: DataResult<CommitmentResult>) => new UpsertCommitment(result)),
          catchError(error => of(new CommitmentsActionFailure(error)))
        )
      ))

  @Effect()
  storeCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentActionTypes.StoreCommitment),
      map((action: StoreCommitment) => action.payload),
      switchMap((commitment: any) => this.service.storeCommitment(commitment)),
      switchMap((result: DataResult<CommitmentResult>) => [
        new AppNotification({ message: 'Commitment Saved' }),
        new SetCurrentCommitment({ id: result.data.commitment.id }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentsActionFailure(error)))

    )

  @Effect()
  addContactToCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentActionTypes.AddContactToCommitment),
      map((action: AddContactToCommitment) => action.payload),
      switchMap((payload: any) => this.service.addContactToCommitment(payload)),
      switchMap((result: any) => [
        new AppNotification({ message: 'Contact Added' }),
        new SetCurrentCommitment({ id: result.commitment.id }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentsActionFailure(error)))

    )

  @Effect()
  removeContactFromCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentActionTypes.RemoveContactFromCommitment),
      map((action: RemoveContactFromCommitment) => action.payload),
      switchMap((payload: any) => this.service.removeContactFromCommitment(payload)),
      switchMap((result: any) => [
        new AppNotification({ message: 'Contact Removed' }),
        new SetCurrentCommitment({ id: result.commitment.id }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentsActionFailure(error)))

    )

  @Effect()
  addElectorateToCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentActionTypes.AddElectorateToCommitment),
      map((action: AddElectorateToCommitment) => action.payload),
      switchMap((payload: any) => this.service.addElectorateToCommitment(payload)),
      switchMap((result: any) => [
        new AppNotification({ message: 'Electorate Added' }),
        new SetCurrentCommitment({ id: result.commitment.id }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentsActionFailure(error)))

    )

  @Effect()
  removeElectorateFromCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentActionTypes.RemoveElectorateFromCommitment),
      map((action: RemoveElectorateFromCommitment) => action.payload),
      switchMap((payload: any) => this.service.removeElectorateFromCommitment(payload)),
      switchMap((result: any) => [
        new AppNotification({ message: 'Electorate Removed' }),
        new SetCurrentCommitment({ id: result.commitment.id }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentsActionFailure(error)))

    )

  @Effect()
  addMapPointToCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentActionTypes.AddMapPointToCommitment),
      map((action: AddMapPointToCommitment) => action.payload),
      switchMap((payload) => this.service.storeMapPoint(payload.mapPoint)
        .pipe(
          concatMap(_ => this.service.addMapPointToCommitment(payload)
            .pipe(
              concatMap((result: any) => [
                new GetMapPointsByCommitment({commitment: payload.commitment}),
                new AppNotification({ message: 'Map Point Added' }),
                new SetCurrentCommitment({ id: payload.commitment }),
                new ClearAppNotification()
              ]),
              catchError(error => of(new CommitmentsActionFailure(error))
              )
            )
          )
        )
      )
    )

  @Effect()
  removeMapPointFromCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentActionTypes.RemoveMapPointFromCommitment),
      map((action: RemoveMapPointFromCommitment) => action.payload),
      switchMap((payload: any) => this.service.removeMapPointFromCommitment(payload)
        .pipe(
          concatMap((result: any) => [
            new AppNotification({ message: 'Map Point Removed' }),
            new SetCurrentCommitment({ id: result.commitment.id }),
            new ClearAppNotification()
          ]),
          catchError(error => of(new CommitmentsActionFailure(error))
          )))
    )

  constructor(private actions$: Actions, private service: AppDataService) { }
}
