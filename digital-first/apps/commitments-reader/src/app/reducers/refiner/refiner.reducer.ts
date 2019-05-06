import { RefinerActions, RefinerActionTypes } from './refiner.actions'
import { SelectedRefinerItem } from './refiner.models'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export interface State {
  refinerGroups: any[]
  commitments: any[]
  expandedRefinerGroups: number[]
  selectedRefiners: any[]
  textRefiner: string
  columns: [
    { prop: 'id', name: 'Id' },
    { prop: 'title', name: 'Title' },
    { prop: 'portfolio', name: 'Responsible Portfolio' },
    { prop: 'announcementType', name: 'Type of Commitment' },
    { prop: 'criticalDate', name: 'Critical Date' }
  ]
}

export const initialState: State = {
  refinerGroups: [],
  commitments: [],
  expandedRefinerGroups: [],
  selectedRefiners: [],
  textRefiner: null,
  columns: [
    { prop: 'id', name: 'Id' },
    { prop: 'title', name: 'Title' },
    { prop: 'portfolio', name: 'Responsible Portfolio' },
    { prop: 'announcementType', name: 'Type of Commitment' },
    { prop: 'criticalDate', name: 'Critical Date' }
  ]
}

export function reducer(state = initialState, action: RefinerActions): State {
  // tslint:disable-next-line: no-console
//  console.log(`🐨 `, action)

  switch (action.type) {
    case RefinerActionTypes.LoadRefinerGroups:
      return {
        ...state,
        refinerGroups: action.payload
      }

    case RefinerActionTypes.SelectRefinerGroup: {
      let groups: number[] = []

      if (state.expandedRefinerGroups.includes(action.payload.groupId)) {
        groups = state.expandedRefinerGroups.filter(p => p !== action.payload.groupId)
      } else {
        groups = [...state.expandedRefinerGroups]
        groups.push(action.payload.groupId)
      }

      return {
        ...state,
        expandedRefinerGroups: groups
      }
    }

    case RefinerActionTypes.LoadRefinedCommitments: {
      return {
        ...state,
        commitments: action.payload.data.commitments,
        columns: initialState.columns
      }
    }

    case RefinerActionTypes.ChangeTextRefiner: {
      const retVal = {
        ...state,
        textRefiner: action.payload
      }

      return retVal
    }
    case RefinerActionTypes.SelectRefiner: {
      return state
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

export const selectRefinedCommitmentsState = createSelector(
  refinerState,
  (state: State) => state.commitments
)

export const selectRefinedCommitmentsColumnsState = createSelector(
  refinerState,
  (state: State) => state.columns
)

export const selectRefinerGroups = createSelector(
  selectRefinerGroupsState,
  selectExpandedRefinerGroupsState,
  (groups: any, expanded: any) => {
    // tslint:disable-next-line: no-console
    console.log(groups, expanded)
    return (groups || []).map(g => ({
      ...g,
      expanded: (expanded || []).includes(g.groupId)
    }))
  })

  export const selectRefinerCommitmentItems = createSelector(
    selectRefinedCommitmentsState,
    selectRefinedCommitmentsColumnsState,
    (commitments: any, columns: any) => {
      return ([
        commitments,
        columns
      ]
      
  )})

