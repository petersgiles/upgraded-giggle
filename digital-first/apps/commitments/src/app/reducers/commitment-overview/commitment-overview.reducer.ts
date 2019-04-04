import { CommitmentOverviewActionTypes, CommitmentOverviewActions } from './commitment-overview.actions'
import { RefinerType } from '@digital-first/df-refiner'

export interface State {
  expandedRefinerGroups: (string | number)[]
  selectedRefiners: RefinerType[]
  textRefiner: string,
  sortColumn: string,
  sortDirection: string
}
const sortArray: string[] = [null, 'ASC', 'DESC']

export const initialState: State = {
  expandedRefinerGroups: [],
  selectedRefiners: [],
  textRefiner: null,
  sortColumn: null,
  sortDirection: null
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

    case CommitmentOverviewActionTypes.SortByColumn: {
      let sortIndex = 1
      if (action.payload.id === state.sortColumn) {
        sortIndex = sortArray.indexOf(state.sortDirection)
        sortIndex = (sortIndex + 1) % sortArray.length
      }

      return {
        ...state,
        sortDirection: sortArray[sortIndex],
        sortColumn:  action.payload.id
      }
    }

    default:
      return state
  }
}

export const getTextRefiner = (state: State) => state.textRefiner
export const getSelectedRefiners = (state: State) => state.selectedRefiners
export const getExpandedRefinerGroups = (state: State) => state.expandedRefinerGroups
