import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { Observable } from 'rxjs'
import { map, concatMap, tap, switchMap } from 'rxjs/operators'
import { Action } from '@ngrx/store'
import { AppDataService } from '../../services/app-data/app-data.service'

import {
  UserActionTypes,
  GetUserOperations,
  SetUserOperations,
  SetCurrentUser
} from './user.actions'

@Injectable()
export class UserEffects {

   @Effect()
  getCurrentUser$ = this.actions$
  .pipe(
    ofType(UserActionTypes.GetCurrentUser),
    switchMap((value: any) => 
      {
        return this.appDataService.getCurrentUser()
        .pipe(
          concatMap((user: any) => [
              new SetCurrentUser(user),
              new GetUserOperations(user.roles)
            ]
          ))}  
  ))
 
  @Effect()
  getUserOperations$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.GetUserOperations),
    map((action: GetUserOperations) => action.payload),
    concatMap((roles: any) =>
      this.appDataService
        .getCurrentUserOperations(roles)
        .pipe(concatMap((result: any) => [new SetUserOperations({data: { groupPermissions: result}})]))
    )
  )
    
  constructor(
    private actions$: Actions,
    private appDataService: AppDataService
  ) { }
}
