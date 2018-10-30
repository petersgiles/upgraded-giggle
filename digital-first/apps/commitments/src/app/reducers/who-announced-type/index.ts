import * as fromWhoAnnouncedType from './who-announced-type.reducer'
import { createSelector } from '@ngrx/store'

export const getWhoAnnouncedTypeEntitiesState = state => state.announcementType

export const {
    selectIds: getWhoAnnouncedTypeIds,
    selectEntities: getWhoAnnouncedTypeEntities,
    selectAll: getAllWhoAnnouncedTypes,
    selectTotal: getTotalWhoAnnouncedTypes,
} = fromWhoAnnouncedType.adapter.getSelectors(getWhoAnnouncedTypeEntitiesState)

export const getWhoAnnouncedTypeLoading = createSelector(
    getWhoAnnouncedTypeEntitiesState,
    state => state.loading
)

export const getWhoAnnouncedTypeError = createSelector(
    getWhoAnnouncedTypeEntitiesState,
    state => state.error
)