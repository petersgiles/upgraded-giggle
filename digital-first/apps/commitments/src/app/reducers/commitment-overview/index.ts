import {
  createSelector,
  createSelectorFactory,
  defaultMemoize
} from '@ngrx/store'
import { RefinerGroup } from '@digital-first/df-refiner'
import * as fromCommitmentOverview from './commitment-overview.reducer'
import { getAllContacts } from '../contact'
import { getAllCommitments } from '../commitment'
import { Commitment } from '../commitment/commitment.model'
import { formatCommitmentTitle, formatCommitmentId } from '../../formatters'
import {
  getAllPortfolios,
  getAllAnnouncementTypes,
  getAllCommitmentTypes,
  getAllWhoAnnouncedTypes,
  getCriticalDateEntities,
  getPartyEntities,
  getPortfolioEntities,
  getAnnouncementTypeEntities,
  getCommitmentTypeEntities,
  getWhoAnnouncedTypeEntities,
  getAllPartys,
  getAllThemeTypes,
  getAllPackageTypes,
  getAllLocations,
  getCostingAgencies,
  getAllThemes,
  getAllStatuses,
  getLookupCommitmentPortfolios,
  getLookupCommitmentPackages,
  getLookupCommitmentElectorates,
  getLookupCommitmentContacts,
  getLookupCommitmentMapPoints,
  getLookupMapPoints,
  getRelatedCommitments,
} from '../commitment-lookup'
import {
  findInLookup,
  findInLookupCommitmentAssocs,
  findInLookupCommitmentContact,
  findInLookupCommitmentMapPoint
} from '../utils'
import {
  DATA_TABLE_SORT_DIRECTION,
  DATA_TABLE_SORT_DIRECTION_DESC,
  DATA_TABLE_SORT_DIRECTION_ASC
} from '@digital-first/df-datatable'

export const getCommitmentOverviewState = state => state.commitmentOverview

