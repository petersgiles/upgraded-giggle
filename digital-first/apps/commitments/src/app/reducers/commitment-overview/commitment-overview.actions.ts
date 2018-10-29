import { Action } from '@ngrx/store'
import { RefinerType, RefinerGroup } from '@digital-first/df-components'

export enum CommitmentOverviewActionTypes {
  ExpandRefinerGroup = '[CommitmentOverview] Expand Refiner Group',
  CollapseRefinerGroup = '[CommitmentOverview] Collapse Refiner Group',
  AddRefiner = '[CommitmentOverview] Add Refiner',
  RemoveRefiner = '[CommitmentOverview] Remove Refiner',
  ClearAllRefiners = '[CommitmentOverview] Clear All Refiners',
}
export class CollapseRefinerGroup implements Action {
  readonly type = CommitmentOverviewActionTypes.CollapseRefinerGroup

  constructor(public payload: number) { }
}

export class ExpandRefinerGroup implements Action {
  readonly type = CommitmentOverviewActionTypes.ExpandRefinerGroup

  constructor(public payload: number) { }
}

export class AddRefiner implements Action {
  readonly type = CommitmentOverviewActionTypes.AddRefiner

  constructor(public payload: RefinerType) { }
}

export class RemoveRefiner implements Action {
  readonly type = CommitmentOverviewActionTypes.RemoveRefiner

  constructor(public payload: RefinerType) { }
}

export class ClearAllRefiners implements Action {
  readonly type = CommitmentOverviewActionTypes.ClearAllRefiners
}

export type CommitmentOverviewActions =
  CollapseRefinerGroup
  | ExpandRefinerGroup
  | AddRefiner
  | RemoveRefiner
  | ClearAllRefiners