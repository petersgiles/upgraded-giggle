import * as fromRelatedCommitment from './related-commitment.reducer'
import { createSelector } from '@ngrx/store'
export const getRelatedCommitmentEntitiesState = state => state.RelatedCommitment

export const {
    selectIds: getRelatedCommitmentIds,
    selectEntities: getRelatedCommitmentEntities,
    selectAll: getAllRelatedCommitments,
    selectTotal: getTotalRelatedCommitments,
} = fromRelatedCommitment.adapter.getSelectors(getRelatedCommitmentEntitiesState)

export const getRelatedCommitmentLoading = createSelector(
    getRelatedCommitmentEntitiesState,
    state => state.loading
)

export const getRelatedCommitmentError = createSelector(
    getRelatedCommitmentEntitiesState,
    state => state.error
)