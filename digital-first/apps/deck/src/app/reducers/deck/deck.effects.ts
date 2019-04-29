import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { DeckActionTypes, DeckActions } from './deck.actions';


@Injectable()
export class DeckEffects {


  @Effect()
  loadDecks$ = this.actions$.pipe(
    ofType(DeckActionTypes.LoadDecks),
    /** An EMPTY observable only emits completion. Replace with your own observable API request */
    concatMap(() => EMPTY)
  );


  constructor(private actions$: Actions<DeckActions>) {}

}
