import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { Observable } from 'rxjs'
import { map, concatMap } from 'rxjs/operators'
import { Action } from '@ngrx/store'
import { AppDataService } from '../../services/app-data/app-data.service'
import {
  AppActionTypes,
  StartAppInitialiser,
  GetAppConfiguration,
  LoadAppConfiguration
} from './app.actions'

import { AppConfigService } from '../../services/config/config.service'

@Injectable()
export class AppEffects {
  @Effect()
  startAppInitialiser$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.StartAppInitialiser),
    map((action: StartAppInitialiser) => action.payload.environment),
    concatMap((environment: any) => [new GetAppConfiguration()])
  )

  @Effect()
  getAppConfiguration$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.GetAppConfiguration),
    concatMap(_ =>
      this.configService
        .getJSON()
        .pipe(concatMap((config: any) => [new LoadAppConfiguration(config)]))
    )
  )

  constructor(
    private actions$: Actions,
    private service: AppDataService,
    private configService: AppConfigService
  ) {}
}
