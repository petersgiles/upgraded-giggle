import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { MapActionTypes, MapActions } from './map.actions';


@Injectable()
export class MapEffects {


  @Effect()
  loadMaps$ = this.actions$.pipe(
    ofType(MapActionTypes.LoadMaps),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<MapActions>) {}

}
