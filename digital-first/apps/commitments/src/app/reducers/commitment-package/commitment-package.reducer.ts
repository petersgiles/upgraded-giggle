import { CommitmentPackageActionTypes, CommitmentPackageActions } from './commitment-package.actions'
import { Package } from '../../models'

export interface State {
  expanded: boolean
  packages: Package[]
  loading: boolean
  error: any
}

export const initialState: State = {
  expanded: false,
  packages: null,
  loading: false,
  error: null,
}

export function reducer(
  state = initialState,
  action: CommitmentPackageActions
): State {
  switch (action.type) {

    case CommitmentPackageActionTypes.ExpandPanel: {
      return {
        ...state,
        expanded: true
      }
    }

    case CommitmentPackageActionTypes.CollapsePanel: {
      return {
        ...state,
        expanded: false
      }
    }

    case CommitmentPackageActionTypes.LoadCommitmentPackages: {
      // tslint:disable-next-line:no-console
      console.log('LoadCommitmentPackages', action.payload)
      const  packages = [...action.payload.packages]
      return {
        ...state,
        packages: packages
      }
    }

    case CommitmentPackageActionTypes.ClearCommitmentPackages: {
      return {
        ...state,
        packages: []
      }
    }

    default:
      return state
  }
}

export const selectAll = (state: State) => state.packages
export const getExpanded = (state: State) => state.expanded
export const getPortfolioLoading = (state: State) => state.loading
export const getPortfolioError = (state: State) => state.error
