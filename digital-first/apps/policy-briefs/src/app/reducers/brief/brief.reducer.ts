import { BriefActions, BriefActionTypes } from './brief.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export interface State {
  activeBrief: string
  brief: any
  subscriptions: any[]
  directions: any[]
  attachments: any[]
}

export const initialState: State = {
  activeBrief: null,
  brief: null,
  subscriptions: null,
  directions: null,
  attachments: null
}

export function reducer(state = initialState, action: BriefActions): State {
  switch (action.type) {
    case BriefActionTypes.LoadBrief:
      return {
        ...state,
        brief: action.payload.data
      }

    case BriefActionTypes.LoadActiveBriefSubscriptions:
      return {
        ...state,
        subscriptions: action.payload.data
      }

    case BriefActionTypes.SetActiveBriefStatus:
      return {
        ...state,
        brief: {
          ...state.brief,
          briefStatus: {
            id: action.payload.status
          }
        }
      }

    case BriefActionTypes.SetActiveBrief:
      return {
        ...state,
        activeBrief: action.payload.activeBriefId
      }

    default:
      return state
  }
}

export const briefState = createFeatureSelector<State>('brief')

export const selectActiveBriefState = createSelector(
  briefState,
  (state: State) => state.activeBrief
)

export const selectBriefState = createSelector(
  briefState,
  (state: State) => state.brief
)

export const selectFileLeafRefState = createSelector(
  selectBriefState,
  brief => (brief || {}).fileLeafRef
)

export const selectBriefStatusState = createSelector(
  selectBriefState,
  brief => {
    return (brief || {}).briefStatus
  }
)

export const selectDirectionsState = createSelector(
  briefState,
  (state: State) => state.directions
)

export const selectAttachmentsState = createSelector(
  briefState,
  (state: State) => state.attachments
)

export const selectActiveBriefSubscriptions = createSelector(
  briefState,
  (state: State) => state.subscriptions
)
