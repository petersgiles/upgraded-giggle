import { PlannerActions, PlannerActionTypes } from './planner.actions'
import { createSelector, createFeatureSelector } from '@ngrx/store'

export interface State {
  commitments: any[]
  events: any[]
  eventTypes: any[]
  externalEvents: any[]
  externalEventTypes: any[]
  selectedExternalEeventTypes: any[]
  schedulerZoomLevel: any
  schedulerCenterDate: Date
  isReadonly: boolean
}

export const initialState: State = {
  commitments: [],
  events: [],
  eventTypes: [],
  externalEvents: [],
  externalEventTypes: [],
  selectedExternalEeventTypes: [],
  schedulerZoomLevel: 3,
  schedulerCenterDate: new Date(),
  isReadonly: true
}

export function reducer(state = initialState, action: PlannerActions): State {
  switch (action.type) {
    case PlannerActionTypes.LoadCommitmentEvents:
      return {
        ...state,
        events: action.payload.data
      }
    case PlannerActionTypes.LoadExternalEvents:
      return {
        ...state,
        externalEvents: action.payload.data
      }
    case PlannerActionTypes.LoadExternalEventTypes:
      return {
        ...state,
        externalEventTypes: action.payload.data
      }
    case PlannerActionTypes.LoadEventTypes:
      return {
        ...state,
        eventTypes: action.payload.data
      }
    case PlannerActionTypes.StoreSchedulerState:
      return {
        ...state,
        schedulerZoomLevel: action.payload.zoomLevel,
        schedulerCenterDate: action.payload.currentCenterDate
      }
    case PlannerActionTypes.LoadPlannerPermission:
      return {
        ...state,
        isReadonly: action.payload.isReadonly
      }
    case PlannerActionTypes.LoadSelectedExternalEventTypes:
      return {
        ...state,
        selectedExternalEeventTypes: action.payload
      }
    default:
      return state
  }
}

export const plannerState = createFeatureSelector<State>('planner')
export const selectEventsState = createSelector(
  plannerState,
  (state: State) => state.events
)
export const selectEventTypesState = createSelector(
  plannerState,
  (state: State) => state.eventTypes
)
export const selectExternalEventsState = createSelector(
  plannerState,
  (state: State) => state.externalEvents
)
export const selectExternalEventTypesState = createSelector(
  plannerState,
  (state: State) => state.externalEventTypes
)
export const selectSelectedExternalEventTypesState = createSelector(
  plannerState,
  (state: State) => state.selectedExternalEeventTypes
)
export const selectSchedulerZoomLevelState = createSelector(
  plannerState,
  (state: State) => state.schedulerZoomLevel
)
export const selectSchedulerCenterDateState = createSelector(
  plannerState,
  (state: State) => state.schedulerCenterDate
)
export const plannerPermissionState = createSelector(
  plannerState,
  (state: State) => state.isReadonly
)

