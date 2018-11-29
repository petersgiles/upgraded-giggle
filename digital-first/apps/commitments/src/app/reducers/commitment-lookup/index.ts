import { createSelector } from '@ngrx/store'
import { arrayToHash } from '@digital-first/df-utils'

export const getCommitmentLookupState = state => state.commitmentLookup

export const getAllAnnouncementTypes = createSelector(
    getCommitmentLookupState,
    state => state.announcementTypes
)

export const getAnnouncementTypeEntities = createSelector(
    getAllAnnouncementTypes,
    arrayToHash
)

export const getAllCommitmentTypes = createSelector(
    getCommitmentLookupState,
    state => state.commitmentTypes
)

export const getCommitmentTypeEntities = createSelector(
    getAllCommitmentTypes,
    arrayToHash
)

export const getAllCriticalDates = createSelector(
    getCommitmentLookupState,
    state => state.criticalDates
)

export const getCriticalDateEntities = createSelector(
    getAllCriticalDates,
    arrayToHash
)

export const getAllLocations = createSelector(
    getCommitmentLookupState,
    state => state.locations
)

export const getLocationEntities = createSelector(
    getAllLocations,
    arrayToHash
)

export const getAllParties = createSelector(
    getCommitmentLookupState,
    state => state.parties
)

export const getAllPartys = createSelector(
    getCommitmentLookupState,
    state => state.parties
)

export const getPartyEntities = createSelector(
    getAllParties,
    arrayToHash
)

export const getAllPortfolios = createSelector(
    getCommitmentLookupState,
    state => state.portfolios
)

export const getPortfolioEntities = createSelector(
    getAllPortfolios,
    arrayToHash
)

export const getAllWhoAnnouncedTypes = createSelector(
    getCommitmentLookupState,
    state => state.whoAnnouncedTypes
)

export const getWhoAnnouncedTypeEntities = createSelector(
    getAllWhoAnnouncedTypes,
    arrayToHash
)