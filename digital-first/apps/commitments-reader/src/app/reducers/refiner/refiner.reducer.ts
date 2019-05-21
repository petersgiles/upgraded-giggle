import { RefinerActions, RefinerActionTypes } from './refiner.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { multiFilter } from '@df/utils'

export interface State {
  refinerGroups: any[]
  expandedRefinerGroups: number[]
  selectedRefiners: any[]
  textRefiner: string
}

export const initialState: State = {
  refinerGroups: [],
  expandedRefinerGroups: [],
  selectedRefiners: [],
  textRefiner: null
}

export function reducer(state = initialState, action: RefinerActions): State {
  switch (action.type) {
    case RefinerActionTypes.ClearRefiners:
      return {
        ...state,
        selectedRefiners: []
      }

    case RefinerActionTypes.LoadRefinerGroups:
      return {
        ...state,
        refinerGroups: action.payload
      }

    case RefinerActionTypes.SelectRefinerGroup: {
      let groups: number[] = []

      if (state.expandedRefinerGroups.includes(action.payload.group)) {
        groups = state.expandedRefinerGroups.filter(
          p => p !== action.payload.group
        )
      } else {
        groups = [...state.expandedRefinerGroups]
        groups.push(action.payload.group)
      }

      return {
        ...state,
        expandedRefinerGroups: groups
      }
    }

    case RefinerActionTypes.ChangeTextRefiner: {
      const retVal = {
        ...state,
        textRefiner: action.payload
      }

      return retVal
    }

    case RefinerActionTypes.SetRefinerFromQueryString: {
      const selectedRefiners = action.payload.refiner

      return {
        ...state,
        selectedRefiners: selectedRefiners
      }
    }

    case RefinerActionTypes.SelectRefiner: {
      const selected = action.payload
      let selectedRefiners: any[] = [...state.selectedRefiners]

      const filter = {
        id: [selected.id],
        group: [selected.group]
      }

      const isSelected = multiFilter(selectedRefiners, filter).length > 0

      if (isSelected) {
        selectedRefiners = selectedRefiners.filter(
          item => !(item.group === selected.group && item.id === selected.id)
        )
      } else {
        selectedRefiners.push({
          id: action.payload.id,
          group: action.payload.group
        })
      }

      return {
        ...state,
        selectedRefiners: selectedRefiners
      }
    }

    default:
      return state
  }
}

export const refinerState = createFeatureSelector<State>('refiner')

export const selectExpandedRefinerGroupsState = createSelector(
  refinerState,
  (state: State) => state.expandedRefinerGroups
)

export const selectSelectedRefinersState = createSelector(
  refinerState,
  (state: State) => state.selectedRefiners
)

export const selectTextRefinerState = createSelector(
  refinerState,
  (state: State) => state.textRefiner
)

export const selectRefinerGroupsState = createSelector(
  refinerState,
  (state: State) => state.refinerGroups
)

export const selectRefinerGroups = createSelector(
  selectRefinerGroupsState,
  selectExpandedRefinerGroupsState,
  selectSelectedRefinersState,
  selectTextRefinerState,
  (groups: any[], expanded: any[], selected: any[], text: String) => {
    const rgs = (groups || []).map(g => {
      const groupChildselected = g.children.some(r => selected.findIndex(
        s => s.id === r.id && s.group === r.group
      ) > -1)

      // tslint:disable-next-line: no-console
      console.log(`🌶️`, groupChildselected)
      return {
        ...g,
        expanded: groupChildselected || (expanded || []).includes(g.group),
        children: (g.children || []).map(r => ({
          ...r,
          selected:
            (selected || []).findIndex(
              s => s.id === r.id && s.group === r.group
            ) > -1
        }))
      }
    })

    return rgs
  }
)
