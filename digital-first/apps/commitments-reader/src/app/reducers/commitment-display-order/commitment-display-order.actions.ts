import { Action } from '@ngrx/store'

export enum CommitmentDisplayOrderActionTypes {
  GetCommitmentDisplayOrders = '[CommitmentDisplayOrder] Get CommitmentDisplayOrders',
  LoadCommitmentDisplayOrders = '[CommitmentDisplayOrder] Load CommitmentDisplayOrders',
  SetReOrderedCommitments = '[CommitmentDisplayOrder] Set CommitmentDisplayOrders',
  ApplyCommitmentDisplayOrders = '[CommitmentDisplayOrder] Apply CommitmentDisplayOrders'
}

export class GetCommitmentDisplayOrders implements Action {
  readonly type = CommitmentDisplayOrderActionTypes.GetCommitmentDisplayOrders
  constructor(public payload: any) {}
}
export class LoadCommitmentDisplayOrders implements Action {
  readonly type = CommitmentDisplayOrderActionTypes.LoadCommitmentDisplayOrders
  constructor(public payload: any) {}
}
export class SetReOrderedCommitments implements Action {
  readonly type = CommitmentDisplayOrderActionTypes.SetReOrderedCommitments
  constructor(public payload: any) {}
}
export class ApplyCommitmentDisplayOrders implements Action {
  readonly type = CommitmentDisplayOrderActionTypes.ApplyCommitmentDisplayOrders
  constructor(public payload: any) {}
}
export type CommitmentDisplayOrderActions =
  | GetCommitmentDisplayOrders
  | LoadCommitmentDisplayOrders
  | SetReOrderedCommitments
  | ApplyCommitmentDisplayOrders
