import { DiscussionActions, DiscussionActionTypes } from './discussion.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  timeFormat: string,
  activeComment: any
  comments: any[]
  commentTree: any[]
}

export const initialState: State = {
  timeFormat: 'dateFormat',
  activeComment: null,
  comments:  null,
  commentTree: null,
}

export function reducer(
  state = initialState,
  action: DiscussionActions
): State {
  switch (action.type) {
    case DiscussionActionTypes.LoadDiscussions:
      return state

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

export const selectCommentTreeState = createSelector(
  discussionState,
  (state: State) => state.commentTree
)