import { Action } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { Commitment } from './commitment.model'
import { DataResult, CommitmentsResult, CommitmentResult } from '../../models'

export enum CommitmentActionTypes {
  LoadCommitments = '[Commitment] Load Commitments',
  AddCommitment = '[Commitment] Add Commitment',
  UpsertCommitment = '[Commitment] Upsert Commitment',
  AddCommitments = '[Commitment] Add Commitments',
  UpsertCommitments = '[Commitment] Upsert Commitments',
  UpdateCommitment = '[Commitment] Update Commitment',
  UpdateCommitments = '[Commitment] Update Commitments',
  DeleteCommitment = '[Commitment] Delete Commitment',
  DeleteCommitments = '[Commitment] Delete Commitments',
  ClearCommitments = '[Commitment] Clear Commitments',

  SetCurrentCommitment = '[Commitment] Set Current Commitment',
  GetCommitments = '[Commitment] Get Commitments',
  GetAllCommitments = '[Commitment] Get All Commitments',
  CommitmentsActionFailure = '[Commitment] Commitments Action Failure',
}

export class LoadCommitments implements Action {
  readonly type = CommitmentActionTypes.LoadCommitments
  constructor(public payload: DataResult<CommitmentsResult>) {}
}
export class AddCommitment implements Action {
  readonly type = CommitmentActionTypes.AddCommitment

  constructor(public payload: DataResult<CommitmentResult>) {}
}

export class UpsertCommitment implements Action {
  readonly type = CommitmentActionTypes.UpsertCommitment

  constructor(public payload: DataResult<CommitmentResult>) {}
}

export class AddCommitments implements Action {
  readonly type = CommitmentActionTypes.AddCommitments

  constructor(public payload: DataResult<CommitmentsResult>) {}
}

export class UpsertCommitments implements Action {
  readonly type = CommitmentActionTypes.UpsertCommitments

  constructor(public payload: DataResult<CommitmentsResult>) {}
}

export class UpdateCommitment implements Action {
  readonly type = CommitmentActionTypes.UpdateCommitment

  constructor(public payload: { commitment: Update<Commitment> }) {}
}

export class UpdateCommitments implements Action {
  readonly type = CommitmentActionTypes.UpdateCommitments

  constructor(public payload: { commitments: Update<Commitment>[] }) {}
}

export class DeleteCommitment implements Action {
  readonly type = CommitmentActionTypes.DeleteCommitment

  constructor(public payload: { id: string }) {}
}

export class DeleteCommitments implements Action {
  readonly type = CommitmentActionTypes.DeleteCommitments

  constructor(public payload: { ids: string[] }) {}
}

export class ClearCommitments implements Action {
  readonly type = CommitmentActionTypes.ClearCommitments
}

export class SetCurrentCommitment implements Action {
  readonly type = CommitmentActionTypes.SetCurrentCommitment
  constructor(public payload: { id: number }) {}
}
export class GetCommitments implements Action {
  readonly type = CommitmentActionTypes.GetCommitments
  constructor(public payload: { ids: number[] }) {}
}

export class GetAllCommitments implements Action {
  readonly type = CommitmentActionTypes.GetAllCommitments
  constructor(public payload?: { filter?: any }) {}
}

export class CommitmentsActionFailure implements Action {
  readonly type = CommitmentActionTypes.CommitmentsActionFailure

  constructor(public payload: any) {
  }
}

export type CommitmentActions =
 LoadCommitments
 | AddCommitment
 | UpsertCommitment
 | AddCommitments
 | UpsertCommitments
 | UpdateCommitment
 | UpdateCommitments
 | DeleteCommitment
 | DeleteCommitments
 | ClearCommitments
 | SetCurrentCommitment
 | GetAllCommitments
 | GetCommitments
 | CommitmentsActionFailure
