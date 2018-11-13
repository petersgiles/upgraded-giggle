import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { MapPointActionTypes, LoadMapPoints, GetAllMapPoints, MapPointsActionFailure } from './map-point.actions'
import { switchMap, map, catchError } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, MapPointsResult } from '../../models'

@Injectable()
export class MapPointEffects {

  @Effect()
  getAllMapPoints$: Observable<Action> = this.actions$
    .pipe(ofType(MapPointActionTypes.GetAllMapPoints))
    .pipe(
      map((action: GetAllMapPoints) => action.payload ? action.payload.filter : null),
      switchMap((filter: any) => this.service.filterMapPoints(filter)
        .pipe(
          map((result: DataResult<MapPointsResult>) => new LoadMapPoints(result)),
          catchError(error => of(new MapPointsActionFailure(error)))
        )
      ))

  constructor(private actions$: Actions, private service: AppDataService) { }
}
