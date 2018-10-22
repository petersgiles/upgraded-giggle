import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Comment } from './comment.model'
import { CommentActions, CommentActionTypes } from './comment.actions'

export interface State extends EntityState<Comment> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>()

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
})

export function reducer(
  state = initialState,
  action: CommentActions
): State {
  switch (action.type) {
    case CommentActionTypes.AddComment: {
      return adapter.addOne(action.payload.comment, state)
    }

    case CommentActionTypes.UpsertComment: {
      return adapter.upsertOne(action.payload.comment, state)
    }

    case CommentActionTypes.AddComments: {
      return adapter.addMany(action.payload.comments, state)
    }

    case CommentActionTypes.UpsertComments: {
      return adapter.upsertMany(action.payload.comments, state)
    }

    case CommentActionTypes.UpdateComment: {
      return adapter.updateOne(action.payload.comment, state)
    }

    case CommentActionTypes.UpdateComments: {
      return adapter.updateMany(action.payload.comments, state)
    }

    case CommentActionTypes.DeleteComment: {
      return adapter.removeOne(action.payload.id, state)
    }

    case CommentActionTypes.DeleteComments: {
      return adapter.removeMany(action.payload.ids, state)
    }

    case CommentActionTypes.LoadComments: {
      return adapter.addAll(action.payload.comments, state)
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
