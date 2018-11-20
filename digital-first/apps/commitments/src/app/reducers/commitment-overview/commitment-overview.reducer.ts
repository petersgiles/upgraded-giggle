import { CommitmentOverviewActionTypes, CommitmentOverviewActions } from './commitment-overview.actions'
import { RefinerType } from '@digital-first/df-components'

export interface State {
  expandedRefinerGroups: (string | number)[]
  selectedRefiners: RefinerType[]
  textRefiner: string
}

export const initialState: State = {
  expandedRefinerGroups: [],
  selectedRefiners: [],
  textRefiner: null
}

export function reducer(
  state = initialState,
  action: CommitmentOverviewActions
): State {
  switch (action.type) {

    case CommitmentOverviewActionTypes.SetTextRefiner: {
      return {
        ...state,
        textRefiner: action.payload
      }
    }

    case CommitmentOverviewActionTypes.ExpandRefinerGroup: {
      return {
        ...state,
        expandedRefinerGroups: [...state.expandedRefinerGroups.filter(p => p !== action.payload), action.payload]
      }
    }

    case CommitmentOverviewActionTypes.CollapseRefinerGroup: {
      return {
        ...state,
        expandedRefinerGroups: state.expandedRefinerGroups.filter(p => p !== action.payload)
      }
    }

    case CommitmentOverviewActionTypes.AddRefiner: {
      const addRefiner = state.selectedRefiners.filter((item: RefinerType) => {
        if (item.id === action.payload.id) {
          if (item.groupId === action.payload.groupId) {
            return false
          }
        }
        return true
      })

      addRefiner.push(action.payload)

      return {
        ...state,
        selectedRefiners: addRefiner
      }
    }

    case CommitmentOverviewActionTypes.RemoveRefiner: {

      const removeRefiner = state.selectedRefiners.filter((item: RefinerType) => {
        if (item.id === action.payload.id) {
          if (item.groupId === action.payload.groupId) {
            return false
          }
        }

        return true
      }

      )

      return {
        ...state,
        selectedRefiners: removeRefiner
      }
    }

    case CommitmentOverviewActionTypes.ClearAllRefiners: {
      return {
        ...state,
        selectedRefiners: []
      }
    }

    default:
      return state
  }
}

export const getTextRefiner = (state: State) => state.textRefiner
export const getSelectedRefiners = (state: State) => state.selectedRefiners
export const getExpandedRefinerGroups = (state: State) => state.expandedRefinerGroups