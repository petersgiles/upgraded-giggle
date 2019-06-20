import { DiscussionActions, DiscussionActionTypes } from './discussion.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { sortBy, toTree } from '@df/utils'
import { DiscussionType } from '../../models'

export interface State {
  timeFormat: string
  activeChannel: DiscussionType
  channels: DiscussionType[]
  activeComment: any
  comments: any[]
  discussion: any[]
}

export const initialState: State = {
  timeFormat: 'dateFormat',
  activeChannel: DiscussionType.Agency,
  channels: [DiscussionType.Agency],
  activeComment: null,
  comments: null,
  discussion: null
}

export function reducer(
  state = initialState,
  action: DiscussionActions
): State {
  switch (action.type) {
    case DiscussionActionTypes.ReplyToComment:
      let activeComment = action.payload.activeComment

      // tslint:disable-next-line: no-console
      console.log(`👹 `, action.payload, activeComment)

      if (activeComment === state.activeComment) {
        activeComment = null
      }

      return {
        ...state,
        activeComment: activeComment
      }

    case DiscussionActionTypes.LoadDiscussions:
      const data = action.payload.data

      const discussionNodes = JSON.parse(JSON.stringify(data || [])).sort(
        sortBy('order')
      )

      const discussion = toTree(discussionNodes, {
        id: 'id',
        parentId: 'parent',
        children: 'children',
        level: 'level'
      })

      return {
        ...state,
        discussion: discussion
      }

    case DiscussionActionTypes.SetActiveDiscussionChannel:
      return {
        ...state,
        activeChannel: action.payload
      }

    default:
      return state
  }
}

export const discussionState = createFeatureSelector<State>('discussion')

export const selectActiveCommentState = createSelector(
  discussionState,
  (state: State) => state.activeComment
)

export const selectTimeFormatState = createSelector(
  discussionState,
  (state: State) => state.timeFormat
)

export const selectCommentsState = createSelector(
  discussionState,
  (state: State) => state.comments
)

export const selectDiscussionState = createSelector(
  discussionState,
  (state: State) => state.discussion
)
