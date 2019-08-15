import { LookupActions, LookupActionTypes } from './lookup.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export interface State {
  policies: any[]
  subpolicies: any[]
  commitments: any[]
  classifications: any[]
  dlms: any[]
  statuses: any[]
  divisions: any[]
  activities: any[]
}

export const initialState: State = {
  policies: [],
  subpolicies: [],
  commitments: [],
  classifications: [],
  dlms: [],
  statuses: [],
  divisions: [],
  activities: []
}

export function reducer(state = initialState, action: LookupActions): State {
  switch (action.type) {
    case LookupActionTypes.LoadLookupPolicies:
      return {
        ...state,
        policies: action.payload.data
      }
    case LookupActionTypes.LoadLookupSubPolicies:
      return {
        ...state,
        subpolicies: action.payload.data
      }

    case LookupActionTypes.LoadLookupClassifications:
      return {
        ...state,
        classifications: action.payload.data
      }

    case LookupActionTypes.LoadLookupCommitments:
      return {
        ...state,
        commitments: action.payload.data
      }

    case LookupActionTypes.LoadLookupDLMs:
      return {
        ...state,
        dlms: action.payload.data
      }

    case LookupActionTypes.LoadLookupStatuses:
      return {
        ...state,
        statuses: action.payload.data
      }

    case LookupActionTypes.LoadLookupDivisions:
      return {
        ...state,
        divisions: action.payload.data
      }

    case LookupActionTypes.LoadLookupActivities:
      return {
        ...state,
        activities: action.payload.data
      }

    default:
      return state
  }
}

export const lookupState = createFeatureSelector<State>('lookups')

export const selectLookupPoliciesState = createSelector(
  lookupState,
  (state: State) =>  [
    {
      caption: 'Please Select',
      value: null
    },
    ...state.policies
  ]
)

export const selectLookupSubpoliciesState = createSelector(
  lookupState,
  (state: State) =>  [
    {
      caption: 'Please Select',
      value: null,
      policy: null
    },
    ...state.subpolicies
  ]
)

export const selectLookupCommitmentsState = createSelector(
  lookupState,
  (state: State) => state.commitments
)

export const selectLookupClassificationsState = createSelector(
  lookupState,
  (state: State) =>  [
    {
      caption: 'Please Select',
      value: null
    },
    ...state.classifications
  ]
)

export const selectLookupDLMsState = createSelector(
  lookupState,
  (state: State) => [
    {
      caption: 'Please Select',
      value: null
    },
    ...state.dlms
  ]
)

export const selectLookupStatusesState = createSelector(
  lookupState,
  (state: State) =>
    [...state.statuses].map(p => ({
      ...p,
      id: `${p.id}`
    }))
)

export const selectLookupActivitiesState = createSelector(
  lookupState,
  (state: State) => state.activities
)

export const selectLookupDivisionsState = createSelector(
  lookupState,
  (state: State) =>  [
    {
      caption: 'Please Select',
      value: null
    },
    ...state.divisions
  ]
)
