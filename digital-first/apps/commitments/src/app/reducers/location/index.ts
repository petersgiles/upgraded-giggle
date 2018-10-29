import * as fromLocation from './location.reducer'
import { createSelector } from '@ngrx/store'
export const getLocationEntitiesState = state => state.location

export const {
    selectIds: getLocationIds,
    selectEntities: getLocationEntities,
    selectAll: getAllLocations,
    selectTotal: getTotalLocations,
} = fromLocation.adapter.getSelectors(getLocationEntitiesState)

export const getLocationLoading = createSelector(
    getLocationEntitiesState,
    state => state.loading
)

export const getLocationError = createSelector(
    getLocationEntitiesState,
    state => state.error
)