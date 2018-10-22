import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { CommitmentType } from './commitment-type.model';

export enum CommitmentTypeActionTypes {
  LoadCommitmentTypes = '[CommitmentType] Load CommitmentTypes',
  AddCommitmentType = '[CommitmentType] Add CommitmentType',
  UpsertCommitmentType = '[CommitmentType] Upsert CommitmentType',
  AddCommitmentTypes = '[CommitmentType] Add CommitmentTypes',
  UpsertCommitmentTypes = '[CommitmentType] Upsert CommitmentTypes',
  UpdateCommitmentType = '[CommitmentType] Update CommitmentType',
  UpdateCommitmentTypes = '[CommitmentType] Update CommitmentTypes',
  DeleteCommitmentType = '[CommitmentType] Delete CommitmentType',
  DeleteCommitmentTypes = '[CommitmentType] Delete CommitmentTypes',
  ClearCommitmentTypes = '[CommitmentType] Clear CommitmentTypes'
}

export class LoadCommitmentTypes implements Action {
  readonly type = CommitmentTypeActionTypes.LoadCommitmentTypes;

  constructor(public payload: { commitmentTypes: CommitmentType[] }) {}
}

export class AddCommitmentType implements Action {
  readonly type = CommitmentTypeActionTypes.AddCommitmentType;

  constructor(public payload: { commitmentType: CommitmentType }) {}
}

export class UpsertCommitmentType implements Action {
  readonly type = CommitmentTypeActionTypes.UpsertCommitmentType;

  constructor(public payload: { commitmentType: CommitmentType }) {}
}

export class AddCommitmentTypes implements Action {
  readonly type = CommitmentTypeActionTypes.AddCommitmentTypes;

  constructor(public payload: { commitmentTypes: CommitmentType[] }) {}
}

export class UpsertCommitmentTypes implements Action {
  readonly type = CommitmentTypeActionTypes.UpsertCommitmentTypes;

  constructor(public payload: { commitmentTypes: CommitmentType[] }) {}
}

export class UpdateCommitmentType implements Action {
  readonly type = CommitmentTypeActionTypes.UpdateCommitmentType;

  constructor(public payload: { commitmentType: Update<CommitmentType> }) {}
}

export class UpdateCommitmentTypes implements Action {
  readonly type = CommitmentTypeActionTypes.UpdateCommitmentTypes;

  constructor(public payload: { commitmentTypes: Update<CommitmentType>[] }) {}
}

export class DeleteCommitmentType implements Action {
  readonly type = CommitmentTypeActionTypes.DeleteCommitmentType;

  constructor(public payload: { id: string }) {}
}

export class DeleteCommitmentTypes implements Action {
  readonly type = CommitmentTypeActionTypes.DeleteCommitmentTypes;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearCommitmentTypes implements Action {
  readonly type = CommitmentTypeActionTypes.ClearCommitmentTypes;
}

export type CommitmentTypeActions =
 LoadCommitmentTypes
 | AddCommitmentType
 | UpsertCommitmentType
 | AddCommitmentTypes
 | UpsertCommitmentTypes
 | UpdateCommitmentType
 | UpdateCommitmentTypes
 | DeleteCommitmentType
 | DeleteCommitmentTypes
 | ClearCommitmentTypes;
