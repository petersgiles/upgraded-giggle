import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { Observable } from 'rxjs'
import { map, concatMap } from 'rxjs/operators'
import { Action } from '@ngrx/store'
import { AppDataService } from '../services/app-data.service'
import { AppActionTypes, StartAppInitialiser } from './app.actions';
import { UserActionTypes, GetUserOperations, SetUserOperations, SetCurrentUser } from './user/user.actions';

@Injectable()
export class AppEffects {

  @Effect()
  startAppInitialiser$: Observable<Action> = this.actions$
    .pipe(
      ofType(AppActionTypes.StartAppInitialiser),
      map((action: StartAppInitialiser) => action.payload.environment),
      concatMap((environment: any) =>
        this.service.getCurrentUser()
          .pipe(
            concatMap((user: any) => [
                new SetCurrentUser(user),
                new GetUserOperations(user.roles)
              ]
            )
          )
      )
    )

    @Effect()
    getUserOperations$: Observable<Action> = this.actions$
    .pipe(
      ofType(UserActionTypes.GetUserOperations),
      map((action: GetUserOperations) => action.payload),
      concatMap((roles: any) =>
        this.service.getCurrentUserOperations(roles)
          .pipe(
            concatMap((result: any) => [
                new SetUserOperations(result)
              ]
            )
          )
      )
    )

  constructor(private actions$: Actions, private service: AppDataService) { }

}
