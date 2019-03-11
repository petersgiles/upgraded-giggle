import { CommitmentPortfolioActionTypes, CommitmentPortfolioActions } from './commitment-portfolio.actions'
import { Portfolio } from '../../models'

export interface State {
  expanded: boolean
  portfolios: Portfolio[]
  loading: boolean
  error: any
}

export const initialState: State = {
  expanded: false,
  portfolios: null,
  loading: false,
  error: null,
}

export function reducer(
  state = initialState,
  action: CommitmentPortfolioActions
): State {
  switch (action.type) {

    case CommitmentPortfolioActionTypes.ExpandPanel: {
      return {
        ...state,
        expanded: true
      }
    }

    case CommitmentPortfolioActionTypes.CollapsePanel: {
      return {
        ...state,
        expanded: false
      }
    }

    case CommitmentPortfolioActionTypes.LoadCommitmentPortfolios: {

      const portfolios = [...action.payload.portfolios]
      return {
        ...state,
        portfolios: portfolios
      }
    }

    case CommitmentPortfolioActionTypes.ClearCommitmentPortfolios: {
      return {
        ...state,
        portfolios: []
      }
    }

    default:
      return state
  }
}

export const selectAll = (state: State) => state.portfolios
export const getExpanded = (state: State) => state.expanded
export const getPortfolioLoading = (state: State) => state.loading
export const getPortfolioError = (state: State) => state.error