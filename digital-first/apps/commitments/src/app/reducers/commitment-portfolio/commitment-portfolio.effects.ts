import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import {
  CommitmentPortfolioActionTypes,
  AddPortfolioToCommitment,
  RemovePortfolioFromCommitment,
  CommitmentPortfolioActionFailure,
  GetPortfoliosByCommitment,
  LoadCommitmentPortfolios,
} from './commitment-portfolio.actions'
import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators'

import { AppNotification, ClearAppNotification } from '../app.actions'
import { CommitmentPortfolioDataService } from './commitment-portfolio-data.service'
import { DataResult, CommitmentPortfoliosResult } from '../../models'

@Injectable()
export class CommitmentPortfolioEffects {

  @Effect()
  getPortfoliosByCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentPortfolioActionTypes.GetPortfoliosByCommitment),
      map((action: GetPortfoliosByCommitment) => action.payload.commitment),
      concatMap((commitment: any) => this.service.getPortfoliosByCommitment(commitment)
        .pipe(
          // tslint:disable-next-line:no-console
          tap(result => console.log(result)),
          map((result: DataResult<CommitmentPortfoliosResult>) => new LoadCommitmentPortfolios({ portfolios: result.data.commitmentPortfolios })),
          catchError(error => of(new CommitmentPortfolioActionFailure(error)))
        )
      ))

  @Effect()
  addPortfolioToCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentPortfolioActionTypes.AddPortfolioToCommitment),
      map((action: AddPortfolioToCommitment) => action.payload),
      switchMap((payload: any) => this.service.addPortfolioToCommitment(payload)),
      switchMap((result: any) => [
        new AppNotification({ message: 'Portfolio Added' }),
        new GetPortfoliosByCommitment({ commitment: result.data.commitment }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentPortfolioActionFailure(error)))

    )

  @Effect()
  removePortfolioFromCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(CommitmentPortfolioActionTypes.RemovePortfolioFromCommitment),
      map((action: RemovePortfolioFromCommitment) => action.payload),
      // tslint:disable-next-line:no-console
      tap(payload => console.log(payload)),
      switchMap((payload: any) => this.service.removePortfolioFromCommitment(payload)),
      switchMap((result: any) => [
        new AppNotification({ message: 'Portfolio Removed' }),
        new GetPortfoliosByCommitment({ commitment: result.data.commitment }),
        new ClearAppNotification()
      ]),
      catchError(error => of(new CommitmentPortfolioActionFailure(error)))

    )

  constructor(private actions$: Actions, private service: CommitmentPortfolioDataService) { }
}
