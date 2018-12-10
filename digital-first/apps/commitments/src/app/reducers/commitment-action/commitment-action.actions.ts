import { Action } from '@ngrx/store'

export enum CommitmentActionActionTypes {
  ExpandPanel = '[CommitmentAction] Expand Panel',
  CollapsePanel = '[CommitmentAction] Collapse Panel',
  ClearCommitmentActions = '[CommitmentAction] Clear Commitment Actions',
  LoadCommitmentActions = '[CommitmentAction] Load Commitment Actions',
  GetActionsByCommitment = '[CommitmentAction] Get Actions By Commitment',
  AddActionToCommitment = '[CommitmentAction] Add Action To Commitment',
  RemoveActionFromCommitment = '[CommitmentAction] Remove Action To Commitment',
  CommitmentActionActionFailure = '[CommitmentAction] Commitment Action Action Failure',
  SetCurrentCommitmentAction = '[CommitmentAction] Set Current Commitment Action',
  ClearCurrentCommitmentAction = '[CommitmentAction] Clear Current Commitment Action',
}

export class CollapsePanel implements Action {
  readonly type = CommitmentActionActionTypes.CollapsePanel
}

export class ExpandPanel implements Action {
  readonly type = CommitmentActionActionTypes.ExpandPanel
}

export class AddActionToCommitment implements Action {
  readonly type = CommitmentActionActionTypes.AddActionToCommitment
  constructor(public payload: { commitment: any, action: any }) { }
}

export class RemoveActionFromCommitment implements Action {
  readonly type = CommitmentActionActionTypes.RemoveActionFromCommitment
  constructor(public payload: { commitment: any, action: any }) { }
}
export class SetCurrentCommitmentAction implements Action {
  readonly type = CommitmentActionActionTypes.SetCurrentCommitmentAction
  constructor(public payload: { commitment: any, action: any }) { }
}

export class CommitmentActionActionFailure implements Action {
  readonly type = CommitmentActionActionTypes.CommitmentActionActionFailure
  constructor(public payload: any) { }
}

export class GetActionsByCommitment implements Action {
  readonly type = CommitmentActionActionTypes.GetActionsByCommitment
  constructor(public payload: { commitment: any }) { }
}

export class LoadCommitmentActions implements Action {
  readonly type = CommitmentActionActionTypes.LoadCommitmentActions
  constructor(public payload: { actions: any[] }) { }
}

export class ClearCommitmentActions implements Action {
  readonly type = CommitmentActionActionTypes.ClearCommitmentActions
}

export class ClearCurrentCommitmentAction implements Action {
  readonly type = CommitmentActionActionTypes.ClearCurrentCommitmentAction
}

export type CommitmentActionActions =
    CollapsePanel
  | ExpandPanel
  | GetActionsByCommitment
  | AddActionToCommitment
  | RemoveActionFromCommitment
  | CommitmentActionActionFailure
  | ClearCommitmentActions
  | LoadCommitmentActions
  | SetCurrentCommitmentAction
  | ClearCurrentCommitmentAction
