import { Action } from '@ngrx/store'

export enum LookupActionTypes {
  GetLookupPolicies = '[Lookup] Get Lookup Policies',
  LoadLookupPolicies = '[Lookup] Load Lookup Policies',
  GetLookupSubPolicies = '[Lookup] Get Lookup Sub Policies',
  LoadLookupSubPolicies = '[Lookup] Load Lookup Sub Policies',

  GetLookupCommitments = '[Lookup] Get Lookup Commitments',
  LoadLookupCommitments = '[Lookup] Load Lookup Commitments',
  GetLookupClassifications = '[Lookup] Get Lookup Classifications',
  LoadLookupClassifications = '[Lookup] Load Lookup Classifications',
  GetLookupDLMs = '[Lookup] Get Lookup DLMs',
  LoadLookupDLMs = '[Lookup] Load Lookup DLMs',

  GetLookupStatuses = '[Lookup] Get Lookup Statuses',
  LoadLookupStatuses = '[Lookup] Load Lookup Statuses',
  GetLookupDivisions = '[Lookup] Get Lookup Divisions',
  LoadLookupDivisions = '[Lookup] Load Lookup Divisions',
  GetLookupActivities = '[Lookup] Get Lookup Activities',
  LoadLookupActivities = '[Lookup] Load Lookup Activities'
}

export class GetLookupDLMs implements Action {
  readonly type = LookupActionTypes.GetLookupDLMs
  constructor(public payload?: any) {}
}

export class LoadLookupDLMs implements Action {
  readonly type = LookupActionTypes.LoadLookupDLMs
  constructor(public payload: { data: any[]; loading: boolean }) {}
}

export class GetLookupClassifications implements Action {
  readonly type = LookupActionTypes.GetLookupClassifications
  constructor(public payload?: any) {}
}

export class LoadLookupClassifications implements Action {
  readonly type = LookupActionTypes.LoadLookupClassifications
  constructor(public payload: { data: any[]; loading: boolean }) {}
}

export class GetLookupCommitments implements Action {
  readonly type = LookupActionTypes.GetLookupCommitments
  constructor(public payload?: any) {}
}

export class LoadLookupCommitments implements Action {
  readonly type = LookupActionTypes.LoadLookupCommitments
  constructor(public payload: { data: any[]; loading: boolean }) {}
}

export class GetLookupPolicies implements Action {
  readonly type = LookupActionTypes.GetLookupPolicies
  constructor(public payload?: any) {}
}

export class LoadLookupPolicies implements Action {
  readonly type = LookupActionTypes.LoadLookupPolicies
  constructor(public payload: { data: any[]; loading: boolean }) {}
}

export class GetLookupSubPolicies implements Action {
  readonly type = LookupActionTypes.GetLookupSubPolicies
  constructor(public payload?: any) {}
}

export class LoadLookupSubPolicies implements Action {
  readonly type = LookupActionTypes.LoadLookupSubPolicies
  constructor(public payload: { data: any[]; loading: boolean }) {}
}

export class GetLookupStatuses implements Action {
  readonly type = LookupActionTypes.GetLookupStatuses
  constructor(public payload?: any) {}
}

export class LoadLookupStatuses implements Action {
  readonly type = LookupActionTypes.LoadLookupStatuses
  constructor(public payload: { data: any[]; loading: boolean }) {}
}

export class GetLookupDivisions implements Action {
  readonly type = LookupActionTypes.GetLookupDivisions
  constructor(public payload?: any) {}
}

export class LoadLookupDivisions implements Action {
  readonly type = LookupActionTypes.LoadLookupDivisions
  constructor(public payload: { data: any[]; loading: boolean }) {}
}

export class GetLookupActivities implements Action {
  readonly type = LookupActionTypes.GetLookupActivities
  constructor(public payload?: any) {}
}

export class LoadLookupActivities implements Action {
  readonly type = LookupActionTypes.LoadLookupActivities
  constructor(public payload: { data: any[]; loading: boolean }) {}
}

export type LookupActions =
  | GetLookupPolicies
  | LoadLookupPolicies
  | GetLookupSubPolicies
  | LoadLookupSubPolicies
  | GetLookupCommitments
  | LoadLookupCommitments
  | GetLookupClassifications
  | LoadLookupClassifications
  | GetLookupDLMs
  | LoadLookupDLMs
  | GetLookupStatuses
  | LoadLookupStatuses
  | GetLookupDivisions
  | LoadLookupDivisions
  | GetLookupActivities
  | LoadLookupActivities
