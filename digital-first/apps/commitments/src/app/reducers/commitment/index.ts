import { createSelector } from '@ngrx/store'
import moment = require('moment')

import * as fromCommitment from './commitment.reducer'

import {
    getPartyEntities,
    getPortfolioEntities,
    getLocationEntities,
    getAnnouncementTypeEntities,
    getCommitmentTypeEntities,
    getWhoAnnouncedTypeEntities,
    getCriticalDateEntities,
    getThemeTypeEntities,
    getPackageTypeEntities
} from '../commitment-lookup'
import { findInLookup } from '../utils'
import { getCommitmentMapPointEntities } from '../commitment-delivery-location'
import { getAllCommitmentPortfolios } from '../commitment-portfolio'
export { CommitmentEffects } from './commitment.effects'
export * from './commitment.model'

export const getCommitmentEntitiesState = state => state.commitment

export const getCurrentCommitentId = createSelector(
    getCommitmentEntitiesState,
    fromCommitment.getCurrentCommitentId
)

export const {
    selectIds: getCommitmentIds,
    selectEntities: getCommitmentEntities,
    selectAll: getAllCommitments,
    selectTotal: getTotalCommitments,
} = fromCommitment.adapter.getSelectors(getCommitmentEntitiesState)

export const getLookupEnitites = createSelector(
    getPartyEntities,
    getPortfolioEntities,
    getLocationEntities,
    getAnnouncementTypeEntities,
    getCommitmentTypeEntities,
    getWhoAnnouncedTypeEntities,
    getCriticalDateEntities,
    (partys, portfolios, locations, announcementTypes, commitmentTypes, whoAnnouncedTypes, criticalDates) =>
        ({
            partys, portfolios, locations, announcementTypes, commitmentTypes, whoAnnouncedTypes, criticalDates
        })
)

export const getExtraLookupEnitites = createSelector(
    getThemeTypeEntities,
    getPackageTypeEntities,
    (themeTypes, packageTypes) =>
        ({
            themeTypes, packageTypes
        })
)

export const getCurrentCommitment = createSelector(
    getCommitmentEntities,
    getCurrentCommitentId,
    getLookupEnitites,
    getCommitmentMapPointEntities,
    getExtraLookupEnitites,
    getAllCommitmentPortfolios,
    (commitments, current, lookups, mapPoints, extraLookups, commitmentPortfolios) => {
        const commitment = commitments[current]
        if (commitment) {

            const commitmentMapPoints = (commitment.mapPoints || []).reduce((acc, item) => {
                const mp = mapPoints[item.place_id]
                if (mp) {
                    acc.push(mp)
                }
                return acc
            }, [])

            const mappedCommitment = {
                ...commitment,
                portfolio: findInLookup(commitment.portfolio, lookups.portfolios),
                party: findInLookup(commitment.party, lookups.partys),
               // location: findInLookup(commitment.location, lookups.locations),
                whoAnnouncedType: findInLookup(commitment.whoAnnouncedType, lookups.whoAnnouncedTypes),
                themeType: findInLookup(commitment.themeType, extraLookups.themeTypes),
                packageType: findInLookup(commitment.packageType, extraLookups.packageTypes),
                announcementType: findInLookup(commitment.announcementType, lookups.announcementTypes),
                criticalDate: findInLookup(commitment.criticalDate, lookups.criticalDates),
                commitmentType: findInLookup(commitment.commitmentType, lookups.commitmentTypes),
                mapPoints: commitmentMapPoints,
                relatedPortfolios: commitmentPortfolios,
                date: moment(commitment.date),
            }

            return mappedCommitment
        }

        return commitment
    }
)

export const getCurrentCommitmentPDFDocumentDefinition = createSelector(
    getCurrentCommitment,
    (commitment) =>
        commitment
)

export const getCommitmentSaving = createSelector(
    getCommitmentEntitiesState,
    state => state.saved
)

export const getCommitmentLoading = createSelector(
    getCommitmentEntitiesState,
    state => state.loading
)

export const getCommitmentError = createSelector(
    getCommitmentEntitiesState,
    state => state.error
)

export const getCommitmentActivity = createSelector(
    getCommitmentSaving,
    getCommitmentLoading,
    getCommitmentError,
    (saved, loading, error) => (
        {
            saved: saved,
            loading: loading,
            error: error
        }
    )
)
