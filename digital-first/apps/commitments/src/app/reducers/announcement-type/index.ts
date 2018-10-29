import * as fromAnnouncementType from './announcement-type.reducer'
import { createSelector } from '@ngrx/store'

export const getAnnouncementTypeEntitiesState = state => state.announcementType

export const {
    selectIds: getAnnouncementTypeIds,
    selectEntities: getAnnouncementTypeEntities,
    selectAll: getAllAnnouncementTypes,
    selectTotal: getTotalAnnouncementTypes,
} = fromAnnouncementType.adapter.getSelectors(getAnnouncementTypeEntitiesState)

export const getAnnouncementTypeLoading = createSelector(
    getAnnouncementTypeEntitiesState,
    state => state.loading
)

export const getAnnouncementTypeError = createSelector(
    getAnnouncementTypeEntitiesState,
    state => state.error
)