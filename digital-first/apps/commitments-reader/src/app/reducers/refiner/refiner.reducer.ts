import { RefinerActions, RefinerActionTypes } from './refiner.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { multiFilter } from '@df/utils'

export interface State {
  refinerGroups: any[]
  expandedRefinerGroups: string[]
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
        expandedRefinerGroups: [],
        hiddenRefinerGroup: ['states', 'electorates']
      }

    case RefinerActionTypes.LoadRefinerGroups:
      return {
        ...state,
        refinerGroups: action.payload
      }

    case RefinerActionTypes.SelectRefinerGroup: {
      const groups = populateExpandedGroups(
        state.expandedRefinerGroups,
        action.payload.group
      )
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
      console.log('here')
      let hiddenRefinerGroup = [...state.hiddenRefinerGroup]
      const selectedRefiners = action.payload.refiner
      const stateRefiner = selectedRefiners.filter(
        c => c.id === 2 && c.group === 'commitmentTypes'
      )
      const electoratesRefiner = selectedRefiners.filter(
        c => c.id === 3 && c.group === 'commitmentTypes'
      )
      if (stateRefiner.length > 0) {
        hiddenRefinerGroup = hiddenRefinerGroup.filter(h => h !== 'states')
      }
      if (electoratesRefiner.length > 0) {
        hiddenRefinerGroup = hiddenRefinerGroup.filter(h => h !== 'electorates')
      }
      return {
        ...state,
        selectedRefiners: selectedRefiners,
        hiddenRefinerGroup: hiddenRefinerGroup
      }
    }

    case RefinerActionTypes.SelectRefiner: {
      const selectedRefiner = action.payload
      let selectedRefiners: any[] = [...state.selectedRefiners]
      let filter = { id: [selectedRefiner.id], group: [selectedRefiner.group] }
      let expandedGroups = [...state.expandedRefinerGroups]
      let hiddenRefinerGroup = [...state.hiddenRefinerGroup]
      const selectedAlready = multiFilter(selectedRefiners, filter).length > 0

      if (selectedRefiner.singleSelection) {
        hiddenRefinerGroup = ['electorates', 'states']
        expandedGroups = expandedGroups.filter(
          g => !hiddenRefinerGroup.includes(g)
        )
        const refinerGroups = [...state.refinerGroups]
        if (!selectedAlready) {
          selectedRefiners = selectedRefiners.filter(
            item => !(item.group === selectedRefiner.group)
          )
        }
        let group: any = {}
        if (selectedRefiner.title === 'State') {
          group = JSON.parse(
            JSON.stringify(refinerGroups.filter(rf => rf.group === 'states')[0])
          )
          //enable states
          if (!selectedAlready) {
            hiddenRefinerGroup = hiddenRefinerGroup.filter(
              hrf => hrf !== 'states'
            )
          }
        }
        if (selectedRefiner.title === 'Electorate') {
          // enable elecorates
          if (!selectedAlready) {
            hiddenRefinerGroup = hiddenRefinerGroup.filter(
              hrf => hrf !== 'electorates'
            )
          }
          group = JSON.parse(
            JSON.stringify(
              refinerGroups.filter(rf => rf.group === 'electorates')[0]
            )
          )
        }
        expandedGroups = populateExpandedGroups(expandedGroups, group.group)
      }
      if (selectedAlready) {
        selectedRefiners = selectedRefiners.filter(
          item =>
            !(
              item.group === selectedRefiner.group &&
              item.id === selectedRefiner.id
            )
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
        expandedRefinerGroups: expandedGroups,
        hiddenRefinerGroup: hiddenRefinerGroup
      }
    }
    default:
      return state
  }

  function populateExpandedGroups(currentExpandedGroups, group) {
    let groups: string[] = []
    if (currentExpandedGroups.includes(group)) {
      groups = currentExpandedGroups.filter(p => p !== group)
    } else {
      groups = [...currentExpandedGroups]
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
    const refinerGroupState = (groups || []).map(g => {
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
    return refinerGroupState
  }
)
