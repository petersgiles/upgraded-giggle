import { Action } from '@ngrx/store';
import { RouteChange } from '../router.actions'
import { Commitment } from '../../models'

export enum CommitmentDetailActionTypes {
  LoadCommitmentDetails = '[CommitmentDetail] Load CommitmentDetails',
  LoadCommitments = '[RefinerActionTypes] LoadRefinedCommitments',
  GetDetailedCommitment = '[CommitmentDetail] GetDetailedCommitment',
  LoadDetailedCommitment = '[CommitmentDetail] LoadDetailedCommitment'
}

export class LoadCommitments implements Action {
  type = CommitmentDetailActionTypes.LoadCommitments
  constructor(public payload: any) {}
}

export class LoadDetailedCommitment implements Action {
  readonly type = CommitmentDetailActionTypes.LoadDetailedCommitment
  constructor(public payload: {commitment: Commitment}) { }
  //constructor(public payload: { actions: any[] }) { }
   //new LoadCommitmentActions({ actions: result.data.commitmentActions })),
}

export class LoadCommitmentDetails implements Action {
  readonly type = CommitmentDetailActionTypes.LoadCommitmentDetails;
  constructor(public payload: {path: string}) { }
  //constructor(public payload: { actions: any[] }) { }
   //new LoadCommitmentActions({ actions: result.data.commitmentActions })),
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
