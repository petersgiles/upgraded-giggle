import { CommitmentOverviewActionTypes, CommitmentOverviewActions } from './commitment-overview.actions'
import { RefinerType } from '@digital-first/df-components'

export interface State {
  expandedRefinerGroups: number[]
  selectedRefiners: RefinerType[]
}

export const initialState: State = {
  expandedRefinerGroups: [],
  selectedRefiners: []
}

export function reducer(
  state = initialState,
  action: CommitmentOverviewActions
): State {
  switch (action.type) {

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
      // tslint:disable-next-line:no-console
      console.log('AddRefiner', action.payload, addRefiner, state.selectedRefiners)
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

      // tslint:disable-next-line:no-console
      console.log('RemoveRefiner', action.payload, removeRefiner, state.selectedRefiners)
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

export const getSelectedRefiners = (state: State) => state.selectedRefiners
export const getExpandedRefinerGroups = (state: State) => state.expandedRefinerGroups