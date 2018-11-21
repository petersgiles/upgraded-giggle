import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { CriticalDateActionTypes, LoadCriticalDates, GetAllCriticalDates, CriticalDatesActionFailure } from './critical-date.actions'
import { switchMap, map, catchError } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, CriticalDatesResult } from '../../models'

@Injectable()
export class CriticalDateEffects {

  @Effect()
  getAllCriticalDates$: Observable<Action> = this.actions$
    .pipe(ofType(CriticalDateActionTypes.GetAllCriticalDates))
    .pipe(
      map((action: GetAllCriticalDates) => action.payload ? action.payload.filter : null),
      switchMap((filter: any) => this.service.filterCriticalDates(filter)
        .pipe(
          map((result: DataResult<CriticalDatesResult>) => new LoadCriticalDates(result)),
          catchError(error => of(new CriticalDatesActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}
