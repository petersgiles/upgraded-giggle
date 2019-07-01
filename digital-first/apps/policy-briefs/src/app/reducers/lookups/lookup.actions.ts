import { Action } from '@ngrx/store'

export enum LookupActionTypes {
  GetPolicies = '[Lookup] Get Policies'
}

export class GetPolicies implements Action {
  readonly type = LookupActionTypes.GetPolicies
  constructor(public payload: { data: any[]; loading: boolean }) {}
}

export type LookupActions =
  | GetPolicies