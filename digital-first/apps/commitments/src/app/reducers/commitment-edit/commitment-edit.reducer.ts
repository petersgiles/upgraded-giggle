import { CommitmentEditActionTypes, CommitmentEditActions } from './commitment-edit.actions'

export interface State {
  expandedPanels: (string | number)[]
}

export const initialState: State = {
  expandedPanels: []
}

export function reducer(
  state = initialState,
  action: CommitmentEditActions
): State {
  switch (action.type) {

    case CommitmentEditActionTypes.ExpandPanel: {
      return {
        ...state,
        expandedPanels: [...state.expandedPanels.filter(p => p !== action.payload), action.payload]
      }
    }

    case CommitmentEditActionTypes.CollapsePanel: {
      return {
        ...state,
        expandedPanels: state.expandedPanels.filter(p => p !== action.payload)
      }
    }

    default:
      return state
  }
}

export const getExpandedPanels = (state: State) => state.expandedPanels