import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { MapPointActionTypes, LoadMapPoints, GetAllMapPoints, MapPointsActionFailure, GetMapPointsByCommitment, StoreMapPoint } from './map-point.actions'
import { switchMap, map, catchError, tap } from 'rxjs/operators'

import { AppDataService } from '../../services/app-data.service'
import { DataResult, MapPointsResult } from '../../models'
import { AppNotification, ClearAppNotification } from '../app.actions'
import { ContactsActionFailure } from '../contact/contact.actions'

@Injectable()
export class MapPointEffects {

  @Effect()
  getMapPointsByCommitment$: Observable<Action> = this.actions$
    .pipe(
      ofType(MapPointActionTypes.GetMapPointsByCommitment),
      map((action: GetMapPointsByCommitment) => action.payload),
      switchMap((payload: any) => this.service.getMapPointsByCommitment(payload.commitment)
        .pipe(
          // tslint:disable-next-line:no-console
          tap(result => console.log('Get Map Points By Commitment', result)),
          map((result: DataResult<MapPointsResult>) => new LoadMapPoints(result)),
          catchError(error => of(new MapPointsActionFailure(error)))
        )
      ))

  @Effect()
  storeMapPoint$: Observable<Action> = this.actions$
    .pipe(
      ofType(MapPointActionTypes.StoreMapPoint),
      map((action: StoreMapPoint) => action.payload),
      // tslint:disable-next-line:no-console
      tap(payload => console.log('Store Map Point', payload)),
      switchMap((payload: any) => this.service.storeMapPoint(payload)
      .pipe(
        switchMap((result: DataResult<MapPointsResult>) => [
          new AppNotification({ message: 'Map Point Stored' }),
          new GetMapPointsByCommitment({ commitment: payload.commitment }),
          new ClearAppNotification()
        ]),
        catchError(error => of(new MapPointsActionFailure(error)))
      )
      ),
    )

  constructor(private actions$: Actions, private service: AppDataService) { }
}
