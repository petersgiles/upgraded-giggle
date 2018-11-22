import { createSelector } from '@ngrx/store'
import { RefinerGroup, DataTableConfig } from '@digital-first/df-components'
import { of } from 'rxjs'

import * as fromCommitmentOverview from './commitment-overview.reducer'
import { getCommitmentTypeEntities, getAllCommitmentTypes } from '../commitment-type'
import { getLocationEntities, getAllLocations } from '../location'
import { getPartyEntities, getAllPartys } from '../party'
import { getPortfolioEntities, getAllPortfolios } from '../portfolio'
import { getAnnouncementTypeEntities, getAllAnnouncementTypes } from '../announcement-type'
import { getAllCommitments } from '../commitment'
import { Commitment } from '../commitment/commitment.model'
import { getAllWhoAnnouncedTypes, getWhoAnnouncedTypeEntities } from '../who-announced-type'

export const getCommitmentOverviewState = state => state.commitmentOverview

export const getCommitmentOverviewExpandedRefinerGroups = createSelector(
    getCommitmentOverviewState,
    fromCommitmentOverview.getExpandedRefinerGroups
)

export const getCommitmentOverviewSelectedRefiners = createSelector(
    getCommitmentOverviewState,
    fromCommitmentOverview.getSelectedRefiners
)

export const getCommitmentOverviewTextRefiner = createSelector(
    getCommitmentOverviewState,
    fromCommitmentOverview.getTextRefiner
)

export const getRefinerGroupCounts = createSelector(
    getCommitmentOverviewSelectedRefiners,
    (selected) => {

    }
)

const REFINER_GROUP_FAVOURITES = {
    key: 'favourite',
    title: 'Favourites'
}
const REFINER_GROUP_PARTY = {
    key: 'party', // key needs to match property on artifact (commitment)
    title: 'Party'
}
const REFINER_GROUP_PORTFOLIO = {
    key: 'portfolio', // key needs to match property on artifact
    title: 'Responsible Portfolio'
}
const REFINER_GROUP_LOCATION = {
    key: 'location',  // key needs to match property on artifact
    title: 'Location'
}
const REFINER_GROUP_CRITICAL_DATE = {
    key: 'criticalDate',  // key needs to match property on artifact
    title: 'Critical Date'
}
const REFINER_GROUP_ANNOUNCEMENT_TYPE = {
    key: 'announcementType', // key needs to match property on artifact
    title: 'Announcement'
}
const REFINER_GROUP_COMMITMENT_TYPE = {
    key: 'commitmentType', // key needs to match property on artifact
    title: 'Commitment'
}
const REFINER_GROUP_WHO_ANNOUNCED_TYPE = {
    key: 'whoAnnouncedType', // key needs to match property on artifact
    title: 'Who Announced'
}

export const getRefinerGroups = createSelector(
    getCommitmentOverviewSelectedRefiners,
    getCommitmentOverviewExpandedRefinerGroups,
    getAllPartys,
    getAllPortfolios,
    // getAllLocations,
    getAllAnnouncementTypes,
    getAllCommitmentTypes,
    getAllWhoAnnouncedTypes,
    (selected, groups, partys, portfolios,
        // locations,
        announcementTypes, commitmentTypes, whoAnnouncedTypes) => {

        const refinerGroups: RefinerGroup[] = []

        // const userDefinedRefiners: RefinerGroup = {
        //     id: REFINER_GROUP_FAVOURITES.key,
        //     title: REFINER_GROUP_FAVOURITES.title,
        //     expanded: true,
        //     custom: true,
        //     children: []
        // }
        // refinerGroups.push(userDefinedRefiners)

        const refiners = [
            partys,
            portfolios,
            // locations,
            announcementTypes,
            commitmentTypes,
            whoAnnouncedTypes]

        const refinerGroupTitles = [
            REFINER_GROUP_PARTY,
            REFINER_GROUP_PORTFOLIO,
            // REFINER_GROUP_LOCATION,
            REFINER_GROUP_ANNOUNCEMENT_TYPE,
            REFINER_GROUP_COMMITMENT_TYPE,
            REFINER_GROUP_WHO_ANNOUNCED_TYPE
        ]
        refiners.reduce((acc: RefinerGroup[], item: any[], index: number) => {

            const groupkey = refinerGroupTitles[index].key
            const grouptitle = refinerGroupTitles[index].title
            const rg: RefinerGroup = {
                id: groupkey,
                title: grouptitle,
                expanded: !!groups.find(r => r === groupkey),
                children: item
                    .map(p => ({
                        id: p.id,
                        groupId: groupkey,
                        title: p.title,
                        selected: !!selected.find(r => r.groupId === groupkey && r.id === p.id),
                    }))
            }
            acc.push(rg)
            return acc
        }, refinerGroups)

        return refinerGroups
    }
)

