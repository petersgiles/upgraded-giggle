import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { LocationActionTypes, LoadLocations, GetAllLocations, LocationsActionFailure } from './location.actions'
import { switchMap, map, catchError } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, LocationsResult } from '../../models'

@Injectable()
export class LocationEffects {

  @Effect()
  getAllLocations$: Observable<Action> = this.actions$
    .pipe(ofType(LocationActionTypes.GetAllLocations))
    .pipe(
      map((action: GetAllLocations) => action.payload ? action.payload.filter : null),
      switchMap((filter: any) => this.service.filterLocations(filter)
        .pipe(
          map((result: DataResult<LocationsResult>) => new LoadLocations(result)),
          catchError(error => of(new LocationsActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}
