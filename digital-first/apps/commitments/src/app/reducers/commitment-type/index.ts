import * as fromCommitmentType from './commitment-type.reducer'
import { createSelector } from '@ngrx/store'

export const getCommitmentTypeEntitiesState = state => state.commitmentType

export const {
    selectIds: getCommitmentTypeIds,
    selectEntities: getCommitmentTypeEntities,
    selectAll: getAllCommitmentTypes,
    selectTotal: getTotalCommitmentTypes,
} = fromCommitmentType.adapter.getSelectors(getCommitmentTypeEntitiesState)

export const getCommitmentTypeLoading = createSelector(
    getCommitmentTypeEntitiesState,
    state => state.loading
)

export const getCommitmentTypeError = createSelector(
    getCommitmentTypeEntitiesState,
    state => state.error
)