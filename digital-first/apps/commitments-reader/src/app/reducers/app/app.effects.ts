import { Injectable, ErrorHandler } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Action } from '@ngrx/store'

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

import {
  CommitmentDisplayOrderActionTypes,
  ApplyCommitmentDisplayOrders,
  ApplyCommitmentDisplayOrdersFailure,
  GetCommitmentDisplayOrdersFailure,
  SetReOrderedCommitments
} from '../commitment-display-order/commitment-display-order.actions'
import { ShowSpinner, HideSpinner } from '@digital-first/df-app-core'
import {
  OverviewActionTypes,
  GetRefinedCommitmentsFailure
} from '../overview/overview.actions'
import { PlannerActionTypes, ErrorInPlanner } from '../planner/planner.actions'
import { GetMapPointsFailure, MapActionTypes } from '../map/map.actions'

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
  | ApplyCommitmentDisplayOrdersFailure
  | GetCommitmentDisplayOrdersFailure
  | SetReOrderedCommitments

const hideSpinnerActions = [
  RefinerActionTypes.LoadRefinerGroups,
  RefinerActionTypes.GetRefinersFailure,
  CommitmentDetailActionTypes.UpdatePMOHandlingAdviceFailure,
  CommitmentDetailActionTypes.SetPMCHandlingAdviceResult,
  CommitmentDetailActionTypes.UpdatePMCHandlingAdviceFailure,
  CommitmentDetailActionTypes.SetPMOHandlingAdviceResult,
  CommitmentDisplayOrderActionTypes.ApplyCommitmentDisplayOrdersFailure,
  CommitmentDisplayOrderActionTypes.GetCommitmentDisplayOrdersFailure,
  CommitmentDisplayOrderActionTypes.SetReOrderedCommitments
]

type failTypes =
  | GetRefinedCommitmentsFailure
  | ErrorInPlanner
  | ApplyCommitmentDisplayOrdersFailure
  | GetCommitmentDisplayOrdersFailure
  | UpdatePMCHandlingAdviceFailure
  | UpdatePMOHandlingAdviceFailure
  | GetMapPointsFailure
  | GetRefinersFailure

const failActions = [
  OverviewActionTypes.GetRefinedCommitmentsFailure,
  PlannerActionTypes.ErrorInPlanner,
  CommitmentDisplayOrderActionTypes.ApplyCommitmentDisplayOrdersFailure,
  CommitmentDisplayOrderActionTypes.GetCommitmentDisplayOrdersFailure,
  CommitmentDetailActionTypes.UpdatePMCHandlingAdviceFailure,
  CommitmentDetailActionTypes.UpdatePMOHandlingAdviceFailure,
  MapActionTypes.GetMapPointsFailure,
  RefinerActionTypes.GetRefinersFailure
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


  constructor(
    protected actions$: Actions
  ) {}
}
