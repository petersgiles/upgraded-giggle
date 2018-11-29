import { CommitmentLookupsActions, CommitmentLookupsActionTypes } from './commitment-lookup.actions'

export interface State {
    announcementTypes: any[]
    commitmentTypes: any[]
    criticalDates: any[]
    locations: any[]
    parties: any[]
    portfolios: any[]
    whoAnnouncedTypes: any[]
}

export const initialState: State = {
    announcementTypes: null,
    commitmentTypes: null,
    criticalDates: null,
    locations: null,
    parties: null,
    portfolios: null,
    whoAnnouncedTypes: null
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

        default:
            return state
    }
}