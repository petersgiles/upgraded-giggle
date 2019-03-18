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
  StoreCommitment
} from './commitment.actions'
import { switchMap, map, catchError, tap, switchMapTo, concatMap } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, CommitmentsResult, CommitmentResult } from '../../models'
import { AppNotification, ClearAppNotification } from '../app.actions'
// import { GetMapPointsByCommitment, ClearMapPoints } from '../map-point/map-point.actions'
import { ClearRelatedCommitments, GetRelatedCommitmentsByCommitment } from '../related-commitment/related-commitment.actions'
import { GetContactsByCommitment, ClearCommitmentContacts } from '../commitment-contact/commitment-contact.actions'
import { ClearCommitmentActions, GetActionsByCommitment } from '../commitment-action/commitment-action.actions'
import { ClearRelatedLinks, GetRelatedLinksByCommitment } from '../related-link/related-link.actions'
import { GetMapPointsByCommitment, ClearMapPoints, GetElectoratesByCommitment, ClearElectorates } from '../commitment-delivery-location/commitment-delivery-location.actions'
import { GetPackagesByCommitment } from '../commitment-package/commitment-package.actions';

@Injectable()
export class CommitmentEffects {

  @Effect()
  getAllCommitments$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentActionTypes.GetAllCommitments),
      map((action: GetAllCommitments) => action.payload ? action.payload.filter : null),
      switchMap((filter: any): Observable<Action> => this.service.filterCommitments(filter)
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
          concatMap((result: DataResult<CommitmentResult>) => [
            new UpsertCommitment(result),
            new ClearMapPoints(),
            new ClearElectorates(),
            new ClearRelatedCommitments(),
            new ClearRelatedLinks(),
            new ClearCommitmentActions(),
            new ClearCommitmentContacts(),
            new GetMapPointsByCommitment({ commitment: result.data.commitment.id }),
            new GetElectoratesByCommitment({ commitment: result.data.commitment.id }),
            new GetActionsByCommitment({ commitment: result.data.commitment.id }),
            new GetContactsByCommitment({ commitment: result.data.commitment.id }),
            new GetRelatedCommitmentsByCommitment({ commitment: result.data.commitment.id }),
            new GetRelatedLinksByCommitment({ commitment: result.data.commitment.id }),
            new GetPackagesByCommitment({ commitment: result.data.commitment.id })
          ]),
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
        new AppNotification({ message: 'Commitment Saved', code: 'stored', data: result.data.commitment }),
        new SetCurrentCommitment({ id: result.data.commitment.id }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentsActionFailure(error)))

    )

  constructor(private actions$: Actions, private service: AppDataService) { }
}
