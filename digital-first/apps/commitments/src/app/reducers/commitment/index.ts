import { createSelector } from '@ngrx/store'
import moment = require('moment')
import { toTree } from '@digital-first/df-utils'

import * as fromCommitment from './commitment.reducer'
import { getCommitmentTypeEntities } from '../commitment-type'
import { getLocationEntities } from '../location'
import { getAllComments } from '../comment'
import { getMapPointEntities } from '../map-point'

import { getPartyEntities } from '../party'
import { getPortfolioEntities } from '../portfolio'
import { getAnnouncementTypeEntities } from '../announcement-type'
import { getWhoAnnouncedTypeEntities } from '../who-announced-type'
import { DataTableConfig } from '@digital-first/df-components'

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
    getMapPointEntities,
    (partys, portfolios, locations, announcementTypes, commitmentTypes, whoAnnouncedTypes, mapPoints) =>
        ({
            partys, portfolios, locations, announcementTypes, commitmentTypes, whoAnnouncedTypes, mapPoints
        })
)

export const getCurrentCommitment = createSelector(
    getCommitmentEntities,
    getCurrentCommitentId,
    getAllComments,
    getLookupEnitites,
    (commitments, current, comments, lookups) => {
        const commitment = commitments[current]
        const discussionItems = comments.map(c => ({ ...c })) // creating mutatable list

        if (commitment) {
            return {
                ...commitment,
                portfolio: commitment.portfolio ? lookups.portfolios[commitment.portfolio.id] : null,
                party: commitment.party ? lookups.partys[commitment.party.id] : null,
                location: commitment.location ? lookups.locations[commitment.location.id] : null,
                whoAnnouncedType: commitment.whoAnnouncedType ? lookups.whoAnnouncedTypes[commitment.whoAnnouncedType.id] : null,
                announcementType: commitment.announcementType ? lookups.announcementTypes[commitment.announcementType.id] : null,
                commitmentType: commitment.commitmentType ? lookups.commitmentTypes[commitment.commitmentType.id] : null,
                mapPoints: commitment.mapPoints ? commitment.mapPoints.map(mp => lookups.mapPoints[mp.place_id]) : null,
                date: moment(commitment.date),

                discussion: toTree(discussionItems, {
                    id: 'id',
                    parentId: 'parent',
                    children: 'children',
                    level: 'level',
                    firstParentId: null
                })
            }
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
export const getCommitmentContactsTableData = createSelector(
    getCurrentCommitment,
    (commitment) => {

        const rows = commitment &&
            commitment.contacts &&
            commitment.contacts.map(c => ({
                id: c.ccid,
                cells: [{
                    value: c.name
                }, {
                    value: c.phone
                }, {
                    value: c.email
                }]
            }))

        const dtc: DataTableConfig = {
            title: 'contacts',
            hasDeleteItemButton: true,
            headings: [
                { caption: 'Name' },
                { caption: 'Phone' },
                { caption: 'Email' }
            ],
            rows: rows
        }

        return dtc

    }
)
