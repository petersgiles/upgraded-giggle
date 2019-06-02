import { Injectable, ErrorHandler } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { Observable, EMPTY } from 'rxjs'
import { map, concatMap, tap, catchError } from 'rxjs/operators'
import { Action } from '@ngrx/store'

import {
  AppActionTypes,
  GetAppConfiguration,
  LoadAppConfiguration,
  LoadAppConfigurationError,
} from './app.actions'

import { AppConfigService } from '../../services/config/config.service'

//type failTypes = GetRefinedCommitmentsFailure

const failActions = [AppActionTypes.GetRefinedCommitmentsFailure]

//const failActions = [HandleGlobalError.GetRefinedCommitmentsFailure]


@Injectable()
export class AppEffects {

  @Effect()
  startAppInitialiser$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.StartAppInitialiser),
    concatMap(_ => [new GetAppConfiguration()]),
    catchError(error => {
      // tslint:disable-next-line: no-console
      console.log(`💥 error => `, error)
      return EMPTY
    })
  )

  @Effect()
  getAppConfiguration$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.GetAppConfiguration),
    concatMap(_ => {
      // tslint:disable-next-line: no-console
      console.log(`getAppConfiguration`)
      return this.configService.getConfig().pipe(
        // tslint:disable-next-line: no-console
        tap((config: any) => console.log(`🐵 config => `, config)),
        concatMap((config: any) => [new LoadAppConfiguration(config)]),
        catchError(error => {
          // tslint:disable-next-line: no-console
          console.log(`💥 error => `, error)
          return [new LoadAppConfigurationError(error)]
        })
      )
    })
  )

  @Effect()
  handleGlobalError$: Observable<Action> = this.actions$.pipe(
    ofType<any>(AppActionTypes.HandleGlobalError),
    map(action => action.payload.error),
    concatMap(error => {
      this.errorService.handleError(error)
      return EMPTY
    })
  )

  constructor(
    protected actions$: Actions,
    protected configService: AppConfigService,
    private errorService: ErrorHandler
  ) {}
}
