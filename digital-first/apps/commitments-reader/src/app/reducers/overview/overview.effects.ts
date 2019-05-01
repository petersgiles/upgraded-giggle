import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { OverviewActionTypes, OverviewActions } from './overview.actions';


@Injectable()
export class OverviewEffects {


  @Effect()
  loadOverviews$ = this.actions$.pipe(
    ofType(OverviewActionTypes.LoadOverviews),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<OverviewActions>) {}

}
