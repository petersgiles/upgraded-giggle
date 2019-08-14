import { Action } from '@ngrx/store'

export enum BriefActionTypes {
  GetActiveBriefFailure = '[Brief] Get Active Brief Failure',
  LoadBrief = '[Brief] Load Brief',
  SetActiveBrief = '[Brief] Set Active Brief',
  SetActiveBriefStatus = '[Brief] Set Active Brief Status',
  SetActiveBriefProtectiveMarking = '[Brief] Set Active Brief ProtectiveMarking',
  SetBriefPolicy = '[Brief] SetBriefPolicy',
  SetBriefSubPolicy = '[Brief] SetBriefSubPolicy',
  SetBriefProcessingInstruction = '[Brief] SetBriefProcessingInstruction',
  SetBriefRecommendedDirection = '[Brief] SetBriefRecommendedDirection',
  SetBriefActions = '[Brief] SetBriefActions',
  SetBriefRelatedComments = '[Brief] SetBriefRelatedComments',
}

export class SetActiveBriefStatus implements Action {
  readonly type = BriefActionTypes.SetActiveBriefStatus
  constructor(public payload: { activeBriefId: string; status: string }) {}
}
export class SetActiveBriefProtectiveMarking implements Action {
  readonly type = BriefActionTypes.SetActiveBriefProtectiveMarking
  constructor(
    public payload: {
      activeBriefId: string
      securityClassification: string
      dLM: string
    }
  ) {}
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

export type BriefActions =
  | LoadBrief
  | SetActiveBrief
  | GetActiveBriefFailure
  | SetActiveBriefStatus
  | SetActiveBriefProtectiveMarking
