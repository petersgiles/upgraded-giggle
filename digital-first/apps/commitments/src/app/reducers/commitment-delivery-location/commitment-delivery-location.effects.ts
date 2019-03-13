import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import {
  DeliveryLocationActionTypes,
  DeliveryLocationsActionFailure,
  AddElectorateToCommitment,
  RemoveElectorateFromCommitment,
  AddMapPointToCommitment,
  RemoveMapPointFromCommitment,
  GetMapPointsByCommitment,
  LoadMapPoints,
  GetElectoratesByCommitment,
  LoadElectorates
} from './commitment-delivery-location.actions'
import { switchMap, map, catchError, tap, concatMap } from 'rxjs/operators'
import { AppNotification, ClearAppNotification } from '../app.actions'
import {
  SetCurrentCommitment,
  CommitmentsActionFailure
} from '../commitment/commitment.actions'
import { DeliveryLocationDataService } from './commitment-delivery-location-data.service'
import { DataResult, MapPointsResult } from '../../models'
import { ElectoratesResult } from '../../models/location.model'

@Injectable()
export class DeliveryLocationEffects {
  @Effect()
  addElectorateToCommitment$: Observable<Action> = this.actions$.pipe(
    ofType(DeliveryLocationActionTypes.AddElectorateToCommitment),
    map((action: AddElectorateToCommitment) => action.payload),
    switchMap((payload: any) =>
      this.service.addElectorateToCommitment(payload)
    ),
    switchMap((result: any) => [
      new AppNotification({ message: 'Location Added' }),
      new SetCurrentCommitment({ id: result.commitment.id }),
      new ClearAppNotification()
    ]),
    catchError(error => of(new CommitmentsActionFailure(error)))
  )

  @Effect()
  removeElectorateFromCommitment$: Observable<Action> = this.actions$.pipe(
    ofType(DeliveryLocationActionTypes.RemoveElectorateFromCommitment),
    map((action: RemoveElectorateFromCommitment) => action.payload),
    switchMap((payload: any) =>
      this.service.removeElectorateFromCommitment(payload)
    ),
    switchMap((result: any) => [
      new AppNotification({ message: 'Location Removed' }),
      new SetCurrentCommitment({ id: result.commitment.id }),
      new ClearAppNotification()
    ]),
    catchError(error => of(new DeliveryLocationsActionFailure(error)))
  )

  @Effect()
  addMapPointToCommitment$: Observable<Action> = this.actions$.pipe(
    ofType(DeliveryLocationActionTypes.AddMapPointToCommitment),
    map((action: AddMapPointToCommitment) => action.payload),
    switchMap(payload =>
      this.service.storeMapPoint(payload.mapPoint).pipe(
        concatMap(_ =>
          this.service.addMapPointToCommitment(payload).pipe(
            concatMap((result: any) => [
              new GetMapPointsByCommitment({ commitment: payload.commitment }),
              new AppNotification({ message: 'Map Point Added' }),
              new SetCurrentCommitment({ id: payload.commitment }),
              new ClearAppNotification()
            ]),
            catchError(error => of(new DeliveryLocationsActionFailure(error)))
          )
        )
      )
    )
  )

  @Effect()
  removeMapPointFromCommitment$: Observable<Action> = this.actions$.pipe(
    ofType(DeliveryLocationActionTypes.RemoveMapPointFromCommitment),
    map((action: RemoveMapPointFromCommitment) => action.payload),
    switchMap((payload: any) =>
      this.service.removeMapPointFromCommitment(payload).pipe(
        concatMap((result: any) => [
          new AppNotification({ message: 'Map Point Removed' }),
          new SetCurrentCommitment({ id: result.commitment.id }),
          new ClearAppNotification()
        ]),
        catchError(error => of(new DeliveryLocationsActionFailure(error)))
      )
    )
  )

  @Effect()
  getMapPointsByCommitment$: Observable<Action> = this.actions$.pipe(
    ofType(DeliveryLocationActionTypes.GetMapPointsByCommitment),
    map((action: GetMapPointsByCommitment) => action.payload),
    switchMap((payload: any) =>
      this.service.getMapPointsByCommitment(payload.commitment).pipe(

        map((result: DataResult<MapPointsResult>) => new LoadMapPoints(result)),
        catchError(error => of(new DeliveryLocationsActionFailure(error)))
      )
    )
  )

  @Effect()
  getElectoratesByCommitment$: Observable<Action> = this.actions$.pipe(
    ofType(DeliveryLocationActionTypes.GetElectoratesByCommitment),
    map((action: GetElectoratesByCommitment) => action.payload),
    switchMap((payload: any) =>
      this.service.getElectoratesByCommitment(payload.commitment).pipe(
        map(
          (result: DataResult<ElectoratesResult>) => new LoadElectorates(result)
        ),
        catchError(error => of(new DeliveryLocationsActionFailure(error)))
      )
    )
  )

  constructor(
    private actions$: Actions,
    private service: DeliveryLocationDataService
  ) {}
}
