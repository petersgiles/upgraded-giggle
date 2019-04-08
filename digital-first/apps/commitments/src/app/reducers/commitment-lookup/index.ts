import { createSelector } from '@ngrx/store'
import { arrayToHash } from '@df/utils'

export const getCommitmentLookupState = state => state.commitmentLookup

const portfolioSelector = state => {
  if (state.portfolios) {
    return state.portfolios.filter(p => p.type.includes('portfolio'))
  }
  return null
}

const agencyCostingSelector = state => {
  if (state.portfolios) {
    return state.portfolios.filter(p => p.type.includes('costing'))
  }
  return null
}

export const getAllAnnouncementTypes = createSelector(
  getCommitmentLookupState,
  state => state.announcementTypes
)

export const getAnnouncementTypeEntities = createSelector(
  getAllAnnouncementTypes,
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
  portfolioSelector
)

export const getCostingAgencies = createSelector(
  getCommitmentLookupState,
  agencyCostingSelector
)

export const getPortfolioEntities = createSelector(
  getAllPortfolios,
  arrayToHash
)

export const getAllPackages = createSelector(
  getCommitmentLookupState,
  state => state.packages
)

export const getPackageEntities = createSelector(
  getAllPackages,
  arrayToHash
)

export const getAllThemes = createSelector(
  getCommitmentLookupState,
  state => state.themes
)

export const getThemeEntities = createSelector(
  getAllThemes,
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

export const getAllStatuses = createSelector(
  getCommitmentLookupState,
  state => state.statuses
)

export const getStatusEntities = createSelector(
  getAllStatuses,
  arrayToHash
)

export const getLookupCommitmentPortfolios = createSelector(
  getCommitmentLookupState,
  state => state.relatedPortfolios
)

export const getLookupCommitmentPackages = createSelector(
  getCommitmentLookupState,
  state => state.relatedPackages
)

export const getLookupCommitmentElectorates = createSelector(
  getCommitmentLookupState,
  state => state.commitmentElectorates
)

export const getLookupCommitmentContacts = createSelector(
  getCommitmentLookupState,
  state => state.commitmentContacts
)

export const getLookupCommitmentMapPoints = createSelector(
  getCommitmentLookupState,
  state => state.commitmentMapPoints
)

export const getLookupMapPoints = createSelector(
  getCommitmentLookupState,
  state => state.mapPoints
)

export const getRelatedCommitments = createSelector(
  getCommitmentLookupState,
  state => state.relatedCommitments
)
