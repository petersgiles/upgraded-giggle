import { createSelector } from '@ngrx/store'
import moment = require('moment')
import { toTree } from '@digital-first/df-utils'

import * as fromCommitment from './commitment.reducer'
import { getMapPointEntities } from '../map-point'

import {
    getPartyEntities,
    getPortfolioEntities,
    getLocationEntities,
    getAnnouncementTypeEntities,
    getCommitmentTypeEntities,
    getWhoAnnouncedTypeEntities,
    getCriticalDateEntities
} from '../commitment-lookup'
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

export const getCurrentCommitment = createSelector(
    getCommitmentEntities,
    getCurrentCommitentId,
    getLookupEnitites,
    getMapPointEntities,
    (commitments, current, lookups, mapPoints) => {
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
                portfolio: commitment.portfolio ? lookups.portfolios[commitment.portfolio.id] : null,
                party: commitment.party ? lookups.partys[commitment.party.id] : null,
                location: commitment.location ? lookups.locations[commitment.location.id] : null,
                whoAnnouncedType: commitment.whoAnnouncedType ? lookups.whoAnnouncedTypes[commitment.whoAnnouncedType.id] : null,
                announcementType: commitment.announcementType ? lookups.announcementTypes[commitment.announcementType.id] : null,
                criticalDate: commitment.criticalDate ? lookups.criticalDates[commitment.criticalDate.id] : null,
                commitmentType: commitment.commitmentType ? lookups.commitmentTypes[commitment.commitmentType.id] : null,
                mapPoints: commitmentMapPoints,
                date: moment(commitment.date),
            }

            return mappedCommitment
        }

        return commitment
    }
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
