import { Action } from '@ngrx/store'
import { RouteChange } from '../router.actions'
import { Commitment } from '../../models'
import { BookType } from '../../generated/graphql'

export enum CommitmentDetailActionTypes {
  LoadCommitmentDetails = '[CommitmentDetail] Load CommitmentDetails',
  LoadCommitments = '[RefinerActionTypes] LoadRefinedCommitments',
  GetDetailedCommitment = '[CommitmentDetail] GetDetailedCommitment',
  GetDetailedCommitmentFailure = '[Overview] GetDetailedCommitmentFailure',
  LoadDetailedCommitment = '[CommitmentDetail] LoadDetailedCommitment',
  UpdatePMOHandlingAdvice = '[CommitmentDetail] UpdatePMOAdvice',
  UpdatePMCHandlingAdvice = '[CommitmentDetail] UpdatePMCAdvice',
  GetHandlingAdvices = '[CommitmentDetail] GetHandlingAdvices',
  LoadHandlingAdvices = '[CommitmentDetail] LoadHandlingAdvices',
  GetHandlingAdvicesFailure = '[CommitmentDetail] GetHandlingAdvicesFailure',
  SetPMOHandlingAdviceResult = '[CommitmentDetail] SetPMOHandlingAdviceResult',
  SetPMCHandlingAdviceResult = '[CommitmentDetail] SetPMCHandlingAdviceResult'
}

export class LoadCommitments implements Action {
  type = CommitmentDetailActionTypes.LoadCommitments
  constructor(public payload: any) {}
}

export class UpdatePMOHandlingAdvice implements Action {
  type = CommitmentDetailActionTypes.UpdatePMOHandlingAdvice
  constructor(public payload: { label: string; commitmentId: number }) {}
}

export class UpdatePMCHandlingAdvice implements Action {
  ws
  type = CommitmentDetailActionTypes.UpdatePMCHandlingAdvice
  constructor(public payload: { label: string; commitmentId: number }) {}
}

export class LoadDetailedCommitment implements Action {
  readonly type = CommitmentDetailActionTypes.LoadDetailedCommitment
  constructor(public payload: any) {}
}

/* export class LoadCommitmentDetails implements Action {
  readonly type = CommitmentDetailActionTypes.LoadCommitmentDetails
  constructor(public payload: { path: string }) {}
}
 */
export class GetDetailedCommitment implements Action {
  type = CommitmentDetailActionTypes.GetDetailedCommitment
  constructor(public payload: { id: any }) {}
}

export class GetHandlingAdvices implements Action {
  type = CommitmentDetailActionTypes.GetHandlingAdvices
  constructor(public payload: { advices: any }) {}
}

export class LoadHandlingAdvices implements Action {
  type = CommitmentDetailActionTypes.LoadHandlingAdvices
  constructor(public payload: { advices: any }) {}
}

export class SetPMOHandlingAdviceResult implements Action {
  type = CommitmentDetailActionTypes.SetPMOHandlingAdviceResult
  constructor(public payload: any) {}
}

export class SetPMCHandlingAdviceResult implements Action {
  type = CommitmentDetailActionTypes.SetPMCHandlingAdviceResult
  constructor(public payload: any) {}
}

export class GetDetailedCommitmentFailure implements Action {
  type = CommitmentDetailActionTypes.GetDetailedCommitmentFailure
  constructor(public payload: any) {}
}


export class GetHandlingAdvicesFailure implements Action {
  type = CommitmentDetailActionTypes.GetHandlingAdvicesFailure
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

