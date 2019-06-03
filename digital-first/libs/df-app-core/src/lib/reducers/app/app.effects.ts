import { Injectable, ErrorHandler } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { Observable, EMPTY } from 'rxjs'
import { map, concatMap, tap, catchError, concat } from 'rxjs/operators'
import { Action } from '@ngrx/store'

import {
  AppActionTypes,
  GetAppConfiguration,
  LoadAppConfiguration,
  LoadAppConfigurationError,
  GetAppConfigurationError,
  SetAppNotification,
  ClearAppNotification
} from './app.actions'

import { AppConfigService } from '../../services/config/config.service'

const applicationConfigErrorActions = [AppActionTypes.GetAppConfigurationError]
type applicationConfigErrorTypes = GetAppConfigurationError

@Injectable()
export class AppEffects {
  @Effect()
  startAppInitialiser$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.StartAppInitialiser),
    concatMap(_ => [new GetAppConfiguration()]),
    catchError(error => [new GetAppConfigurationError(error)])
  )

  @Effect()
  getAppConfiguration$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.GetAppConfiguration),
    concatMap(_ =>
      this.configService.getConfig().pipe(
        // tslint:disable-next-line: no-console
        tap((config: any) => console.log(`🐵 config => `, config)),
        concatMap((config: any) => [new LoadAppConfiguration(config)])
      )
    )
  )

  @Effect()
  handleApplicationConfigError$: Observable<Action> = this.actions$.pipe(
    ofType<applicationConfigErrorTypes>(...applicationConfigErrorActions),
    map(action => ({ action: action.type, error: action.payload })),
    concatMap(error => {
      this.errorService.handleError(error)
      return EMPTY
    })
  )

  @Effect()
  handelAppNotification$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.AppNotification),
    concatMap((action: any) => [
      new SetAppNotification(action.payload),
      new ClearAppNotification()
    ])
  )

  constructor(
    protected actions$: Actions,
    protected configService: AppConfigService,
    private errorService: ErrorHandler
  ) {}
}
