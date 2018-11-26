import * as fromLocation from './location.reducer'
import { createSelector } from '@ngrx/store'
export const getLocationEntitiesState = state => state.location

export const {
    selectIds: getLocationIds,
    selectEntities: getLocationEntities,
    selectAll: getAllLocations,
    selectTotal: getTotalLocations,
} = fromLocation.adapter.getSelectors(getLocationEntitiesState)

const groupSortOrder = ['national', 'state', 'act', 'nsw', 'nt', 'qld', 'sa', 'tas', 'vic', 'wa']

export const getAllLocationsGrouped = createSelector(
    getAllLocations,
    (locations) => {
        const sorted = locations.sort((leftSide, rightSide) => {

            let compare = 0

            const leftTitle = `${leftSide.group}${leftSide.title}`.toLowerCase()
            const rightTitle = `${rightSide.group}${rightSide.title}`.toLowerCase()

            if (leftTitle < rightTitle) { compare = -1 }
            if (leftTitle > rightTitle) { compare = 1 }

            return compare

        })
        return sorted
    }
)

export const getLocationLoading = createSelector(
    getLocationEntitiesState,
    state => state.loading
)

export const getLocationError = createSelector(
    getLocationEntitiesState,
    state => state.error
)