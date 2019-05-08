import { Action } from '@ngrx/store';
import { RouteChange } from '../router.actions'
import { Commitment } from '../../models'

export enum CommitmentDetailActionTypes {
  LoadCommitmentDetails = '[CommitmentDetail] Load CommitmentDetails',
  LoadCommitments = '[RefinerActionTypes] LoadRefinedCommitments',
  GetDetailedCommitment = '[CommitmentDetail] GetDetailedCommitment',
  LoadDetailedCommitment = '[CommitmentDetail] LoadDetailedCommitment',
  UpdatePMOHandlingAdvice = '[CommitmentDetail] UpdatePMOAdvice',
  UpdatePMCHandlingAdvice = '[CommitmentDetail] UpdatePMCAdvice'
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

export class LoadCommitmentDetails implements Action {
  readonly type = CommitmentDetailActionTypes.LoadCommitmentDetails
  constructor(public payload: { path: string }) {}
}

export class GetDetailedCommitment implements Action {
  type = CommitmentDetailActionTypes.GetDetailedCommitment
  constructor(public payload: {commitment: Commitment}) {}
}


export type CommitmentDetailActions = 
GetDetailedCommitment
|LoadCommitmentDetails
|LoadDetailedCommitment
|LoadCommitments
|UpdatePMOHandlingAdvice
|UpdatePMCHandlingAdvice
