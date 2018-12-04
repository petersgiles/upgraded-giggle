import { CommitmentEditActionTypes, CommitmentEditActions } from './commitment-edit.actions'

export interface State {
  expandedPanels: (string | number)[]
  autosave: boolean
  timeFormat: 'dateFormat' | 'timeAgo' | 'calendar'
}

export const initialState: State = {
  expandedPanels: [],
  autosave: true,
  timeFormat: 'timeAgo'
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

    case CommitmentEditActionTypes.ChangeTimeFormat: {
      return {
        ...state,
        timeFormat: action.payload
      }
    }

    case CommitmentEditActionTypes.ChangeAutoSave: {
      return {
        ...state,
        autosave: action.payload
      }
    }

    default:
      return state
  }
}

export const getExpandedPanels = (state: State) => state.expandedPanels
export const getTimeFormat = (state: State) => state.timeFormat
export const getAutosave = (state: State) => state.autosave