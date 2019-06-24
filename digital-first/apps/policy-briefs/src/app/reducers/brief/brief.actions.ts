import { Action } from '@ngrx/store'

export enum BriefActionTypes {
  LoadBrief = '[Brief] Load Brief',
  SetActiveBrief = '[Brief] Set Active Brief',
  SetActiveBriefStatus = '[Brief] Set Active Brief Status',
  GetActiveBriefFailure = '[Brief] Get Active Brief Failure'
}

export class SetActiveBriefStatus implements Action {
  readonly type = BriefActionTypes.SetActiveBriefStatus
  constructor(public payload: {  activeBriefId: string, status: string }) {}
}

export class SetActiveBrief implements Action {
  readonly type = BriefActionTypes.SetActiveBrief
  constructor(public payload: { activeBriefId: string }) {}
}

export class LoadBrief implements Action {
  readonly type = BriefActionTypes.LoadBrief
  constructor(public payload: { data: any; loading: boolean }) {}
}

export class GetActiveBriefFailure implements Action {
  readonly type = BriefActionTypes.GetActiveBriefFailure
  constructor(public payload: any) {}
}

export type BriefActions = LoadBrief | SetActiveBrief | GetActiveBriefFailure | SetActiveBriefStatus
