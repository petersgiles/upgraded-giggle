import { BriefActions, BriefActionTypes } from './brief.actions'
import { sortBy, toTree } from '@df/utils'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { navigationState } from '../navigation/navigation.reducer'

export interface State {
  activeBrief: string
  brief: any
  directions: any[]
  recommendations: any[]
  attachments: any[]

}

export const initialState: State = {
  activeBrief: null,
  brief: null,
  directions: null,
  recommendations: null,
  attachments: null,

}

export function reducer(state = initialState, action: BriefActions): State {
  switch (action.type) {
    case BriefActionTypes.LoadBrief:

      return {
        ...state,
        brief:  action.payload.data
      }

      case BriefActionTypes.SetActiveBriefStatus:

        return {
          ...state,
          brief:  {
            ...state.brief,
            status:  action.payload.status
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

export const selectDirectionsState = createSelector(
  briefState,
  (state: State) => state.directions
)

export const selectRecommendationsState = createSelector(
  briefState,
  (state: State) => state.recommendations
)

export const selectAttachmentsState = createSelector(
  briefState,
  (state: State) => state.attachments
)

