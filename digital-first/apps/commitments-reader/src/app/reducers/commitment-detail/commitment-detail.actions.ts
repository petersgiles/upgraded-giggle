import { Action } from '@ngrx/store'
import { RouteChange } from '../router.actions'
import { Commitment } from '../../models'
import { BookType } from '../../generated/graphql'

export enum CommitmentDetailActionTypes {
  LoadCommitmentDetails = '[CommitmentDetail] Load CommitmentDetails',
  LoadCommitments = '[RefinerActionTypes] LoadRefinedCommitments',
  ClearCurrentDetailedCommitment = '[CommitmentDetail] ClearCurrentDetailedCommitment',
  GetDetailedCommitment = '[CommitmentDetail] GetDetailedCommitment',
  GetDetailedCommitmentFailure = '[Overview] GetDetailedCommitmentFailure',
  LoadDetailedCommitment = '[CommitmentDetail] LoadDetailedCommitment',
  UpdatePMOHandlingAdvice = '[CommitmentDetail] UpdatePMOAdvice',
  UpdatePMOHandlingAdviceFailure = '[CommitmentDetail] UpdatePMOHandlingAdviceFailure',
  UpdatePMCHandlingAdvice = '[CommitmentDetail] UpdatePMCAdvice',
  UpdatePMCHandlingAdviceFailure = '[CommitmentDetail] UpdatePMCHandlingAdviceFailure',
  GetHandlingAdvices = '[CommitmentDetail] GetHandlingAdvices',
  LoadHandlingAdvices = '[CommitmentDetail] LoadHandlingAdvices',
  GetHandlingAdvicesFailure = '[CommitmentDetail] GetHandlingAdvicesFailure',
  SetPMOHandlingAdviceResult = '[CommitmentDetail] SetPMOHandlingAdviceResult',
  SetPMCHandlingAdviceResult = '[CommitmentDetail] SetPMCHandlingAdviceResult'
}

export class LoadCommitments implements Action {
  readonly type = CommitmentDetailActionTypes.LoadCommitments
  constructor(public payload: any) {}
}

export class UpdatePMOHandlingAdvice implements Action {
  readonly type = CommitmentDetailActionTypes.UpdatePMOHandlingAdvice
  constructor(public payload: { handlingAdviceId: string }) {}
}

export class UpdatePMCHandlingAdvice implements Action {
  readonly type = CommitmentDetailActionTypes.UpdatePMCHandlingAdvice
  constructor(public payload: { handlingAdviceId: string }) {}
}

export class LoadDetailedCommitment implements Action {
  readonly type = CommitmentDetailActionTypes.LoadDetailedCommitment
  constructor(public payload: any) {}
}

export class GetDetailedCommitment implements Action {
  readonly type = CommitmentDetailActionTypes.GetDetailedCommitment
  constructor(public payload: { id: any }) {}
}

export class ClearCurrentDetailedCommitment implements Action {
  readonly type = CommitmentDetailActionTypes.ClearCurrentDetailedCommitment
  constructor(public payload: any) {}
}

export class GetHandlingAdvices implements Action {
  readonly type = CommitmentDetailActionTypes.GetHandlingAdvices
  constructor(public payload: any) {}
}

export class LoadHandlingAdvices implements Action {
  readonly type = CommitmentDetailActionTypes.LoadHandlingAdvices
  constructor(public payload: { advices: any }) {}
}

export class SetPMOHandlingAdviceResult implements Action {
  readonly type = CommitmentDetailActionTypes.SetPMOHandlingAdviceResult
  constructor(public payload: any) {}
}

export class SetPMCHandlingAdviceResult implements Action {
  readonly type = CommitmentDetailActionTypes.SetPMCHandlingAdviceResult
  constructor(public payload: any) {}
}

export class GetDetailedCommitmentFailure implements Action {
  readonly type = CommitmentDetailActionTypes.GetDetailedCommitmentFailure
  constructor(public payload: any) {}
}

export class GetHandlingAdvicesFailure implements Action {
  readonly type = CommitmentDetailActionTypes.GetHandlingAdvicesFailure
  constructor(public payload: any) {}
}

export class UpdatePMOHandlingAdviceFailure implements Action {
  readonly type = CommitmentDetailActionTypes.UpdatePMOHandlingAdviceFailure
  constructor(public payload: any) {}
}

export class UpdatePMCHandlingAdviceFailure implements Action {
  readonly type = CommitmentDetailActionTypes.UpdatePMCHandlingAdviceFailure
  constructor(public payload: any) {}
}

export type CommitmentDetailActions =
  | GetDetailedCommitment
  | LoadDetailedCommitment
  | LoadCommitments
  | UpdatePMOHandlingAdvice
  | UpdatePMCHandlingAdvice
  | GetHandlingAdvices
  | LoadHandlingAdvices
  | SetPMOHandlingAdviceResult
  | SetPMCHandlingAdviceResult
  | GetDetailedCommitmentFailure
  | GetHandlingAdvicesFailure
  | UpdatePMOHandlingAdviceFailure
  | UpdatePMCHandlingAdviceFailure
  | ClearCurrentDetailedCommitment
