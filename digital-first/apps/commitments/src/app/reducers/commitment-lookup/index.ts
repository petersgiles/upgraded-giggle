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

export const getAllThemeTypes = createSelector(
    getCommitmentLookupState,
    state => state.themeTypes
)

export const getThemeTypeEntities = createSelector(
    getAllThemeTypes,
    arrayToHash
)

export const getAllPackageTypes = createSelector(
    getCommitmentLookupState,
    state => state.packageTypes
)

export const getPackageTypeEntities = createSelector(
    getAllPackageTypes,
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

export const getCostingPortfolios = createSelector(
    getCommitmentLookupState,
    state => state.portfolios.filter(p => p)
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