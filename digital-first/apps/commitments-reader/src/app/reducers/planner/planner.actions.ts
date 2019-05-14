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

  StoreSchedulerState = '[Planner] StoreSchedulerState',
  GetPlannerPermission = '[Planne] GetPlannerPermission',
  LoadPlannerPermission = '[Planner] LoadPlannerPermission'
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
export class StoreSchedulerState implements Action {
  readonly type = PlannerActionTypes.StoreSchedulerState
  constructor(public payload: any) {}
}

export class GetPlannerPermission implements Action {
  readonly type = PlannerActionTypes.GetPlannerPermission
  constructor(public payload: any) {}
}

export class LoadPlannerPermission implements Action {
  readonly type = PlannerActionTypes.LoadPlannerPermission
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
  | StoreSchedulerState
  | GetPlannerPermission
  | LoadPlannerPermission
  | ErrorInPlanner