export const getSortState = createSelector(
  getCommitmentOverviewState,
  state => {
    let index = 0
    const sortState: DATA_TABLE_SORT_DIRECTION[] = new Array()
    const titleArray: string[] = [
      'title',
      'party',
      'portfolio',
      'commitmentType',
      'criticalDate'
    ]
    titleArray.forEach(column => {
      sortState[column] = null
      if (column === state.sortColumn) {
        sortState[column] = state.sortDirection
      }
      index++
    })

    return sortState
  }
)

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
  selected => {}
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
  key: 'location', // key needs to match property on artifact
  title: 'Location'
}
const REFINER_GROUP_CRITICAL_DATE = {
  key: 'criticalDate', // key needs to match property on artifact
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
const REFINER_GROUP_PACKAGE_TYPE = {
  key: 'packageType', // key needs to match property on artifact
  title: 'Package'
}
const REFINER_GROUP_STATUS = {
  key: 'status', // key needs to match property on artifact
  title: 'Status'
}
const REFINER_GROUP_RELATED_PORTFOLIOS = {
  key: 'relatedPortfolio', // key needs to match property on artifact
  title: 'Related Portfolio'
}
export const getRefinerUx = createSelector(
  getCommitmentOverviewSelectedRefiners,
  getCommitmentOverviewExpandedRefinerGroups,
  (selected, groups) => ({ selected, groups })
)

export const getRefinerPartyPortfolio = createSelector(
  getAllPartys,
  getAllPortfolios,
  // getAllLocations,
  (
    partys,
    portfolios
    // locations
  ) => ({ partys, portfolios })
)

export const getRefinerLookups = createSelector(
  getAllAnnouncementTypes,
  getAllCommitmentTypes,
  getAllWhoAnnouncedTypes,
  getAllThemeTypes,
  getAllPackageTypes,
  getAllStatuses,
  //getCriticalDateEntities,
  getLookupCommitmentPortfolios,
  (
    announcementTypes,
    commitmentTypes,
    whoAnnouncedTypes,
    themes,
    packages,
    statuses,
    //criticalDates,
    relatedPortfolios,
  ) => ({
    announcementTypes,
    commitmentTypes,
    whoAnnouncedTypes,
    themes,
    packages,
    statuses,
    //criticalDates,
    relatedPortfolios,
  })
)

export const getRefinerGroups = createSelector(
  getRefinerUx,
  getRefinerPartyPortfolio,
  getRefinerLookups,
  (uxState, pp, lookups) => {
    const refinerGroups: RefinerGroup[] = []

    const refiners = [
      pp.partys,
      pp.portfolios,
      lookups.announcementTypes,
      lookups.commitmentTypes,
      lookups.whoAnnouncedTypes,
      lookups.packages,
      lookups.statuses,
     // lookups.criticalDates,
      lookups.relatedPortfolios
    ]

    const refinerGroupTitles = [
      REFINER_GROUP_PARTY,
      REFINER_GROUP_PORTFOLIO,
      REFINER_GROUP_ANNOUNCEMENT_TYPE,
      REFINER_GROUP_COMMITMENT_TYPE,
      REFINER_GROUP_WHO_ANNOUNCED_TYPE,
      REFINER_GROUP_PACKAGE_TYPE,
      REFINER_GROUP_STATUS,
      //REFINER_GROUP_CRITICAL_DATE,
      REFINER_GROUP_RELATED_PORTFOLIOS
    ]
    refiners.reduce((acc: RefinerGroup[], item: any[], index: number) => {
      const groupkey = refinerGroupTitles[index].key
      const grouptitle = refinerGroupTitles[index].title
      const rg: RefinerGroup = {
        id: groupkey,
        title: grouptitle,
        expanded: !!uxState.groups.find(r => r === groupkey),
        children: (item || []).map(p => ({
          id: p.id,
          groupId: groupkey,
          title: p.title,
          selected: !!uxState.selected.find(
            r => r.groupId === groupkey && r.id === p.id
          )
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
  groups =>
    groups.reduce((acc, item) => {
      acc[item.id] = item.children && item.children.filter(rt => rt.selected)
      return acc
    }, {})
)

export const getFilteredOverviewCommitments = createSelector(
  getAllCommitments,
  getRefinersAsFilter,
  getCommitmentOverviewTextRefiner,
  getLookupCommitmentPackages,
  getLookupCommitmentPortfolios,
  (arr: Commitment[], filters: any, filterText, packages: any, relatedPortfolios: any) => {
    const filterKeys = Object.keys(filters)
    let refined = arr.filter(eachObj =>
      filterKeys.every(eachKey => {
        if (!filters[eachKey].length) {
          return true // passing an empty filter means that filter is ignored.
        }
        
        if(eachKey === 'packageType'){
          let filteredProperty = filters[eachKey]
          .map(fp => fp.groupId === 'packageType' && packages.find(pkg => fp.title === pkg.package && eachObj.title === pkg.title))  
          .filter(fp => !!fp === true)
          return filteredProperty ? (filteredProperty.length ? true : false) : false
        }
        else  if(eachKey === 'relatedPortfolio'){
          let filteredProperty = filters[eachKey]
          .map(fp => fp.groupId === 'relatedPortfolio' && relatedPortfolios.find(rel => fp.title === eachObj.portfolio.title && eachObj.title === rel.commitment))  
          .filter(fp => !!fp === true)
          return filteredProperty ? (filteredProperty.length ? true : false) : false
        }
        else{
          let filteredProperty = filters[eachKey]
          .map(fp => fp.id)
          .includes(eachObj[eachKey] && eachObj[eachKey].id)
          return filteredProperty 
        }
      })
    )

    if (filterText) {
      refined = refined.filter(o =>
        Object.keys(o).some(k => {
          if (typeof o[k] === 'string') {
            return o[k].toLowerCase().includes(filterText.toLowerCase())
          }
          return false
        })
      )
    }

    return refined
  }
)

const selectorFunc = createSelectorFactory(defaultMemoize)
export const lookupAllSelector = selectorFunc(
  getPartyEntities,
  getPortfolioEntities,
  getAnnouncementTypeEntities,
  getCommitmentTypeEntities,
  getWhoAnnouncedTypeEntities,
  getCriticalDateEntities,
  getAllLocations,
  getCostingAgencies,
  getAllThemes,
  getAllStatuses,
  getLookupCommitmentPortfolios,
  getLookupCommitmentPackages,
  getLookupCommitmentElectorates,
  getLookupCommitmentContacts,
  getAllContacts,
  getLookupCommitmentMapPoints,
  getLookupMapPoints,
  getRelatedCommitments,
  (
    partys,
    portfolios,
    announcementTypes,
    commitmentTypes,
    whoAnnouncedTypes,
    criticalDates,
    locations,
    costingAgencies,
    themes,
    statuses,
    commitmentPortfolios,
    commitmentPackages,
    commitmentElectorates,
    commitmentContacts,
    allContacts,
    commitmentMapPoints,
    allMapPoints,
    relatedCommitments
  ) => ({
    partys,
    portfolios,
    announcementTypes,
    commitmentTypes,
    whoAnnouncedTypes,
    criticalDates,
    locations,
    costingAgencies,
    themes,
    statuses,
    commitmentPortfolios,
    commitmentPackages,
    commitmentElectorates,
    commitmentContacts: commitmentContacts || [],
    allContacts,
    commitmentMapPoints: commitmentMapPoints || [],
    allMapPoints,
    relatedCommitments
  })
)

const getFieldValue = (columnName: string, commitment: Commitment) => {
  if (!commitment[columnName]) {
    return ''
  }

  if (commitment[columnName].hasOwnProperty('title')) {
    return commitment[columnName].title
  } else {
    return commitment[columnName]
  }
}

const sortByField = (
  column: string,
  sortDirection: DATA_TABLE_SORT_DIRECTION,
  a: Commitment,
  b: Commitment
) => {
  let first: Commitment
  let second: Commitment
  switch (sortDirection) {
    case DATA_TABLE_SORT_DIRECTION_ASC:
      first = a
      second = b
      break

    case DATA_TABLE_SORT_DIRECTION_DESC:
      first = b
      second = a
      break

    default:
      break
  }

  const firstValue = getFieldValue(column, first)
  const secondValue = getFieldValue(column, second)
  return firstValue.localeCompare(secondValue)
}

export const getAllOverviewCommitments = createSelector(
  getFilteredOverviewCommitments,
  lookupAllSelector,
  getCommitmentOverviewState,
  (commitments, lookups, state) => {
    const result = commitments.map(commitment => ({
      ...commitment,
      commitmentId: formatCommitmentId(commitment),
      description: null,
      portfolio: findInLookup(commitment.portfolio, lookups.portfolios),
      party: findInLookup(commitment.party, lookups.partys),
      cost: commitment.cost,
      announcedBy: commitment.announcedby,
      date: commitment.date,
      location: findInLookup(commitment.location, lookups.locations),
      whoAnnouncedType: findInLookup(
        commitment.whoAnnouncedType,
        lookups.whoAnnouncedTypes
      ),
      announcementType: findInLookup(
        commitment.announcementType,
        lookups.announcementTypes
      ),
      criticalDate: findInLookup(
        commitment.criticalDate,
        lookups.criticalDates
      ),
      commitmentType: findInLookup(
        commitment.commitmentType,
        lookups.commitmentTypes
      ),
      portfolios: findInLookupCommitmentAssocs(
        commitment,
        lookups.commitmentPortfolios,
        'portfolio'
      ),
      packages: findInLookupCommitmentAssocs(
        commitment,
        lookups.commitmentPackages,
        'package'
      ),
      electorates: findInLookupCommitmentAssocs(
        commitment,
        lookups.commitmentElectorates,
        'electorate'
      ),
      relatedCommitments: findInLookupCommitmentAssocs(
        commitment,
        lookups.relatedCommitments,
        'relatedTo'
      ),
      contacts: findInLookupCommitmentContact(commitment, lookups),
      mapPoints: findInLookupCommitmentMapPoint(commitment, lookups),
      status: commitment.status,
      costingRequired: commitment.costingRequired
    }))

    if (state.sortDirection) {
      result.sort((a: Commitment, b: Commitment) =>
        sortByField(state.sortColumn, state.sortDirection, a, b)
      )
    }

    return result
  }
)

export const getAllOverviewCommitmentDataTables = createSelector(
  getAllOverviewCommitments,
  getSortState,
  (commitments, sortState) => {
    const rows = commitments.map(c => ({
      id: c.id,
      commitmentId: formatCommitmentId(c),
      title: formatCommitmentTitle(c),
      party: c.party && c.party.title,
      portfolio: c.portfolio && c.portfolio.title,
      commitmentType: c.commitmentType && c.commitmentType.title,
      criticalDate: c.criticalDate && c.criticalDate.title
    }))

    return rows
  }
)
