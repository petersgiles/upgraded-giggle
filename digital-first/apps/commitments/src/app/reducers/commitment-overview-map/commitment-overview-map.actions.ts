import { Action } from '@ngrx/store'
import { MapPoint } from '@digital-first/df-map'

export enum CommitmentOverviewMapActionTypes {
  GetCommitmentOverviewMapPoints = '[CommitmentOverviewMap] GetCommitmentOverviewMapPoints',
  GetCommitmentOverviewMapCommitments = '[CommitmentOverviewMap] GetCommitmentOverviewMapCommitments',
  LoadCommitmentOverviewMapPoints = '[CommitmentOverviewMap] LoadCommitmentOverviewMapPoints',
  LoadCommitmentOverviewMapCommitments = '[CommitmentOverviewMap] CommitmentOverviewMapCommitments',
  ClearCommitmentOverviewMapPoints = '[CommitmentOverviewMap] ClearMapPoints',
  CommentOverviewMapActionFailure = '[CommitmentOverviewMap] CommentOverviewMapActionFailures',
}

export class GetCommitmentOverviewMapPoints implements Action {
  readonly type = CommitmentOverviewMapActionTypes.GetCommitmentOverviewMapPoints

  constructor(public payload: {filter?: string}) { }
}

export class GetCommitmentOverviewMapCommitments implements Action {
  readonly type = CommitmentOverviewMapActionTypes.GetCommitmentOverviewMapCommitments

  constructor(public payload: {filter?: string}) { }
}

export class LoadCommitmentOverviewMapPoints implements Action {
  readonly type = CommitmentOverviewMapActionTypes.LoadCommitmentOverviewMapPoints

  constructor(public payload: any) { }
}

export class LoadCommitmentOverviewMapCommitments implements Action {
  readonly type = CommitmentOverviewMapActionTypes.LoadCommitmentOverviewMapCommitments

  constructor(public payload: any) { }
}

export class ClearCommitmentOverviewMapPoints implements Action {
  readonly type = CommitmentOverviewMapActionTypes.ClearCommitmentOverviewMapPoints
}

export class CommentOverviewMapActionFailure implements Action {
  readonly type = CommitmentOverviewMapActionTypes.CommentOverviewMapActionFailure
  constructor(public payload: any) { }
}

export type CommitmentOverviewMapActions =
GetCommitmentOverviewMapPoints
  | ClearCommitmentOverviewMapPoints
  | LoadCommitmentOverviewMapPoints
  | CommentOverviewMapActionFailure
  | GetCommitmentOverviewMapCommitments
  | LoadCommitmentOverviewMapCommitments