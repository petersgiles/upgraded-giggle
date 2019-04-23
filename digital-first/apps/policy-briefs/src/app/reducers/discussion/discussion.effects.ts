import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { DiscussionActionTypes, DiscussionActions } from './discussion.actions';


@Injectable()
export class DiscussionEffects {


  @Effect()
  loadDiscussions$ = this.actions$.pipe(
    ofType(DiscussionActionTypes.LoadDiscussions),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<DiscussionActions>) {}

}
