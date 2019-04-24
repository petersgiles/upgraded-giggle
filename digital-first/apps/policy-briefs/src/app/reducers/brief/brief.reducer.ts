import { BriefActions, BriefActionTypes } from './brief.actions'
import { sortBy, toTree } from '@df/utils'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { navigationState } from '../navigation/navigation.reducer'

export interface State {
  activeBrief: string
  brief: any
  directions: any[]
  recommendations: any[]
  comments: any[]
  discussion: any
  attachments: any[]
  statusLookups: any[]
  divisionLookups: any[]
}

export const initialState: State = {
  activeBrief: null,
  brief: null,
  directions: null,
  recommendations: null,
  comments: null,
  discussion: null,
  attachments: null,
  statusLookups: null,
  divisionLookups: null
}

export function reducer(state = initialState, action: BriefActions): State {
  switch (action.type) {
    case BriefActionTypes.LoadBrief:
      const data = action.payload.data

      const discussionNodes = JSON.parse(
        JSON.stringify(data.comments || [])
      ).sort(sortBy('order'))
      const discussion = toTree(discussionNodes, {
        id: 'id',
        parentId: 'parent',
        children: 'children',
        level: 'level'
      })

      // tslint:disable-next-line: no-console
      console.log(`💬 `, data)
      return {
        ...state,
        ...data,
        discussion: discussion
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

export const selectDiscussionState = createSelector(
  briefState,
  (state: State) => state.discussion
)
export const selectAttachmentsState = createSelector(
  briefState,
  (state: State) => state.attachments
)

export const selectStatusLookupsState = createSelector(
  briefState,
  (state: State) => state.statusLookups
)

export const selectDivisionLookupsState = createSelector(
  briefState,
  (state: State) => state.discussion
)
