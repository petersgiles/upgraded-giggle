import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Commitment } from './commitment.model';

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
  ClearCommitments = '[Commitment] Clear Commitments'
}

export class LoadCommitments implements Action {
  readonly type = CommitmentActionTypes.LoadCommitments;

  constructor(public payload: { commitments: Commitment[] }) {}
}

export class AddCommitment implements Action {
  readonly type = CommitmentActionTypes.AddCommitment;

  constructor(public payload: { commitment: Commitment }) {}
}

export class UpsertCommitment implements Action {
  readonly type = CommitmentActionTypes.UpsertCommitment;

  constructor(public payload: { commitment: Commitment }) {}
}

export class AddCommitments implements Action {
  readonly type = CommitmentActionTypes.AddCommitments;

  constructor(public payload: { commitments: Commitment[] }) {}
}

export class UpsertCommitments implements Action {
  readonly type = CommitmentActionTypes.UpsertCommitments;

  constructor(public payload: { commitments: Commitment[] }) {}
}

export class UpdateCommitment implements Action {
  readonly type = CommitmentActionTypes.UpdateCommitment;

  constructor(public payload: { commitment: Update<Commitment> }) {}
}

export class UpdateCommitments implements Action {
  readonly type = CommitmentActionTypes.UpdateCommitments;

  constructor(public payload: { commitments: Update<Commitment>[] }) {}
}

export class DeleteCommitment implements Action {
  readonly type = CommitmentActionTypes.DeleteCommitment;

  constructor(public payload: { id: string }) {}
}

export class DeleteCommitments implements Action {
  readonly type = CommitmentActionTypes.DeleteCommitments;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearCommitments implements Action {
  readonly type = CommitmentActionTypes.ClearCommitments;
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
 | ClearCommitments;
