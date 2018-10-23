import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { PortfolioActionTypes, LoadPortfolios, GetAllPortfolios, PortfoliosActionFailure } from './portfolio.actions'
import { switchMap, map, catchError } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, PortfoliosResult } from '../../models'

@Injectable()
export class PortfolioEffects {

  @Effect()
  getAllPortfolios$: Observable<Action> = this.actions$
    .ofType(PortfolioActionTypes.GetAllPortfolios)
    .pipe(
      map((action: GetAllPortfolios) => action.payload ? action.payload.filter : null),
      switchMap((filter: any) => this.service.filterPortfolios(filter)
        .pipe(
          map((result: DataResult<PortfoliosResult>) =>
            new LoadPortfolios(result)),
          catchError(error => of(new PortfoliosActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}
