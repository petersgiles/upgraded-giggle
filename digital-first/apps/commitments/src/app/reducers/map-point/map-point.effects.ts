import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { MapPointActionTypes, LoadMapPoints, GetAllMapPoints, MapPointsActionFailure, GetMapPointsByCommitment, StoreMapPoint } from './map-point.actions'
import { switchMap, map, catchError } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, MapPointsResult } from '../../models'
import { AppNotification, ClearAppNotification } from '../app.actions'
import { ContactsActionFailure } from '../contact/contact.actions'

@Injectable()
export class MapPointEffects {

  @Effect()
  getMapPointsByCommitment$: Observable<Action> = this.actions$
    .pipe(ofType(MapPointActionTypes.GetMapPointsByCommitment))
    .pipe(
      map((action: GetMapPointsByCommitment) => action.payload),
      switchMap((payload: any) => this.service.getMapPointsByCommitment(payload.commitment)
        .pipe(
          map((result: DataResult<MapPointsResult>) => new LoadMapPoints(result)),
          catchError(error => of(new MapPointsActionFailure(error)))
        )
      ))

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

      @Effect()
      storeMapPoint$: Observable<Action> = this.actions$
        .pipe(ofType(MapPointActionTypes.StoreMapPoint))
        .pipe(
          map((action: StoreMapPoint) => action.payload),
          switchMap((payload: any) => this.service.storeMapPoint(payload)),
          switchMap((result: DataResult<MapPointsResult>) => [
            new AppNotification({ message: 'Map Point Stored' }),
            new GetAllMapPoints(),
            new ClearAppNotification()
          ]),
          catchError(error => of(new ContactsActionFailure(error)))
        )

  constructor(private actions$: Actions, private service: AppDataService) { }
}
