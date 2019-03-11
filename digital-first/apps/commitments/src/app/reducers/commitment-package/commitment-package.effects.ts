import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import {
  CommitmentPackageActionTypes,
  AddPackageToCommitment,
  RemovePackageFromCommitment,
  CommitmentPackageActionFailure,
  GetPackagesByCommitment,
  LoadCommitmentPackages,
} from './commitment-package.actions'
import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators'

import { AppNotification, ClearAppNotification } from '../app.actions'
import { CommitmentPackageDataService } from './commitment-package-data.service'
import { DataResult, CommitmentPackagesResult } from '../../models'

@Injectable()
export class CommitmentPackageEffects {

  @Effect()
  getPackagesByCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentPackageActionTypes.GetPackagesByCommitment),
      map((action: GetPackagesByCommitment) => action.payload.commitment),
      concatMap((commitment: any) => this.service.getPackagesByCommitment(commitment)
        .pipe(
          // tslint:disable-next-line:no-console
          tap(result => console.log(result)),
          map((result: DataResult<CommitmentPackagesResult>) => new LoadCommitmentPackages({ packages: result.data.commitmentPackages })),
          catchError(error => of(new CommitmentPackageActionFailure(error)))
        )
      ))

  @Effect()
  addPackageToCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentPackageActionTypes.AddPackageToCommitment),
      map((action: AddPackageToCommitment) => action.payload),
      switchMap((payload: any) => this.service.addPackageToCommitment(payload)),
      switchMap((result: any) => [
        new AppNotification({ message: 'Package Added' }),
        new GetPackagesByCommitment({ commitment: result.data.commitment }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentPackageActionFailure(error)))

    )

  @Effect()
  removePackageFromCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentPackageActionTypes.RemovePackageFromCommitment),
      map((action: RemovePackageFromCommitment) => action.payload),
      // tslint:disable-next-line:no-console
      tap(payload => console.log(payload)),
      switchMap((payload: any) => this.service.removePackageFromCommitment(payload)),
      switchMap((result: any) => [
        new AppNotification({ message: 'Package Removed' }),
        new GetPackagesByCommitment({ commitment: result.data.commitment }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentPackageActionFailure(error)))

    )

  constructor(private actions$: Actions, private service: CommitmentPackageDataService) { }
}
