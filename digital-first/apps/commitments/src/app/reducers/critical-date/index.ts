import * as fromCriticalDate from './critical-date.reducer'
import { createSelector } from '@ngrx/store'

export const getCriticalDateEntitiesState = state => state.criticalDate

export const {
    selectIds: getCriticalDateIds,
    selectEntities: getCriticalDateEntities,
    selectAll: getAllCriticalDates,
    selectTotal: getTotalCriticalDates,
} = fromCriticalDate.adapter.getSelectors(getCriticalDateEntitiesState)

export const getCriticalDateLoading = createSelector(
    getCriticalDateEntitiesState,
    state => state.loading
)

export const getCriticalDateError = createSelector(
    getCriticalDateEntitiesState,
    state => state.error
)