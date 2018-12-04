import { CommitmentDiscussionActionTypes, CommitmentDiscussionActions } from './commitment-discussion.actions'

export interface State {
  expanded: boolean
  timeFormat: 'dateFormat' | 'timeAgo' | 'calendar'
  activeComment: any
  comments: []
  loading: boolean
  error: any
}

export const initialState: State = {
  expanded: false,
  timeFormat: 'timeAgo',
  activeComment: null,
  comments: null,
  loading: false,
  error: null,
}

export function reducer(
  state = initialState,
  action: CommitmentDiscussionActions
): State {
  switch (action.type) {

    case CommitmentDiscussionActionTypes.ExpandPanel: {
      return {
        ...state,
        expanded: true
      }
    }

    case CommitmentDiscussionActionTypes.CollapsePanel: {
      return {
        ...state,
        expanded: false
      }
    }

    case CommitmentDiscussionActionTypes.ChangeTimeFormat: {
      return {
        ...state,
        timeFormat: action.payload
      }
    }

    case CommitmentDiscussionActionTypes.LoadComments: {
      return {
          ...state,
          comments: action.payload.data.comments,
          loading: action.payload.loading,
          error: action.payload.error
        }
    }

    case CommitmentDiscussionActionTypes.ClearComments: {
      return {
        ...state,
        comments: null,
        loading: false,
        error: null,
      }
    }

    case CommitmentDiscussionActionTypes.GetCommentsByCommitment: {
      return { ...state, loading: true, error: null }
    }

    default:
      return state
  }
}

export const selectAll = (state: State) => state.comments
export const getExpanded = (state: State) => state.expanded
export const getTimeFormat = (state: State) => state.timeFormat
export const getDiscussionActiveComment = (state: State) => state.activeComment
export const getDiscussionLoading = (state: State) => state.loading
export const getDiscussionError = (state: State) => state.error