import { Action } from '@ngrx/store'
import { MapPoint } from '@digital-first/df-components'

export enum CommitmentOverviewMapActionTypes {
  GetCommitmentOverviewMapPoints = '[CommitmentOverviewMap] GetMapPoints',
  LoadCommitmentOverviewMapPoints = '[CommitmentOverviewMap] LoadMapPoints',
  ClearCommitmentOverviewMapPoints = '[CommitmentOverviewMap] ClearMapPoints',
  CommentOverviewMapActionFailure = '[CommitmentOverviewMap] CommentOverviewMapActionFailures',
}

export class GetCommitmentOverviewMapPoints implements Action {
  readonly type = CommitmentOverviewMapActionTypes.GetCommitmentOverviewMapPoints

  constructor(public payload: {filter?: string}) { }
}

export class LoadCommitmentOverviewMapPoints implements Action {
  readonly type = CommitmentOverviewMapActionTypes.LoadCommitmentOverviewMapPoints

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