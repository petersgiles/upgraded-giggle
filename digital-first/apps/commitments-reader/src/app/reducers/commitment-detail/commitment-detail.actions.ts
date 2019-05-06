import { Action } from '@ngrx/store'
import { Commitment } from '../../models'

export enum CommitmentDetailActionTypes {
  LoadCommitmentDetails = '[CommitmentDetail] Load CommitmentDetails',
  GetDetailedCommitment = "GetDetailedCommitment"
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
//|LoadDetailedCommitment
//|LoadCommitments
