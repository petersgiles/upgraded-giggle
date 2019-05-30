import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { Observable, EMPTY, throwError} from 'rxjs'
import { map, concatMap, tap, catchError } from 'rxjs/operators'
import { Action } from '@ngrx/store'

import { AppConfigService, AppErrorHandlerToSeqService } from '@digital-first/df-app-core'
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

import { AppActionTypes } from '@digital-first/df-app-core'
import {
  CommitmentDisplayOrderActionTypes,
  ApplyCommitmentDisplayOrders
} from '../commitment-display-order/commitment-display-order.actions'
import {
  AppEffects,
  ShowSpinner,
  HideSpinner,
  HandleGlobalError
} from '@digital-first/df-app-core'
import { OverviewPageComponent } from '../../pages/overview-page/overview-page.component';
import { OverviewActionTypes, GetRefinedCommitmentsFailure } from '../overview/overview.actions';

type showSpinnerTypes =
  | GetRefinerGroups
  | UpdatePMOHandlingAdvice
  | UpdatePMCHandlingAdvice
  | ApplyCommitmentDisplayOrders

const showSpinnerActions = [
  RefinerActionTypes.GetRefinerGroups,
  CommitmentDetailActionTypes.UpdatePMOHandlingAdvice,
  CommitmentDetailActionTypes.UpdatePMCHandlingAdvice,
  CommitmentDisplayOrderActionTypes.ApplyCommitmentDisplayOrders
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

type failTypes =
  | GetRefinedCommitmentsFailure

const failActions = [
  OverviewActionTypes.GetRefinedCommitmentsFailure
]

@Injectable()
export class GlobleEffects {
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
  handleGlobalError$: Observable<Action> = this.actions$.pipe(
    ofType<failTypes>(...failActions),
    map((action) => action.payload.error),
    concatMap(error => {
      this.errorService.handleError(error)
      return EMPTY
    })
  )

  constructor(protected actions$: Actions, private errorService: AppErrorHandlerToSeqService) {}
}
