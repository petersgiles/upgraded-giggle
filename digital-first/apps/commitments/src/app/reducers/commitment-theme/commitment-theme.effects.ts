import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import {
  CommitmentThemeActionTypes,
  AddThemeToCommitment,
  RemoveThemeFromCommitment,
  CommitmentThemeActionFailure,
  GetThemesByCommitment,
  LoadCommitmentThemes,
} from './commitment-theme.actions'
import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators'

import { AppNotification, ClearAppNotification } from '../app.actions'
import { CommitmentThemeDataService } from './commitment-theme-data.service'
import { DataResult, ThemeTypesResult } from '../../models'

@Injectable()
export class CommitmentThemeEffects {

  @Effect()
  getThemesByCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentThemeActionTypes.GetThemesByCommitment),
      map((action: GetThemesByCommitment) => action.payload.commitment),
      concatMap((commitment: any) => this.service.getThemesByCommitment(commitment)
        .pipe(
          map((result: DataResult<ThemeTypesResult>) => new LoadCommitmentThemes({ themes: result.data.themeTypes})),
          catchError(error => of(new CommitmentThemeActionFailure(error)))
        )
      ))

  @Effect()
  addThemeToCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentThemeActionTypes.AddThemeToCommitment),
      map((action: AddThemeToCommitment) => action.payload),
      switchMap((payload: any) => this.service.addThemeToCommitment(payload)),
      switchMap((result: any) => [
        new AppNotification({ message: 'Theme Added' }),
        new GetThemesByCommitment({ commitment: result.data.commitment }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentThemeActionFailure(error)))

    )

  @Effect()
  removeThemeFromCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentThemeActionTypes.RemoveThemeFromCommitment),
      map((action: RemoveThemeFromCommitment) => action.payload),

      switchMap((payload: any) => this.service.removeThemeFromCommitment(payload)),
      switchMap((result: any) => [
        new AppNotification({ message: 'Theme Removed' }),
        new GetThemesByCommitment({ commitment: result.data.commitment }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentThemeActionFailure(error)))

    )

  constructor(private actions$: Actions, private service: CommitmentThemeDataService) { }
}
