import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Comment } from './comment.model'
import { CommentActions, CommentActionTypes } from './comment.actions'

export interface State extends EntityState<Comment> {
  // additional entities state properties
  loading: boolean
  error: any
}

export const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>()

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  error: null
})

export function reducer(
  state = initialState,
  action: CommentActions
): State {
  switch (action.type) {
    case CommentActionTypes.DeleteComment: {
      return adapter.removeOne(action.payload.id, state)
    }

    case CommentActionTypes.LoadComments: {
      return adapter.removeAll(state)
        && adapter.addMany(action.payload.data.comments, {
          ...state,
          loading: action.payload.loading,
          error: action.payload.error
        })
    }

    case CommentActionTypes.ClearComments: {
      return adapter.removeAll(state)
    }

    default: {
      return state
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors()
