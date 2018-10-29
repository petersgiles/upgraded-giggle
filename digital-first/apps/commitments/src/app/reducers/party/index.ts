import * as fromParty from './party.reducer'
import { createSelector } from '@ngrx/store'

export const getPartyEntitiesState = state => state.party

export const {
    selectIds: getPartyIds,
    selectEntities: getPartyEntities,
    selectAll: getAllPartys,
    selectTotal: getTotalPartys,
} = fromParty.adapter.getSelectors(getPartyEntitiesState)

export const getPartyLoading = createSelector(
    getPartyEntitiesState,
    state => state.loading
)

export const getPartyError = createSelector(
    getPartyEntitiesState,
    state => state.error
)