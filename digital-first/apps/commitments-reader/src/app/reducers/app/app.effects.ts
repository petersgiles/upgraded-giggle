import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { Observable, EMPTY } from 'rxjs'
import { map, concatMap, tap, catchError } from 'rxjs/operators'
import { Action } from '@ngrx/store'
import { AppDataService } from '../../services/app-data/app-data.service'
import {
  AppActionTypes,
  StartAppInitialiser,
  GetAppConfiguration,
  LoadAppConfiguration,
  LoadAppConfigurationError,
  ShowSpinner,
  HideSpinner
} from './app.actions'

import { AppConfigService } from '../../services/config/config.service'
import {
  GetRefinerGroups,
  RefinerActionTypes,
  LoadRefinerGroups,
  GetRefinersFailure
} from '../refiner/refiner.actions'
import {
  CommitmentDetailActionTypes,
  UpdatePMOHandlingAdvice,
  UpdatePMOHandlingAdviceFailure,
  UpdatePMCHandlingAdvice,
  UpdatePMCHandlingAdviceFailure,
  SetPMOHandlingAdviceResult,
  SetPMCHandlingAdviceResult
} from '../commitment-detail/commitment-detail.actions'

type showSpinnerTypes = GetRefinerGroups 
| UpdatePMOHandlingAdvice
| UpdatePMCHandlingAdvice

const showSpinnerActions = [
  RefinerActionTypes.GetRefinerGroups,
  CommitmentDetailActionTypes.UpdatePMOHandlingAdvice,
  CommitmentDetailActionTypes.UpdatePMCHandlingAdvice
]

type hideSpinnerTypes =
  | LoadRefinerGroups
  | GetRefinersFailure
  | SetPMOHandlingAdviceResult
  | UpdatePMOHandlingAdviceFailure
  | SetPMCHandlingAdviceResult
  | UpdatePMCHandlingAdviceFailure

const hideSpinnerActions = [
  RefinerActionTypes.LoadRefinerGroups,
  RefinerActionTypes.GetRefinersFailure,
  CommitmentDetailActionTypes.UpdatePMOHandlingAdviceFailure,
  CommitmentDetailActionTypes.SetPMCHandlingAdviceResult,
  CommitmentDetailActionTypes.UpdatePMCHandlingAdviceFailure,
  CommitmentDetailActionTypes.SetPMOHandlingAdviceResult
]

@Injectable()
export class AppEffects {
  @Effect()
  showSpinner: Observable<Action> = this.actions$.pipe(
    ofType<showSpinnerTypes>(...showSpinnerActions),
    map(() => new ShowSpinner())
  )

  @Effect()
  hideSpinner: Observable<Action> = this.actions$.pipe(
    ofType<hideSpinnerTypes>(...hideSpinnerActions),
    map(() => new HideSpinner())
  )

  @Effect()
  startAppInitialiser$: Observable<Action> = this.actions$.pipe(
    ofType(AppActionTypes.StartAppInitialiser),
    map((action: StartAppInitialiser) => action.payload.environment),
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
        concatMap((config: any) => [new LoadAppConfiguration(config)])
      )
    }),
    catchError(error => {
      // tslint:disable-next-line: no-console
      console.log(`💥 error => `, error)
      return [new LoadAppConfigurationError(error)]
    })
  )

  constructor(
    private actions$: Actions,
    private configService: AppConfigService
  ) {}
}
