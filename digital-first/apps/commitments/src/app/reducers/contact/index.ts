import { createSelector } from '@ngrx/store'
import * as fromContact from './contact.reducer'

export const getContactEntitiesState = state => state.contact

export const {
    selectIds: getContactIds,
    selectEntities: getContactEntities,
    selectAll: getAllContacts,
    selectTotal: getTotalContacts,
} = fromContact.adapter.getSelectors(getContactEntitiesState)

export const getContactLoading = createSelector(
    getContactEntitiesState,
    state => state.loading
)

export const getContactError = createSelector(
    getContactEntitiesState,
    state => state.error
)