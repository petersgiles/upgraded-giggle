import * as fromComment from './comment.reducer'
import { createSelector } from '@ngrx/store'

export const getCommentEntitiesState = state => state.comment

export const {
    selectIds: getCommentIds,
    selectEntities: getCommentEntities,
    selectAll: getAllComments,
    selectTotal: getTotalComments,
} = fromComment.adapter.getSelectors(getCommentEntitiesState)

export const getCommentLoading = createSelector(
    getCommentEntitiesState,
    state => state.loading
)

export const getCommentError = createSelector(
    getCommentEntitiesState,
    state => state.error
)
