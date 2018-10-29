import { createSelector } from '@ngrx/store'
import { RefinerGroup } from '@digital-first/df-components'

import * as fromCommitmentOverview from './commitment-overview.reducer'
import { getCommitmentTypeEntities, getAllCommitmentTypes } from '../commitment-type'
import { getLocationEntities, getAllLocations } from '../location'
import { getPartyEntities, getAllPartys } from '../party'
import { getPortfolioEntities, getAllPortfolios } from '../portfolio'
import { getAnnouncementTypeEntities, getAllAnnouncementTypes } from '../announcement-type'
import { getAllCommitments } from '../commitment'

export const getCommitmentOverviewState = state => state.commitmentOverview

export const getCommitmentOverviewExpandedRefinerGroups = createSelector(
    getCommitmentOverviewState,
    fromCommitmentOverview.getExpandedRefinerGroups
)

export const getCommitmentOverviewSelectedRefiners = createSelector(
    getCommitmentOverviewState,
    fromCommitmentOverview.getSelectedRefiners
)

export const getRefinerGroupCounts = createSelector(
    getCommitmentOverviewSelectedRefiners,
    (selected) => {

    }
)

export const getRefinerGroups = createSelector(
    getCommitmentOverviewSelectedRefiners,
    getCommitmentOverviewExpandedRefinerGroups,
    getAllPartys,
    getAllPortfolios,
    getAllLocations,
    getAllAnnouncementTypes,
    getAllCommitmentTypes,
    (selected, groups, partys, portfolios, locations, announcementTypes, commitmentTypes) => {

        const refinerGroups: RefinerGroup[] = []

        let groupId = 0
        groupId++
        const userDefinedRefiners: RefinerGroup = {
            id: groupId,
            title: 'Favourites',
            expanded: true,
            custom: true,
            children: null
        }
        refinerGroups.push(userDefinedRefiners)

        const refiners = [partys, portfolios, locations, announcementTypes, commitmentTypes]
        const refinerGroupTitles = ['Party', 'Portfolio', 'Location', 'Announcement Type', 'Commitment Type']
        refiners.reduce((acc: RefinerGroup[], item: any[], index: number) => {
            groupId++
            const rg: RefinerGroup = {
                id: groupId,
                title: refinerGroupTitles[index],
                expanded: !!groups.find(r => r === groupId),
                children: item
                    .map(p => ({
                        id: p.id,
                        groupId: groupId,
                        title: p.title,
                        selected: !!selected.find(r => r.groupId === groupId && r.id === p.id),
                    }))
            }
            acc.push(rg)
            return acc
        }, refinerGroups)

        return refinerGroups
    }
)

export const getAllOverviewCommitments = createSelector(
    getAllCommitments,
    getPartyEntities,
    getPortfolioEntities,
    getLocationEntities,
    getAnnouncementTypeEntities,
    getCommitmentTypeEntities,
    (commitments, partys, portfolios, locations, announcementTypes, commitmentTypes) => {

        const result = commitments.map(commitment =>
            ({
                ...commitment,
                description: null,
                portfolio: commitment.portfolio ? portfolios[commitment.portfolio.id] : null,
                party: commitment.party ? partys[commitment.party.id] : null,
                location: commitment.location ? locations[commitment.location.id] : null,
                announcementType: commitment.announcementType ? announcementTypes[commitment.announcementType.id] : null,
                commitmentType: commitment.commitmentType ? commitmentTypes[commitment.commitmentType.id] : null,
            }))

        return result

    }

)
