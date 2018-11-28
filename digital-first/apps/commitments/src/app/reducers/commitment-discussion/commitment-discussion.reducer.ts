import { CommitmentDiscussionActionTypes, CommitmentDiscussionActions } from './commitment-discussion.actions'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Comment } from './comment.model'

export interface State extends EntityState<Comment> {
  expanded: boolean
  timeFormat: 'dateFormat' | 'timeAgo' | 'calendar' | string
  activeComment: any
  loading: boolean
  error: any
}

export const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({
  selectId: entitiy => entitiy.id,
})

export const initialState: State = adapter.getInitialState({
  expanded: false,
  timeFormat: 'timeAgo',
  activeComment: null,
  comments: null,
  loading: false,
  error: null,
})

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

        // tslint:disable-next-line:no-console
        console.log('LoadComments', action.payload)

      return adapter.addMany(action.payload.data.comments, {
          ...state,
          loading: action.payload.loading,
          error: action.payload.error
        })
    }

    case CommitmentDiscussionActionTypes.ClearComments: {
      return adapter.removeAll(state)
    }

    case CommitmentDiscussionActionTypes.GetCommentsByCommitment: {
      return { ...state, loading: true, error: null }
    }

    default:
      return state
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors()

export const getExpanded = (state: State) => state.expanded
export const getTimeFormat = (state: State) => state.timeFormat
export const getDiscussionActiveComment = (state: State) => state.activeComment
export const getDiscussionLoading = (state: State) => state.loading
export const getDiscussionError = (state: State) => state.error