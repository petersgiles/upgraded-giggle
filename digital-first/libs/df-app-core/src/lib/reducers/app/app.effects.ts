import { Injectable } from '@angular/core'
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

  constructor(
    protected actions$: Actions,
    protected configService: AppConfigService
  ) {}
}
