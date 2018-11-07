import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { PartyActionTypes, LoadPartys, GetAllPartys, PartysActionFailure } from './party.actions'
import { switchMap, map, catchError } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, PartysResult } from '../../models'

@Injectable()
export class PartyEffects {

  @Effect()
  getAllPartys$: Observable<Action> = this.actions$
    .pipe(ofType(PartyActionTypes.GetAllPartys))
    .pipe(
      map((action: GetAllPartys) => action.payload ? action.payload.filter : null),
      switchMap((filter: any) => this.service.filterPartys(filter)
        .pipe(
          map((result: DataResult<PartysResult>) => new LoadPartys(result)),
          catchError(error => of(new PartysActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}
