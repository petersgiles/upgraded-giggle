import { NavigationActions, NavigationActionTypes } from './navigation.actions'
import { createSelector, createFeatureSelector } from '@ngrx/store'
import { toTree, sortBy } from '@df/utils'

export interface State {
  navigationNodes: any[]
  navigationTree: any[]
}

export const initialState: State = {
  navigationNodes: null,
  navigationTree: null
}

export function reducer(
  state = initialState,
  action: NavigationActions
): State {
  switch (action.type) {
    case NavigationActionTypes.LoadNavigations:

      const nodes = JSON.parse(JSON.stringify(action.payload.nodes || [])).sort(sortBy('order'))

      const tree = toTree(nodes, {
        id: 'id',
        parentId: 'parent',
        children: 'children',
        level: 'level'
      })

      return {
        ...state,
        navigationNodes: action.payload.nodes,
        navigationTree: tree
      }

    default:
      return state
  }
}

export const navigationState = createFeatureSelector<State>('navigation')

export const selectNavigationNodeState = createSelector(
  navigationState,
  (state: State) => state.navigationNodes
)

export const selectNavigationNodeTreeState = createSelector(
  navigationState,
  (state: State) => state.navigationTree
)
