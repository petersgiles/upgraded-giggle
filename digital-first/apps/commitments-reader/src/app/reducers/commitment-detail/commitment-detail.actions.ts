import { Action } from '@ngrx/store';
import { RouteChange } from '../router.actions'

export enum CommitmentDetailActionTypes {
  LoadCommitmentDetails = '[CommitmentDetail] Load CommitmentDetails',
  LoadCommitments = '[RefinerActionTypes] LoadRefinedCommitments',
  
}

export class LoadCommitmentDetails implements Action {
  readonly type = CommitmentDetailActionTypes.LoadCommitmentDetails;
  constructor(public payload: {path: string}) { }
  //constructor(public payload: { actions: any[] }) { }
   //new LoadCommitmentActions({ actions: result.data.commitmentActions })),
}

export class LoadCommitments implements Action {
  type = CommitmentDetailActionTypes.LoadCommitments
  constructor(public payload: any) {}
}


export type CommitmentDetailActions = 
LoadCommitments
|LoadCommitmentDetails
