import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { Observable, EMPTY } from 'rxjs'
import { map, concatMap, tap, switchMap, catchError } from 'rxjs/operators'
import { Action } from '@ngrx/store'


import {
  UserActionTypes,
  GetUserOperations,
  SetUserOperations,
  SetCurrentUser
} from './user.actions'
import { AppDataService } from '../../services/app-data.service';

@Injectable()
export class UserEffects {
  @Effect()
  getCurrentUser$ = this.actions$.pipe(
    ofType(UserActionTypes.GetCurrentUser),
    switchMap((value: any) =>
      this.appDataService
        .getCurrentUser()
        .pipe(
          concatMap((user: any) => [
            new SetCurrentUser(user),
            new GetUserOperations(null)
          ])
        )
    ),
    catchError(error => {
      // tslint:disable-next-line: no-console
      console.log(`💥 error => `, error)
      return EMPTY
    })
  )

  @Effect()
  getUserOperations$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.GetUserOperations),
    map((action: GetUserOperations) => action.payload),
    concatMap((_: any) =>
      this.appDataService
        .getCurrentUserOperations()
        .pipe(concatMap((result: any) => [new SetUserOperations(result)]))
    ),
    catchError(error => {
      // tslint:disable-next-line: no-console
      console.log(`💥 error => `, error)
      return EMPTY
    })
  )

  constructor(
    private actions$: Actions,
    private appDataService: AppDataService
  ) {}
}
