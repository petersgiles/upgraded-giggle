import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { PlannerActionTypes, PlannerActions } from './planner.actions';


@Injectable()
export class PlannerEffects {


  @Effect()
  loadPlanners$ = this.actions$.pipe(
    ofType(PlannerActionTypes.LoadPlanners),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<PlannerActions>) {}

}
