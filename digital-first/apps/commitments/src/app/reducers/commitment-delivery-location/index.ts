import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-datatable'

import * as fromCommitmentDeliveryLocations from './commitment-delivery-location.reducer'
import { arrayToHash } from '@digital-first/df-utils'

export const getDeliveryLocationEntitiesState = state => state.deliveryLocation

export const getDeliveryLocationLoading = createSelector(
    getDeliveryLocationEntitiesState,
    fromCommitmentDeliveryLocations.getLoading
)

export const getDeliveryLocationError = createSelector(
    getDeliveryLocationEntitiesState,
    fromCommitmentDeliveryLocations.getError
)

export const getCommitmentDeliveryLocationsPanelExpanded = createSelector(
    getDeliveryLocationEntitiesState,
    fromCommitmentDeliveryLocations.getExpanded
)

export const getCommitmentMapPoints = createSelector(
    getDeliveryLocationEntitiesState,
    fromCommitmentDeliveryLocations.selectAllMapPoints
)

export const getCommitmentMapPointEntities = createSelector(
    getCommitmentMapPoints,
    arrayToHash
)

export const getCommitmentElectorates = createSelector(
    getDeliveryLocationEntitiesState,
    fromCommitmentDeliveryLocations.selectAllElectorates
)

export const getCommitmentElectorateEntities = createSelector(
    getCommitmentElectorates,
    (electorates) => arrayToHash(electorates, 'electorate')
)