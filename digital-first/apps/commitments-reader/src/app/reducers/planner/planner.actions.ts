import { Action } from '@ngrx/store'
import { plannerState } from './planner.reducer'

export enum PlannerActionTypes {
  GetPlannerData = '[Planner] GetPlannerData',
  GetPlannerDataFailure = '[Planner] GetPlannerDataFailure',
  GetCommitmentEvents = '[Planner] GetCommitmentEvents',
  LoadCommitmentEvents = '[Planner] LoadCommitmentEvents',
  GetCommitmentEventsFailure = '[Planner] GetCommitmentEventsFailure',

  GetEventReferenceData = '[Planner] GetEventReferenceData',
  LoadExternalEventTypes = '[Planner] LoadExternalEventTypes',
  LoadEventTypes = '[Planner] LoadEventTypes',
  GetEventReferenceDataFailure = '[Planner] GetEventReferenceDataFailure',

  GetExternalEvents = '[Planner] GetExternalEvents',
  LoadExternalEvents = '[Planner] LoadExternalEvents',
  GetExternalEventsFailure = '[Planner] GetExternalEventsFailure',

  StoreCommitmentEvent = '[Planner] StoreCommitmentEvent',
  StoreCommitmentEventFailure = '[Planner] StoreCommitmentEventFailure',

  RemoveCommitmentEvent = '[Planner] RemoveCommitmentEvent',
  RemoveCommitmentEventFailure = '[Planner] RemoveCommitmentEventFailure',

  StoreSelectedExternalEventTypes = '[Planner] StoreSelectedExternalEventTypes',
  LoadSelectedExternalEventTypes = '[Planner] LoadSelectedExternalEventTypes',
  StoreSelectedExternalEventTypesFailure = '[Planner] StoreSelectedExternalEventTypesFailure',

  StoreSchedulerState = '[Planner] StoreSchedulerState',
  LoadPlannerPermission = '[Planner] LoadPlannerPermission'
}

export class GetPlannerData implements Action {
  readonly type = PlannerActionTypes.GetPlannerData
  constructor(public payload: any) {}
}
export class GetPlannerDataFailure implements Action {
  readonly type = PlannerActionTypes.GetPlannerDataFailure
  constructor(public payload: any) {}
}

export class GetCommitmentEvents implements Action {
  readonly type = PlannerActionTypes.GetCommitmentEvents
  constructor(public payload: any) {}
}
export class LoadCommitmentEvents implements Action {
  readonly type = PlannerActionTypes.LoadCommitmentEvents
  constructor(public payload: any) {}
}
export class GetCommitmentEventsFailure implements Action {
  readonly type = PlannerActionTypes.GetCommitmentEventsFailure
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
export class GetEventReferenceDataFailure implements Action {
  readonly type = PlannerActionTypes.GetEventReferenceDataFailure
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
export class GetExternalEventsFailure implements Action {
  readonly type = PlannerActionTypes.GetExternalEventsFailure
  constructor(public payload: any) {}
}

export class StoreCommitmentEvent implements Action {
  readonly type = PlannerActionTypes.StoreCommitmentEvent
  constructor(public payload: any) {}
}

export class StoreCommitmentEventFailure implements Action {
  readonly type = PlannerActionTypes.StoreCommitmentEventFailure
  constructor(public payload: any) {}
}

export class RemoveCommitmentEvent implements Action {
  readonly type = PlannerActionTypes.RemoveCommitmentEvent
  constructor(public payload: any) {}
}

export class RemoveCommitmentEventFailure implements Action {
  readonly type = PlannerActionTypes.RemoveCommitmentEventFailure
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
export class StoreSelectedExternalEventTypesFailure implements Action {
  readonly type = PlannerActionTypes.StoreSelectedExternalEventTypesFailure
  constructor(public payload: any) {}
}

export class StoreSchedulerState implements Action {
  readonly type = PlannerActionTypes.StoreSchedulerState
  constructor(public payload: any) {}
}

export class LoadPlannerPermission implements Action {
  readonly type = PlannerActionTypes.LoadPlannerPermission
  constructor(public payload: any) {}
}
export type PlannerActions =
  | GetPlannerData
  | GetCommitmentEvents
  | GetCommitmentEventsFailure
  | LoadCommitmentEvents
  | GetPlannerDataFailure
  | GetExternalEvents
  | LoadExternalEvents
  | GetExternalEventsFailure
  | GetEventReferenceData
  | GetEventReferenceDataFailure
  | LoadEventTypes
  | LoadExternalEventTypes
  | StoreCommitmentEvent
  | StoreCommitmentEventFailure
  | RemoveCommitmentEvent
  | RemoveCommitmentEventFailure
  | StoreSelectedExternalEventTypes
  | LoadSelectedExternalEventTypes
  | StoreSelectedExternalEventTypesFailure
  | StoreSchedulerState
  | LoadPlannerPermission
