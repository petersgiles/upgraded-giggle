import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { WhoAnnouncedTypeActionTypes, LoadWhoAnnouncedTypes, GetAllWhoAnnouncedTypes, WhoAnnouncedTypesActionFailure } from './who-announced-type.actions'
import { switchMap, map, catchError } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, WhoAnnouncedTypesResult } from '../../models'

@Injectable()
export class WhoAnnouncedTypeEffects {

  @Effect()
  getAllWhoAnnouncedTypes$: Observable<Action> = this.actions$
    .pipe(ofType(WhoAnnouncedTypeActionTypes.GetAllWhoAnnouncedTypes))
    .pipe(
      map((action: GetAllWhoAnnouncedTypes) => action.payload ? action.payload.filter : null),
      switchMap((filter: any) => this.service.filterWhoAnnouncedTypes(filter)
        .pipe(
          map((result: DataResult<WhoAnnouncedTypesResult>) => new LoadWhoAnnouncedTypes(result)),
          catchError(error => of(new WhoAnnouncedTypesActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}
