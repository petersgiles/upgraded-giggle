import { Injectable, ErrorHandler } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { Observable, throwError, EMPTY } from 'rxjs'
import { map, concatMap, switchMap, tap } from 'rxjs/operators'
import { Action, Store } from '@ngrx/store'

import { ShowSpinner, HideSpinner } from '@digital-first/df-app-core'
import { GetDiscussionFailure, DiscussionActionTypes } from '../discussion/discussion.actions'


type failTypes =
  | GetDiscussionFailure

const failActions = [
  DiscussionActionTypes.GetDiscussionFailure,
]

@Injectable()
export class GlobalEffects {

  @Effect()
  handleGlobalError$: Observable<Action> = this.actions$.pipe(
    ofType<failTypes>(...failActions),
    tap(error => console.log(`💣`, error)),
    map(error => ({action: error.type, error: error.payload})),
    tap(error => console.log(`💥`,error)),
    concatMap(error => throwError(error))
  )  

  constructor(
    protected actions$: Actions
  ) {}
}
