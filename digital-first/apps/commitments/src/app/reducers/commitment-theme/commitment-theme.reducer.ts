import { ConsoleLoggerService } from './../../../../../../libs/df-logging/src/lib/console-logger.service';
import { CommitmentThemeActionTypes, CommitmentThemeActions } from './commitment-theme.actions'
import { Theme, Portfolio} from '../../models'

export interface State {
  expanded: boolean
  themes: Theme[]
  loading: boolean
  error: any
}

export const initialState: State = {
  expanded: false,
  themes: null,
  loading: false,
  error: null,
}

export function reducer(
  state = initialState,
  action: CommitmentThemeActions
): State {
  switch (action.type) {

    case CommitmentThemeActionTypes.ExpandPanel: {

      return {
        ...state,
        expanded: true
      }
    }

    case CommitmentThemeActionTypes.CollapsePanel: {

      return {
        ...state,
        expanded: false
      }
    }

    case CommitmentThemeActionTypes.LoadCommitmentThemes: {

      const themes = [...action.payload.themes]

      return {
        ...state,
        themes: themes
      }
    }

    case CommitmentThemeActionTypes.ClearCommitmentTheme: {
      return {
        ...state,
        themes: []
      }
    }

    default:
      return state
  }
}

export const selectAll = (state: State) => {

  return state.themes
}
export const getExpanded = (state: State) => state.expanded
export const getPortfolioLoading = (state: State) => state.loading
export const getPortfolioError = (state: State) => state.error
