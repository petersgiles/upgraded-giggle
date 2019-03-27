import { CommitmentLookupsActions, CommitmentLookupsActionTypes } from './commitment-lookup.actions'
import { MdcNotchedOutlineModule } from '@angular-mdc/web';

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
    commitmentPortfolios: any[]
    commitmentPackages: any[]
    commitmentElectorates: any[]
    commitmentContacts: any[]
    commitmentMapPoints: any[]
    mapPoints: any[]
    relatedCommitments: any[]
}

export const initialState: State = {
    announcementTypes: null,
    commitmentTypes: null,
    criticalDates: null,
    locations: null,
    parties: null,
    portfolios: null,
    whoAnnouncedTypes: null,
    themeTypes: null,
    packageTypes: null,
    statuses: null,
    commitmentPortfolios: null,
    commitmentPackages: null,
    commitmentElectorates: null,
    commitmentContacts: null,
    commitmentMapPoints: null,
    mapPoints: null,
    relatedCommitments: null,
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
            return {
                ...state,
                packageTypes: action.payload.data.packageTypes
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
                commitmentPortfolios: action.payload.data.commitmentPortfolios
            }
        }

        case CommitmentLookupsActionTypes.LoadAllCommitmentPackages: {
            return {
                ...state,
                commitmentPackages: action.payload.data.commitmentPackages
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
