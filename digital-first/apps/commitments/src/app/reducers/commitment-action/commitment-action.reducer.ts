import { CommitmentActionActionTypes, CommitmentActionActions } from './commitment-action.actions'
import { CommitmentAction } from './commitment-action.model'

export interface State {
  expanded: boolean
  selectedAction: any
  actions: CommitmentAction[]
  loading: boolean
  error: any
}

export const initialState: State = {
  expanded: false,
  selectedAction: null,
  actions: null,
  loading: false,
  error: null,
}

export function reducer(
  state = initialState,
  action: CommitmentActionActions
): State {
  switch (action.type) {

    case CommitmentActionActionTypes.ExpandPanel: {
      return {
        ...state,
        expanded: true
      }
    }

    case CommitmentActionActionTypes.CollapsePanel: {
      return {
        ...state,
        expanded: false
      }
    }

    case CommitmentActionActionTypes.LoadCommitmentActions: {
      const actions = [...action.payload.actions]
      return {
        ...state,
        actions: actions
      }
    }

    case CommitmentActionActionTypes.ClearCommitmentActions: {
      return {
        ...state,
        actions: []
      }
    }

    case CommitmentActionActionTypes.SetCurrentCommitmentAction: {

      // tslint:disable-next-line:no-console
      console.log('SetCurrentCommitmentAction', action.payload)
      return {
        ...state,
        selectedAction: action.payload.action
      }
    }

    default:
      return state
  }
}

export const selectAll = (state: State) => state.actions
export const getSelectedAction = (state: State) => state.selectedAction
export const getExpanded = (state: State) => state.expanded
export const getContactLoading = (state: State) => state.loading
export const getContactError = (state: State) => state.error