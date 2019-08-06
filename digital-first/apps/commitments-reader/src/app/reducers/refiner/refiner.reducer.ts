import { RefinerActions, RefinerActionTypes } from './refiner.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { multiFilter } from '@df/utils'

export interface State {
  refinerGroups: any[]
  expandedRefinerGroups: number[]
  selectedRefiners: any[]
  hiddenRefinerGroup: any[]
  textRefiner: string
}

export const initialState: State = {
  refinerGroups: [],
  expandedRefinerGroups: [],
  selectedRefiners: [],
  textRefiner: null,
  hiddenRefinerGroup: ['electorates', 'states']
}

export function reducer(state = initialState, action: RefinerActions): State {
  switch (action.type) {
    case RefinerActionTypes.ClearRefiners:
      return {
        ...state,
        selectedRefiners: [],
        expandedRefinerGroups: []
      }

    case RefinerActionTypes.LoadRefinerGroups:
      return {
        ...state,
        refinerGroups: action.payload
      }

    case RefinerActionTypes.SelectRefinerGroup: {
      const groups = populateExpandedGroups(action.payload.group)
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
      let filter = {}
      let isSelected = false
      let groups = [...state.expandedRefinerGroups]
      let hiddenRefinerGroup = [...state.hiddenRefinerGroup]
      if (selected.singleSelection) {
        hiddenRefinerGroup = ['electorates', 'states']
        filter = {
          group: [selected.group]
        }
        const refinerGroups = [...state.refinerGroups]
        selectedRefiners = selectedRefiners.filter(
          item => !(item.group === selected.group)
        )
        if (selected.title === 'State') {
          //enable states
          hiddenRefinerGroup = hiddenRefinerGroup.filter(
            hrf => hrf !== 'states'
          )
          let group: any = JSON.parse(
            JSON.stringify(refinerGroups.filter(rf => rf.group === 'states')[0])
          )
          groups = populateExpandedGroups(group.group)
        }
        if (selected.title === 'Electorate') {
          // enable elecorates
          let group: any = JSON.parse(
            JSON.stringify(
              refinerGroups.filter(rf => rf.group === 'electorates')[0]
            )
          )
          hiddenRefinerGroup = hiddenRefinerGroup.filter(
            hrf => hrf !== 'electorates'
          )
          groups = populateExpandedGroups(group.group)
        }
      } else {
        filter = {
          id: [selected.id],
          group: [selected.group]
        }
      }
      isSelected = multiFilter(selectedRefiners, filter).length > 0
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
      hiddenRefinerGroup.forEach(hrf => {
        selectedRefiners = selectedRefiners.filter(srf => srf.group !== hrf)
      })
      return {
        ...state,
        selectedRefiners: selectedRefiners,
        expandedRefinerGroups: groups,
        hiddenRefinerGroup: hiddenRefinerGroup
      }
    }
    default:
      return state
  }

  function populateExpandedGroups(group) {
    let groups: number[] = []
    if (state.expandedRefinerGroups.includes(group)) {
      groups = state.expandedRefinerGroups.filter(p => p !== group)
    } else {
      groups = [...state.expandedRefinerGroups]
      groups.push(group)
    }
    return groups
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
export const hiddenRefinerGroupsState = createSelector(
  refinerState,
  (state: State) => state.hiddenRefinerGroup
)
export const selectRefinerGroups = createSelector(
  selectRefinerGroupsState,
  selectExpandedRefinerGroupsState,
  selectSelectedRefinersState,
  hiddenRefinerGroupsState,
  selectTextRefinerState,
  (
    groups: any[],
    expanded: any[],
    selected: any[],
    hidden: any[],
    text: String
  ) => {
    const rgs = (groups || []).map(g => {
      const groupChildselected = g.children.some(
        r => selected.findIndex(s => s.id === r.id && s.group === r.group) > -1
      )
      return {
        ...g,
        expanded: groupChildselected || (expanded || []).includes(g.group),
        hidden: (hidden || []).includes(g.group),
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
