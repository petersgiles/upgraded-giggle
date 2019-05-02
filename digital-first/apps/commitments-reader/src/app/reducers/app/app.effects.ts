import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { Observable } from 'rxjs'
import { map, concatMap, tap } from 'rxjs/operators'
import { Action } from '@ngrx/store'
import { AppDataService } from '../../services/app-data.service'
import {
  AppActionTypes,
  StartAppInitialiser,
  GetAppConfiguration,
  LoadAppConfiguration
} from './app.actions'
import {
  UserActionTypes,
  GetUserOperations,
  SetUserOperations,
  SetCurrentUser
} from '../user/user.actions'
import { AppConfigService } from '../../services/config.service'

@Injectable()
export class AppEffects {
  @Effect()
  startAppInitialiser$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.StartAppInitialiser),
    map((action: StartAppInitialiser) => action.payload.environment),
    // tslint:disable-next-line: no-console
    tap(result => console.log(result)),
    concatMap((environment: any) =>
      this.service
        .getCurrentUser()
        .pipe(
          concatMap((user: any) => [
            new GetAppConfiguration()
          ])
        )
    )
  )

  @Effect()
  getUserOperations$: Observable<Action> = this.actions$.pipe(
    ofType(UserActionTypes.GetUserOperations),
    map((action: GetUserOperations) => action.payload),
    concatMap((roles: any) =>
      this.service
        .getCurrentUserOperations(roles)
        .pipe(concatMap((result: any) => [new SetUserOperations(result)]))
    )
  )

  @Effect()
  getAppConfiguration$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.GetAppConfiguration),
    map((action: GetAppConfiguration) => action),
    concatMap((roles: any) =>
      this.configService.config.pipe(
        concatMap((result: any) => [
          new LoadAppConfiguration(result)
        ])
      )
    )
  )

  constructor(
    private actions$: Actions,
    private service: AppDataService,
    private configService: AppConfigService
  ) {}
}
