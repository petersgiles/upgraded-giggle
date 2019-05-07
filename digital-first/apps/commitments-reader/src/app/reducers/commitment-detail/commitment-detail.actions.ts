import { Action } from '@ngrx/store'

export enum CommitmentDetailActionTypes {
  LoadCommitmentDetails = '[CommitmentDetail] Load CommitmentDetails'
}

export class LoadCommitmentDetails implements Action {
  readonly type = CommitmentDetailActionTypes.LoadCommitmentDetails
  constructor(public payload: { path: string }) {}
}

export type CommitmentDetailActions = LoadCommitmentDetails
