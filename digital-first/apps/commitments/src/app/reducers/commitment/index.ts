import { createSelector } from '@ngrx/store'
import moment = require('moment')
import { toTree } from '@digital-first/df-utils'

import * as fromCommitment from './commitment.reducer'
import { getCommitmentTypeEntities, getAllCommitmentTypes } from '../commitment-type'
import { getLocationEntities, getAllLocations } from '../location'
import { getAllComments } from '../comment'

import { getPartyEntities } from '../party'
import { getPortfolioEntities } from '../portfolio'
import { getAnnouncementTypeEntities } from '../announcement-type'

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

export const getCurrentCommitment = createSelector(
    getCommitmentEntities,
    getCurrentCommitentId,
    getPartyEntities,
    getPortfolioEntities,
    getLocationEntities,
    getAnnouncementTypeEntities,
    getCommitmentTypeEntities,
    getAllComments,
    (commitments, current, partys, portfolios, locations, announcementTypes, commitmentTypes, comments) => {
        const commitment = commitments[current]
        const discussionItems = comments.map(c => ({ ...c })) // creating mutatable list

        // tslint:disable-next-line:no-console
        console.log('getCurrentCommitment =>', commitment)

        if (commitment) {
            return {
                ...commitment,
                portfolio: commitment.portfolio ? portfolios[commitment.portfolio.id] : null,
                party: commitment.party ? partys[commitment.party.id] : null,
                location: commitment.location ? locations[commitment.location.id] : null,
                announcementType: commitment.announcementType ? announcementTypes[commitment.announcementType.id] : null,
                commitmentType: commitment.commitmentType ? commitmentTypes[commitment.commitmentType.id] : null,
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

export const getCommitmentLoading = createSelector(
    getCommitmentEntitiesState,
    state => state.loading
)

export const getCommitmentError = createSelector(
    getCommitmentEntitiesState,
    state => state.error
)
