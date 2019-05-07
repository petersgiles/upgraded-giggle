import { Action } from '@ngrx/store'

export enum OverviewActionTypes {
  LoadOverviews = '[Overview] Load Overviews',
  GetRefinedCommitments = '[Overview] GetRefinedCommitments',
  LoadRefinedCommitments = '[Overview] LoadRefinedCommitments',
  GetRefinedCommitmentsFailure = '[Overview] GetRefinedCommitmentsFailure'
}

export class GetRefinedCommitments implements Action {
  type = OverviewActionTypes.GetRefinedCommitments

  constructor(public payload: any) {}
}

export class LoadRefinedCommitments implements Action {
  type = OverviewActionTypes.LoadRefinedCommitments
  constructor(public payload: any) {}
}

export class GetRefinedCommitmentsFailure implements Action {
  type = OverviewActionTypes.GetRefinedCommitmentsFailure
  constructor(public payload: any) {}
}

export type OverviewActions = GetRefinedCommitments | LoadRefinedCommitments | GetRefinedCommitmentsFailure
