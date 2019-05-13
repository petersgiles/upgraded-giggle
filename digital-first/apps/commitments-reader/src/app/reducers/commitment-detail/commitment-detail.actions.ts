import { Action } from '@ngrx/store';
import { RouteChange } from '../router.actions'
import { Commitment } from '../../models'

export enum CommitmentDetailActionTypes {
  LoadCommitmentDetails = '[CommitmentDetail] Load CommitmentDetails',
  LoadCommitments = '[RefinerActionTypes] LoadRefinedCommitments',
  GetDetailedCommitment = '[CommitmentDetail] GetDetailedCommitment',
  LoadDetailedCommitment = '[CommitmentDetail] LoadDetailedCommitment',
  UpdatePMOHandlingAdvice = '[CommitmentDetail] UpdatePMOAdvice',
  UpdatePMCHandlingAdvice = '[CommitmentDetail] UpdatePMCAdvice',
  GetHandlingAdvices = '[CommitmentDetail] GetHandlingAdvices',
  LoadHandlingAdvices = '[CommitmentDetail] LoadHandlingAdvices',
  SetPMOHandlingAdviceResult = '[CommitmentDetail] SetPMOHandlingAdviceResult',
  SetPMCHandlingAdviceResult = '[CommitmentDetail] SetPMCHandlingAdviceResult'
}

export class LoadCommitments implements Action {
  type = CommitmentDetailActionTypes.LoadCommitments
  constructor(public payload: any) {}
}

export class UpdatePMOHandlingAdvice implements Action {
  type = CommitmentDetailActionTypes.UpdatePMOHandlingAdvice
  constructor(public payload: {label:string, commitmentId: number}) {}
}

export class UpdatePMCHandlingAdvice implements Action {ws
  type = CommitmentDetailActionTypes.UpdatePMCHandlingAdvice
  constructor(public payload: {label:string, commitmentId: number}) {}
}

export class LoadDetailedCommitment implements Action {
  readonly type = CommitmentDetailActionTypes.LoadDetailedCommitment
  constructor(public payload: {commitment: Commitment}) { }
}

/* export class LoadCommitmentDetails implements Action {
  readonly type = CommitmentDetailActionTypes.LoadCommitmentDetails
  constructor(public payload: { path: string }) {}
}
 */
export class GetDetailedCommitment implements Action {
  type = CommitmentDetailActionTypes.GetDetailedCommitment
  constructor(public payload: {commitment: Commitment}) {}
}

export class GetHandlingAdvices implements Action {
  type = CommitmentDetailActionTypes.GetHandlingAdvices
  constructor(public payload: {advices: any}) {}
}

export class LoadHandlingAdvices implements Action {
  type = CommitmentDetailActionTypes.LoadHandlingAdvices
  constructor(public payload: {advices: any}) {}
}

export class SetPMOHandlingAdviceResult implements Action {
  type = CommitmentDetailActionTypes.SetPMOHandlingAdviceResult
  constructor(public payload: any) {}
}

export class SetPMCHandlingAdviceResult implements Action {
  type = CommitmentDetailActionTypes.SetPMCHandlingAdviceResult
  constructor(public payload: any) {}
}




export type CommitmentDetailActions = 
GetDetailedCommitment
|LoadDetailedCommitment
|LoadCommitments
|UpdatePMOHandlingAdvice
|UpdatePMCHandlingAdvice
|GetHandlingAdvices
|LoadHandlingAdvices
|SetPMOHandlingAdviceResult
|SetPMCHandlingAdviceResult
