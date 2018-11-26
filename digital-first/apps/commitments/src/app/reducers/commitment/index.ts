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
import { getCriticalDateEntities } from '../critical-date'

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
    getAllComments,
    getLookupEnitites,
    getMapPointEntities,
    (commitments, current, comments, lookups, mapPoints) => {
        const commitment = commitments[current]
        const discussionItems = comments.map(c => ({ ...c })) // creating mutatable list

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

                discussion: toTree(discussionItems, {
                    id: 'id',
                    parentId: 'parent',
                    children: 'children',
                    level: 'level',
                    firstParentId: null
                })
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

export const getRelatedCommitmentsTableData = createSelector(
    getCurrentCommitment,
    (commitment) => {

        const rows = commitment &&
            commitment.relatedContacts &&
            commitment.relatedContacts.map(c => ({
                id: c.id,
                cells: [{
                    value: `${c.title}`
                }]
            }))

        const dtc: DataTableConfig = {
            title: 'related commitments',
            hasDeleteItemButton: true,
            headings: [
                { caption: 'Commitment' }
            ],
            rows: rows
        }

        return dtc

    }
)

export const getCommitmentContactsTableData = createSelector(
    getCurrentCommitment,
    (commitment) => {

        const rows = commitment &&
            commitment.contacts &&
            commitment.contacts.map(c => {

                const fullname = []
                if (c.firstName) {
                    fullname.push(c.firstName)
                }

                if (c.name) {
                    fullname.push(c.name)
                }

                return {
                    id: c.ccid,
                    cells: [{
                        value: `${fullname.join(' ')}`
                    }, {
                        value: c.jobTitle
                    }, {
                        value: c.phone
                    }, {
                        value: c.email
                    }, {
                        value: c.portfolio ? c.portfolio.title : ''
                    }]
                }
            })

        const dtc: DataTableConfig = {
            title: 'contacts',
            hasDeleteItemButton: true,
            headings: [
                { caption: 'Name' },
                { caption: 'Job Title' },
                { caption: 'Phone' },
                { caption: 'Email' },
                { caption: 'Portfolio' }
            ],
            rows: rows
        }

        return dtc

    }
)
