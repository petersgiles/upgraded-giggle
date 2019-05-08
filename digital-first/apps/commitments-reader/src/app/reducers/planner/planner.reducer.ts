import { PlannerActions, PlannerActionTypes } from './planner.actions'
import { createSelector, createFeatureSelector } from '@ngrx/store'

export interface State {
  commitments: any[]
  events: any[]
  eventTypes: any[]
  externalEvents: any[]
  externalEventTypes: any[]
  selectedExternalEeventTypes: any[]
}

export const initialState: State = {
  commitments: [],
  events: [],
  eventTypes: [],
  externalEvents: [],
  externalEventTypes: [],
  selectedExternalEeventTypes: []
}

export function reducer(state = initialState, action: PlannerActions): State {
  switch (action.type) {
    case PlannerActionTypes.LoadRefinedCommitments:
      return {
        ...state,
        commitments: action.payload
      }
    case PlannerActionTypes.LoadCommitmentEvents:
      return {
        ...state,
        events: action.payload.data
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
    default:
      return state
  }
}

export const plannerState = createFeatureSelector<State>('planner')
export const selectRefinedCommitmentsState = createSelector(
  plannerState,
  (state: State) => state.commitments.map(c => ({ id: c.id, name: c.title }))
)
