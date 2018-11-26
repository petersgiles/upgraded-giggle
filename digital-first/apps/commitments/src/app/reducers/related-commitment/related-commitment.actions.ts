import { Action } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { RelatedCommitment } from './related-commitment.model'
import { DataResult, RelatedCommitmentsResult } from '../../models'

export enum RelatedCommitmentActionTypes {
  LoadRelatedCommitments = '[RelatedCommitment] Load RelatedCommitments',
  AddRelatedCommitment = '[RelatedCommitment] Add RelatedCommitment',
  UpsertRelatedCommitment = '[RelatedCommitment] Upsert RelatedCommitment',
  AddRelatedCommitments = '[RelatedCommitment] Add RelatedCommitments',
  UpsertRelatedCommitments = '[RelatedCommitment] Upsert RelatedCommitments',
  UpdateRelatedCommitment = '[RelatedCommitment] Update RelatedCommitment',
  UpdateRelatedCommitments = '[RelatedCommitment] Update RelatedCommitments',
  DeleteRelatedCommitment = '[RelatedCommitment] Delete RelatedCommitment',
  DeleteRelatedCommitments = '[RelatedCommitment] Delete RelatedCommitments',
  ClearRelatedCommitments = '[RelatedCommitment] Clear RelatedCommitments',

  SetCurrentRelatedCommitment = '[RelatedCommitment] Set Current RelatedCommitment',
  GetRelatedCommitments = '[RelatedCommitment] Get RelatedCommitments',
  GetAllRelatedCommitments = '[RelatedCommitment] Get All RelatedCommitments',
  GetRelatedCommitmentsByCommitment = '[RelatedCommitment] Get Map Points By Commitment',
  StoreRelatedCommitment = '[RelatedCommitment] Store RelatedCommitment',
  RemoveRelatedCommitment = '[RelatedCommitment] Remove RelatedCommitment',
  RelatedCommitmentsActionFailure = '[RelatedCommitment] RelatedCommitments Action Failure',
}

export class GetRelatedCommitmentsByCommitment implements Action {
  readonly type = RelatedCommitmentActionTypes.GetRelatedCommitmentsByCommitment
  constructor(public payload: { commitment: number | string }) {}
}

export class StoreRelatedCommitment implements Action {
  readonly type = RelatedCommitmentActionTypes.StoreRelatedCommitment

  constructor(public payload: RelatedCommitment) {}
}

export class RemoveRelatedCommitment implements Action {
  readonly type = RelatedCommitmentActionTypes.RemoveRelatedCommitment

  constructor(public payload: {id: number}) {}
}

export class LoadRelatedCommitments implements Action {
  readonly type = RelatedCommitmentActionTypes.LoadRelatedCommitments

  constructor(public payload: DataResult<RelatedCommitmentsResult>) { }
}

export class AddRelatedCommitment implements Action {
  readonly type = RelatedCommitmentActionTypes.AddRelatedCommitment

  constructor(public payload: { location: RelatedCommitment }) { }
}

export class UpsertRelatedCommitment implements Action {
  readonly type = RelatedCommitmentActionTypes.UpsertRelatedCommitment

  constructor(public payload: { location: RelatedCommitment }) { }
}

export class AddRelatedCommitments implements Action {
  readonly type = RelatedCommitmentActionTypes.AddRelatedCommitments

  constructor(public payload: { locations: RelatedCommitment[] }) { }
}

export class UpsertRelatedCommitments implements Action {
  readonly type = RelatedCommitmentActionTypes.UpsertRelatedCommitments

  constructor(public payload: { locations: RelatedCommitment[] }) { }
}

export class UpdateRelatedCommitment implements Action {
  readonly type = RelatedCommitmentActionTypes.UpdateRelatedCommitment

  constructor(public payload: { location: Update<RelatedCommitment> }) { }
}

export class UpdateRelatedCommitments implements Action {
  readonly type = RelatedCommitmentActionTypes.UpdateRelatedCommitments

  constructor(public payload: { locations: Update<RelatedCommitment>[] }) { }
}

export class DeleteRelatedCommitment implements Action {
  readonly type = RelatedCommitmentActionTypes.DeleteRelatedCommitment

  constructor(public payload: { id: string }) { }
}

export class DeleteRelatedCommitments implements Action {
  readonly type = RelatedCommitmentActionTypes.DeleteRelatedCommitments

  constructor(public payload: { ids: string[] }) { }
}

export class ClearRelatedCommitments implements Action {
  readonly type = RelatedCommitmentActionTypes.ClearRelatedCommitments
}

export class SetCurrentRelatedCommitment implements Action {
  readonly type = RelatedCommitmentActionTypes.SetCurrentRelatedCommitment
  constructor(public payload: { id: number }) { }
}
export class GetRelatedCommitments implements Action {
  readonly type = RelatedCommitmentActionTypes.GetRelatedCommitments
  constructor(public payload?: { ids?: number[] }) { }
}

export class GetAllRelatedCommitments implements Action {
  readonly type = RelatedCommitmentActionTypes.GetAllRelatedCommitments
  constructor(public payload?: { filter?: any }) { }
}

export class RelatedCommitmentsActionFailure implements Action {
  readonly type = RelatedCommitmentActionTypes.RelatedCommitmentsActionFailure

  constructor(public payload: any) {
  }
}

export type RelatedCommitmentActions =
  LoadRelatedCommitments
  | AddRelatedCommitment
  | UpsertRelatedCommitment
  | AddRelatedCommitments
  | UpsertRelatedCommitments
  | UpdateRelatedCommitment
  | UpdateRelatedCommitments
  | DeleteRelatedCommitment
  | DeleteRelatedCommitments
  | ClearRelatedCommitments
  | SetCurrentRelatedCommitment
  | GetAllRelatedCommitments
  | GetRelatedCommitments
  | GetRelatedCommitmentsByCommitment
  | StoreRelatedCommitment
  | RemoveRelatedCommitment
  | RelatedCommitmentsActionFailure
