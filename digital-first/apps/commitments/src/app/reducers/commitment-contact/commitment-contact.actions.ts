import { Action } from '@ngrx/store'

export enum CommitmentContactActionTypes {
  ExpandPanel = '[CommitmentContact] Expand Panel',
  CollapsePanel = '[CommitmentContact] Collapse Panel',
  ClearCommitmentContacts = '[CommitmentContact] Clear Commitment Contacts',
  LoadCommitmentContacts = '[CommitmentContact] Load Commitment Contacts',
  GetContactsByCommitment = '[CommitmentContact] Get Contacts By Commitment',
  AddContactToCommitment = '[CommitmentContact] Add Contact To Commitment',
  RemoveContactFromCommitment = '[CommitmentContact] Remove Contact To Commitment',
  CommitmentContactActionFailure = '[CommitmentContact] Commitment Contact Action Failure',
}

export class CollapsePanel implements Action {
  readonly type = CommitmentContactActionTypes.CollapsePanel
}

export class ExpandPanel implements Action {
  readonly type = CommitmentContactActionTypes.ExpandPanel
}

export class AddContactToCommitment implements Action {
  readonly type = CommitmentContactActionTypes.AddContactToCommitment
  constructor(public payload: { commitment: any, contact: any }) { }
}

export class RemoveContactFromCommitment implements Action {
  readonly type = CommitmentContactActionTypes.RemoveContactFromCommitment
  constructor(public payload: { commitment: any, contact: any }) { }
}

export class CommitmentContactActionFailure implements Action {
  readonly type = CommitmentContactActionTypes.CommitmentContactActionFailure
  constructor(public payload: any) { }
}

export class GetContactsByCommitment implements Action {
  readonly type = CommitmentContactActionTypes.GetContactsByCommitment
  constructor(public payload: { commitment: any }) { }
}

export class LoadCommitmentContacts implements Action {
  readonly type = CommitmentContactActionTypes.LoadCommitmentContacts
  constructor(public payload: { contacts: any[] }) { }
}

export class ClearCommitmentContacts implements Action {
  readonly type = CommitmentContactActionTypes.ClearCommitmentContacts
}

export type CommitmentContactActions =
    CollapsePanel
  | ExpandPanel
  | GetContactsByCommitment
  | AddContactToCommitment
  | RemoveContactFromCommitment
  | CommitmentContactActionFailure
  | ClearCommitmentContacts
  | LoadCommitmentContacts
