import { PlannerActions, PlannerActionTypes } from './planner.actions'
import { createSelector, createFeatureSelector } from '@ngrx/store'
import { OPERATION_RIGHT_WRITE } from '../../services/app-data/app-operations'

export interface State {
  commitments: any[]
  events: any[]
  eventTypes: any[]
  externalEvents: any[]
  externalEventTypes: any[]
  selectedExternalEventTypes: any[]
  schedulerZoomLevel: any
  schedulerCenterDate: Date
  schedulerPageIndex: any
  readonly: boolean
  permission: string
  error: any
}

export const initialState: State = {
  commitments: [],
  events: [],
  eventTypes: [],
  externalEvents: [],
  externalEventTypes: [],
  selectedExternalEventTypes: [],
  schedulerZoomLevel: 3,
  schedulerCenterDate: new Date(),
  schedulerPageIndex: 0,
  readonly: true,
  permission: 'hide',
  error: {}
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
    case PlannerActionTypes.StoreSchedulerZoomLevel:
      return {
        ...state,
        schedulerZoomLevel: action.payload
      }
    case PlannerActionTypes.StoreSchedulerCenterDate:
      return {
        ...state,
        schedulerCenterDate: action.payload
      }
    case PlannerActionTypes.StoreSchedulerPageIndex:
      return {
        ...state,
        schedulerPageIndex: action.payload
      }
    case PlannerActionTypes.LoadSelectedExternalEventTypes:
      return {
        ...state,
        selectedExternalEventTypes: action.payload
      }
    case PlannerActionTypes.SetPlannerPermission:
      const WRITE = OPERATION_RIGHT_WRITE
      return {
        ...state,
        readonly: action.payload !== WRITE,
        permission: action.payload
      }
    case PlannerActionTypes.ErrorInPlanner:
      return {
        ...state,
        error: action.payload
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
  (state: State) => state.selectedExternalEventTypes
)
export const selectSchedulerZoomLevelState = createSelector(
  plannerState,
  (state: State) => state.schedulerZoomLevel
)
export const selectSchedulerCenterDateState = createSelector(
  plannerState,
  (state: State) => state.schedulerCenterDate
)
export const selectSchedulerPageIndexState = createSelector(
  plannerState,
  (state: State) => state.schedulerPageIndex
)
export const selectPlannerPermissionState = createSelector(
  plannerState,
  (state: State) => state.readonly
)
export const selectPlannerErrortate = createSelector(
  plannerState,
  (state: State) => state.error
)