export const getRefinersAsFilter = createSelector(
    getRefinerGroups,
    (groups) => groups.reduce((acc, item) => {
        (acc[item.id] = item.children && item.children.filter(rt => rt.selected))
        return acc
    }, {}))

export const getFilteredOverviewCommitments = createSelector(
    getAllCommitments,
    getRefinersAsFilter,
    getCommitmentOverviewTextRefiner,
    (arr: Commitment[], filters: any, filterText) => {
        const filterKeys = Object.keys(filters)
        const refined = arr.filter(eachObj =>
            filterKeys.every(eachKey => {
                if (!filters[eachKey].length) {
                    return true // passing an empty filter means that filter is ignored.
                }
                const filteredProperty = filters[eachKey].map(fp => fp.id).includes(eachObj[eachKey] && eachObj[eachKey].id)
                return filteredProperty // filters[eachKey].includes(eachObj[eachKey])
            }))

        if (!filterText) {

            return refined
        }
        return refined.filter(o => Object.keys(o).some(k => {

            if (typeof o[k] === 'string') {
                return o[k].toLowerCase().includes(filterText.toLowerCase())
            }
            return false
        }
        ))
    }
)

export const getAllOverviewCommitments = createSelector(
    getFilteredOverviewCommitments,
    getLocationEntities,
    getPartyEntities,
    getPortfolioEntities,
    getAnnouncementTypeEntities,
    getCommitmentTypeEntities,
    getWhoAnnouncedTypeEntities,
    (commitments, locations, partys, portfolios, announcementTypes, commitmentTypes, whoAnnouncedTypes) => {

        const result = commitments.map(commitment =>
            ({
                ...commitment,
                description: null,
                portfolio: commitment.portfolio ? portfolios[commitment.portfolio.id] : null,
                party: commitment.party ? partys[commitment.party.id] : null,
                location: commitment.location ? locations[commitment.location.id] : null,
                whoAnnouncedType: commitment.whoAnnouncedType ? whoAnnouncedTypes[commitment.whoAnnouncedType.id] : null,
                announcementType: commitment.announcementType ? announcementTypes[commitment.announcementType.id] : null,
                commitmentType: commitment.commitmentType ? commitmentTypes[commitment.commitmentType.id] : null,
            }))

        return result

    }

)

export const getAllOverviewCommitmentDataTables = createSelector(
    getAllOverviewCommitments,
    (commitments) => {

        const rows = commitments.map(c => ({
            id: c.id,
            cells: [{
                value: c.title
            }, {
                value: c.party && c.party.title
            }, {
                value: c.location && c.location.title
            }, {
                value: c.portfolio && c.portfolio.title
            }, {
                value: c.announcementType && c.announcementType.title
            }, {
                value: c.commitmentType && c.commitmentType.title
            }]
        }))

        const dtc: DataTableConfig = {
            title: 'commitments',
            headings: [
                { caption: 'Title' },
                { caption: 'Party' },
                { caption: 'Location' },
                { caption: 'Responsible Portfolio' },
                { caption: 'Announcement' },
                { caption: 'Commitment' }],
            rows: rows
        }

        return dtc

    }
)
