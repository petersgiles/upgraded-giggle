import {
  CommitmentLookupsActions,
  CommitmentLookupsActionTypes
} from './commitment-lookup.actions'
import { sortBy } from '@df/utils'

export interface State {
  announcementTypes: any[]
  commitmentTypes: any[]
  criticalDates: any[]
  locations: any[]
  parties: any[]
  portfolios: any[]
  whoAnnouncedTypes: any[]
  themeTypes: any[]
  packageTypes: any[]
  statuses: any[]
  relatedPortfolios: any[]
  relatedPackages: any[]
  commitmentElectorates: any[]
  commitmentContacts: any[]
  commitmentMapPoints: any[]
  mapPoints: any[]
  relatedCommitments: any[]
}

export const initialState: State = {
  announcementTypes: [],
  commitmentTypes: [],
  criticalDates: [],
  locations: [],
  parties: [],
  portfolios: [],
  whoAnnouncedTypes: [],
  themeTypes: [],
  packageTypes: [],
  statuses: [],
  relatedPortfolios: [],
  relatedPackages: [],
  commitmentElectorates: [],
  commitmentContacts: [],
  commitmentMapPoints: [],
  mapPoints: [],
  relatedCommitments: []
}

export function reducer(
  state = initialState,
  action: CommitmentLookupsActions
): State {
  switch (action.type) {
    case CommitmentLookupsActionTypes.LoadAnnouncementTypes: {
      return {
        ...state,
        announcementTypes: action.payload.data.announcementTypes
      }
    }

    case CommitmentLookupsActionTypes.LoadCommitmentTypes: {
      return {
        ...state,
        commitmentTypes: action.payload.data.commitmentTypes
      }
    }

    case CommitmentLookupsActionTypes.LoadCriticalDates: {
      return {
        ...state,
        criticalDates: action.payload.data.criticalDates
      }
    }

    case CommitmentLookupsActionTypes.LoadLocations: {
      return {
        ...state,
        locations: action.payload.data.locations
      }
    }

    case CommitmentLookupsActionTypes.LoadPartys: {
      return {
        ...state,
        parties: action.payload.data.parties
      }
    }

    case CommitmentLookupsActionTypes.LoadPortfolios: {
      return {
        ...state,
        portfolios: action.payload.data.portfolios
      }
    }

    case CommitmentLookupsActionTypes.LoadWhoAnnouncedTypes: {
      return {
        ...state,
        whoAnnouncedTypes: action.payload.data.whoAnnouncedTypes
      }
    }

    case CommitmentLookupsActionTypes.LoadThemeTypes: {
      return {
        ...state,
        themeTypes: action.payload.data.themeTypes
      }
    }

    case CommitmentLookupsActionTypes.LoadPackageTypes: {
      const packageTypes = [...(action.payload.data.packageTypes || [])].sort(
        sortBy('title')
      )

      return {
        ...state,
        packageTypes: packageTypes
      }
    }

    case CommitmentLookupsActionTypes.LoadStatuses: {
      return {
        ...state,
        statuses: action.payload.data.statuses
      }
    }

    case CommitmentLookupsActionTypes.LoadAllCommitmentPortfolios: {
      return {
        ...state,
        relatedPortfolios: action.payload.data.relatedPortfolios
      }
    }

    case CommitmentLookupsActionTypes.LoadAllCommitmentPackages: {
      return {
        ...state,
        relatedPackages: action.payload.data.relatedPackages
      }
    }

    case CommitmentLookupsActionTypes.LoadAllCommitmentElectorates: {
      return {
        ...state,
        commitmentElectorates: action.payload.data.commitmentElectorates
      }
    }

    case CommitmentLookupsActionTypes.LoadAllCommitmentContacts: {
      return {
        ...state,
        commitmentContacts: action.payload.data.commitmentContacts
      }
    }

    case CommitmentLookupsActionTypes.LoadAllCommitmentMapPoints: {
      return {
        ...state,
        commitmentMapPoints: action.payload.data.commitmentMapPoints
      }
    }

    case CommitmentLookupsActionTypes.LoadAllMapPoints: {
      return {
        ...state,
        mapPoints: action.payload.data.mapPoints
      }
    }

    case CommitmentLookupsActionTypes.LoadAllRelatedCommitments: {
      return {
        ...state,
        relatedCommitments: action.payload.data.relatedCommitments
      }
    }

    default:
      return state
  }
}
