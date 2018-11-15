import * as fromMapPoint from './map-point.reducer'
import { createSelector } from '@ngrx/store'
export const getMapPointEntitiesState = state => state.mapPoint

export const {
    selectIds: getMapPointIds,
    selectEntities: getMapPointEntities,
    selectAll: getAllMapPoints,
    selectTotal: getTotalMapPoints,
} = fromMapPoint.adapter.getSelectors(getMapPointEntitiesState)

export const getMapPointLoading = createSelector(
    getMapPointEntitiesState,
    state => state.loading
)

export const getMapPointError = createSelector(
    getMapPointEntitiesState,
    state => state.error
)