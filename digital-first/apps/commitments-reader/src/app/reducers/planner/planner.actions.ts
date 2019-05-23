import { Action } from '@ngrx/store'

export enum PlannerActionTypes {
  GetCommitmentEvents = '[Planner] GetCommitmentEvents',
  LoadCommitmentEvents = '[Planner] LoadCommitmentEvents',
  ErrorInPlanner = '[Planner] ErrorInPlanner',

  GetEventReferenceData = '[Planner] GetEventReferenceData',
  GetEventTypes = '[Planner] GetEventTypes',
  LoadExternalEventTypes = '[Planner] LoadExternalEventTypes',
  LoadEventTypes = '[Planner] LoadEventTypes',
  GetExternalEventTypes = '[Planner] GetExternalEventTypes',

  GetExternalEvents = '[Planner] GetExternalEvents',
  LoadExternalEvents = '[Planner] LoadExternalEvents',
  StoreCommitmentEvent = '[Planner] StoreCommitmentEvent',
  RemoveCommitmentEvent = '[Planner] RemoveCommitmentEvent',
  StoreSelectedExternalEventTypes = '[Planner] StoreSelectedExternalEventTypes',
  LoadSelectedExternalEventTypes = '[Planner] LoadSelectedExternalEventTypes',
  SetPlannerPermission = '[Planner] SetPlannerPermission',
  StoreSchedulerZoomLevel = '[Planner] StoreSchedulerZoomLevel',
  StoreSchedulerCenterDate = '[Planner] StoreSchedulerCenterDate',
  StoreSchedulerPageIndex = '[Planner] StoreSchedulerPageIndex',
  ResetCommitmentEvents = '[Planner] ResetCommitmentEvents'
}

export class GetCommitmentEvents implements Action {
  readonly type = PlannerActionTypes.GetCommitmentEvents
  constructor(public payload: any) {}
}
export class LoadCommitmentEvents implements Action {
  readonly type = PlannerActionTypes.LoadCommitmentEvents
  constructor(public payload: any) {}
}

export class GetEventReferenceData implements Action {
  readonly type = PlannerActionTypes.GetEventReferenceData
  constructor(public payload: any) {}
}
export class LoadEventTypes implements Action {
  readonly type = PlannerActionTypes.LoadEventTypes
  constructor(public payload: any) {}
}
export class LoadExternalEventTypes implements Action {
  readonly type = PlannerActionTypes.LoadExternalEventTypes
  constructor(public payload: any) {}
}
export class GetExternalEventTypes implements Action {
  readonly type = PlannerActionTypes.GetExternalEventTypes
  constructor(public payload: any) {}
}

export class GetEventTypes implements Action {
  readonly type = PlannerActionTypes.GetEventTypes
  constructor(public payload: any) {}
}

export class GetExternalEvents implements Action {
  readonly type = PlannerActionTypes.GetExternalEvents
  constructor(public payload: any) {}
}
export class LoadExternalEvents implements Action {
  readonly type = PlannerActionTypes.LoadExternalEvents
  constructor(public payload: any) {}
}

export class StoreCommitmentEvent implements Action {
  readonly type = PlannerActionTypes.StoreCommitmentEvent
  constructor(public payload: any) {}
}
export class RemoveCommitmentEvent implements Action {
  readonly type = PlannerActionTypes.RemoveCommitmentEvent
  constructor(public payload: any) {}
}

export class StoreSelectedExternalEventTypes implements Action {
  readonly type = PlannerActionTypes.StoreSelectedExternalEventTypes
  constructor(public payload: any) {}
}
export class LoadSelectedExternalEventTypes implements Action {
  readonly type = PlannerActionTypes.LoadSelectedExternalEventTypes
  constructor(public payload: any) {}
}
export class StoreSchedulerZoomLevel implements Action {
  readonly type = PlannerActionTypes.StoreSchedulerZoomLevel
  constructor(public payload: any) {}
}
export class StoreSchedulerCenterDate implements Action {
  readonly type = PlannerActionTypes.StoreSchedulerCenterDate
  constructor(public payload: any) {}
}
export class StoreSchedulerPageIndex implements Action {
  readonly type = PlannerActionTypes.StoreSchedulerPageIndex
  constructor(public payload: any) {}
}
export class SetPlannerPermission implements Action {
  readonly type = PlannerActionTypes.SetPlannerPermission
  constructor(public payload: any) {}
}

export class ResetCommitmentEvents implements Action {
  readonly type = PlannerActionTypes.ResetCommitmentEvents
  constructor(public payload: any) {}
}
export class ErrorInPlanner implements Action {
  readonly type = PlannerActionTypes.ErrorInPlanner
  constructor(public payload: any) {}
}
export type PlannerActions =
  | GetCommitmentEvents
  | LoadCommitmentEvents
  | GetExternalEvents
  | LoadExternalEvents
  | GetEventReferenceData
  | GetEventTypes
  | GetExternalEventTypes
  | LoadEventTypes
  | LoadExternalEventTypes
  | StoreCommitmentEvent
  | RemoveCommitmentEvent
  | StoreSelectedExternalEventTypes
  | LoadSelectedExternalEventTypes
  | StoreSchedulerZoomLevel
  | SetPlannerPermission
  | StoreSchedulerCenterDate
  | StoreSchedulerPageIndex
  | ResetCommitmentEvents
  | ErrorInPlanner
