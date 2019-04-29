import { NavigationActions, NavigationActionTypes } from './navigation.actions'
import { createSelector, createFeatureSelector } from '@ngrx/store'
import { toTree, sortBy } from '@df/utils'

export interface State {
  navigationNodes: any[]
  navigationTree: any[]
  expandedNodes: any[]
}

export const initialState: State = {
  navigationNodes: null,
  navigationTree: null,
  expandedNodes: []
}

export function reducer(
  state = initialState,
  action: NavigationActions
): State {
  switch (action.type) {
    case NavigationActionTypes.ToggleExpand:

      const expandedNodes = state.expandedNodes.filter(
        n => n !== action.payload.id
      )
      if (action.payload.expanded) {
        expandedNodes.push(action.payload.id)
      }

      return {
        ...state,
        expandedNodes: expandedNodes
      }

    case NavigationActionTypes.LoadNavigations:
      return {
        ...state,
        navigationNodes: action.payload.nodes
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

export const selectExpandedNavigationNodeState = createSelector(
  navigationState,
  (state: State) => state.expandedNodes
)

export const selectNavigationNodeTreeState = createSelector(
  selectNavigationNodeState,
  selectExpandedNavigationNodeState,
  (nodes, expanded) => {
    const sortedNodes = (nodes || [])
      .map(p => ({
        ...p,
        expanded: expanded.includes(p.id)
      }))
      .sort(sortBy('order'))

    const tree = toTree(sortedNodes, {
      id: 'id',
      parentId: 'parent',
      children: 'children',
      level: 'level'
    })


      // tslint:disable-next-line:no-console
      console.log(`🐙 -  selectNavigationNodeTreeState`, sortedNodes, tree)


    return tree
  }
)
