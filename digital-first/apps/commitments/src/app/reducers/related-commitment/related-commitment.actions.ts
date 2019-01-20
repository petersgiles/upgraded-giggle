import { Action } from '@ngrx/store'
import { DataResult, RelatedCommitmentsResult } from '../../models'

export enum RelatedCommitmentActionTypes {
  ExpandPanel = '[RelatedCommitment] Expand Panel',
  CollapsePanel = '[RelatedCommitment] Collapse Panel',

  LoadRelatedCommitments = '[RelatedCommitment] Load RelatedCommitments',
  ClearRelatedCommitments = '[RelatedCommitment] Clear RelatedCommitments',
  GetRelatedCommitments = '[RelatedCommitment] Get RelatedCommitments',
  GetAllRelatedCommitments = '[RelatedCommitment] Get All RelatedCommitments',

  GetRelatedCommitmentsByCommitment = '[RelatedCommitment] Get RelatedCommitments By Commitment',
  AddCommitmentToCommitment = '[RelatedCommitment] Add Commitment ToCommitment',
  RemoveCommitmentFromCommitment = '[RelatedCommitment] Remove Commitment From Commitment',
  RelatedCommitmentsActionFailure = '[RelatedCommitment] RelatedCommitments Action Failure'
}

export class CollapsePanel implements Action {
  readonly type = RelatedCommitmentActionTypes.CollapsePanel
}

export class ExpandPanel implements Action {
  readonly type = RelatedCommitmentActionTypes.ExpandPanel
}
export class GetRelatedCommitmentsByCommitment implements Action {
  readonly type =
    RelatedCommitmentActionTypes.GetRelatedCommitmentsByCommitment
  constructor(public payload: { commitment: number | string }) {}
}

export class LoadRelatedCommitments implements Action {
  readonly type = RelatedCommitmentActionTypes.LoadRelatedCommitments

  constructor(public payload: DataResult<RelatedCommitmentsResult>) {}
}

export class ClearRelatedCommitments implements Action {
  readonly type = RelatedCommitmentActionTypes.ClearRelatedCommitments
}
export class GetRelatedCommitments implements Action {
  readonly type = RelatedCommitmentActionTypes.GetRelatedCommitments
  constructor(public payload?: { ids?: number[] }) {}
}

export class GetAllRelatedCommitments implements Action {
  readonly type = RelatedCommitmentActionTypes.GetAllRelatedCommitments
  constructor(public payload?: { filter?: any }) {}
}

export class AddCommitmentToCommitment implements Action {
  readonly type = RelatedCommitmentActionTypes.AddCommitmentToCommitment

  constructor(public payload: { commitment: number | string, relatedTo: string | number }) { }
}

export class RemoveCommitmentFromCommitment implements Action {
  readonly type = RelatedCommitmentActionTypes.RemoveCommitmentFromCommitment

  constructor(public payload: { commitment: number | string, relatedTo: string | number }) { }
}

export class RelatedCommitmentsActionFailure implements Action {
  readonly type = RelatedCommitmentActionTypes.RelatedCommitmentsActionFailure

  constructor(public payload: any) {}
}

export type RelatedCommitmentActions =
  | CollapsePanel
  | ExpandPanel
  | LoadRelatedCommitments
  | ClearRelatedCommitments
  | GetAllRelatedCommitments
  | GetRelatedCommitments
  | GetRelatedCommitmentsByCommitment
  | AddCommitmentToCommitment
  | RemoveCommitmentFromCommitment
  | RelatedCommitmentsActionFailure
