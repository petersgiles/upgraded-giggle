import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { RefinerActionTypes, RefinerActions } from './refiner.actions';


@Injectable()
export class RefinerEffects {


  @Effect()
  loadRefiners$ = this.actions$.pipe(
    ofType(RefinerActionTypes.LoadRefiners),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<RefinerActions>) {}

}
