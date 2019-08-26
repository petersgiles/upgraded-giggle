import { RefinerActions, RefinerActionTypes } from './refiner.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { SelectedRefiner } from './refiner.models'

export interface State {
  refinerGroups: any[]
  expandedRefinerGroups: string[]
  selectedRefiners: SelectedRefiner[]
  hiddenRefinerGroup: any[]
  autoExpandGroup: any[]
  textRefiner: string
  refinerOpen: boolean
}

export const initialState: State = {
  refinerGroups: [],
  expandedRefinerGroups: [],
  selectedRefiners: [],
  autoExpandGroup: [],
  textRefiner: null,
  hiddenRefinerGroup: ['electorates', 'states'],
  refinerOpen: true
}

export function reducer(state = initialState, action: RefinerActions): State {
  switch (action.type) {
    case RefinerActionTypes.ClearRefiners:
      return {
        ...state,
        selectedRefiners: [],
        hiddenRefinerGroup: ['states', 'electorates']
      }

    case RefinerActionTypes.LoadRefinerGroups:
      return {
        ...state,
        refinerGroups: action.payload
      }
    case RefinerActionTypes.SelectRefinerGroup: {
      const group = action.payload.group
      let expandedGroups: string[] = []
      let currentExpandedGroups = [...state.expandedRefinerGroups]
      if (currentExpandedGroups.includes(group)) {
        expandedGroups = currentExpandedGroups.filter(p => p !== group)
      } else {
        expandedGroups = [...currentExpandedGroups]
        expandedGroups.push(group)
      }
      return {
        ...state,
        expandedRefinerGroups: expandedGroups
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
      let hiddenRefinerGroup = [...state.hiddenRefinerGroup]
      let autoExpandGroup = []
      const selectedRefiners = action.payload.refiner
      const commitmentTypesRefiner = selectedRefiners.filter(
        c => c.group === 'commitmentTypes'
      )[0]
      if (commitmentTypesRefiner) {
        if (commitmentTypesRefiner.ids.includes(2)) {
          hiddenRefinerGroup = hiddenRefinerGroup.filter(h => h !== 'states')
          autoExpandGroup.push('states')
        }
        if (commitmentTypesRefiner.ids.includes(3)) {
          hiddenRefinerGroup = hiddenRefinerGroup.filter(
            h => h !== 'electorates'
          )
          autoExpandGroup.push('electorates')
        }
      }
      return {
        ...state,
        selectedRefiners: selectedRefiners,
        hiddenRefinerGroup: hiddenRefinerGroup,
        autoExpandGroup: autoExpandGroup
      }
    }
    case RefinerActionTypes.SelectElectorates: {
      let selectedRefiners = [...state.selectedRefiners]
      const selectedElectorates = action.payload
      selectedRefiners = selectedRefiners.filter(
        sr => sr.group !== 'electorates'
      )

      let electrateGroup: SelectedRefiner = {
        group: 'electorates',
        ids: []
      }
      selectedElectorates.forEach(se => {
        electrateGroup.ids.push(se.id)
      })
      selectedRefiners.push(electrateGroup)
      return {
        ...state,
        selectedRefiners: selectedRefiners
      }
    }

    case RefinerActionTypes.SelectRefiner: {
      const selectedRefiner = action.payload
      let autoExpandGroup = []
      let hiddenRefinerGroup = [...state.hiddenRefinerGroup]
      let selectedRefiners: SelectedRefiner[] = [...state.selectedRefiners]
      let selectedAlready = false
      let selectedGroup = selectedRefiners.filter(
        sf => sf.group === selectedRefiner.group
      )[0]
      let refinerIds = selectedGroup ? [...selectedGroup.ids] : []
      selectedAlready = refinerIds.includes(selectedRefiner.id)

      if (selectedRefiner.singleSelection) {
        hiddenRefinerGroup = initialState.hiddenRefinerGroup
        if (!selectedAlready && selectedRefiner.cascadGroups.length > 0) {
          hiddenRefinerGroup = hiddenRefinerGroup.filter(
            hrf => !selectedRefiner.cascadGroups.includes(hrf)
          )
          selectedRefiner.cascadGroups.forEach(cg => {
            autoExpandGroup.push(cg)
          })
        }
        hiddenRefinerGroup.forEach(hg => {
          selectedRefiners = selectedRefiners.filter(sfs => sfs.group !== hg)
        })
        if (selectedAlready) {
          refinerIds = []
        } else {
          refinerIds = [selectedRefiner.id]
        }
      } else {
        if (selectedGroup && selectedAlready) {
          refinerIds = selectedGroup.ids.filter(id => id !== selectedRefiner.id)
        } else {
          refinerIds.push(selectedRefiner.id)
        }
      }

      selectedRefiners = selectedRefiners.filter(
        sfs => sfs.group !== selectedRefiner.group
      )
      selectedRefiners.push({
        ids: refinerIds,
        group: selectedRefiner.group
      })

      return {
        ...state,
        selectedRefiners: selectedRefiners,
        hiddenRefinerGroup: hiddenRefinerGroup,
        autoExpandGroup: autoExpandGroup
      }
    }
    case RefinerActionTypes.RemoveSelectedGroup: {
      const group = action.payload.group
      let selectedRefiners: any[] = [...state.selectedRefiners]
      let hiddenRefinerGroup: any[] = [...state.hiddenRefinerGroup]
      selectedRefiners = selectedRefiners.filter(sf => sf.group !== group)
      if (group === 'commitmentTypes') {
        hiddenRefinerGroup = ['states', 'electorates']
        selectedRefiners = selectedRefiners.filter(
          sf => !hiddenRefinerGroup.includes(sf.group)
        )
      }
      return {
        ...state,
        selectedRefiners: selectedRefiners,
        hiddenRefinerGroup: hiddenRefinerGroup
      }
    }
    case RefinerActionTypes.ToggleRefinerDrawer: {
      const currentRrefinerDrawerOpen: boolean = state.refinerOpen
      return {
        ...state,
        refinerOpen: !currentRrefinerDrawerOpen
      }
    }
    default:
      return state
  }
}

export const refinerState = createFeatureSelector<State>('refiner')

export const refinerOpenState = createSelector(
  refinerState,
  (state: State) => state.refinerOpen
)

export const selectedRefinersState = createSelector(
  refinerState,
  (state: State) => state.selectedRefiners
)

export const selectTextRefinerState = createSelector(
  refinerState,
  (state: State) => state.textRefiner
)

export const refinerGroupsState = createSelector(
  refinerState,
  (state: State) => state.refinerGroups
)

export const hiddenRefinerGroupsState = createSelector(
  refinerState,
  (state: State) => state.hiddenRefinerGroup
)

export const autoExpandGroupState = createSelector(
  refinerState,
  (state: State) => state.autoExpandGroup
)
export const selectExpandedRefinerGroupsState = createSelector(
  refinerState,
  (state: State) => state.expandedRefinerGroups
)
export const selectRefinerGroups = createSelector(
  refinerGroupsState,
  selectExpandedRefinerGroupsState,
  selectedRefinersState,
  hiddenRefinerGroupsState,
  autoExpandGroupState,
  selectTextRefinerState,
  (
    groups: any[],
    expanded: any[],
    selected: any[],
    hidden: any[],
    autoExpand: any[],
    text: String
  ) => {
    const refinerGroupState = (groups || []).map(g => {
      const groupHasChildSelected =
        selected.filter(s => s.group === g.group && s.ids.length > 0).length > 0
      const isHidden = (hidden || []).includes(g.group)
      return {
        ...g,
        expanded:
          !isHidden &&
          (groupHasChildSelected ||
            (autoExpand || []).includes(g.group) ||
            (expanded || []).includes(g.group)),
        hidden: isHidden,
        children: (g.children || []).map(r => ({
          ...r,
          selected:
            (selected || []).findIndex(
              s => s.ids.includes(r.id) && s.group === r.group
            ) > -1 && !isHidden
        })),
        textRefiner: text
      }
    })
    return refinerGroupState
  }
)
