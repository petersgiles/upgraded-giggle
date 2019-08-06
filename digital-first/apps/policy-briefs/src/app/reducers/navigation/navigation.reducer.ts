import { NavigationActions, NavigationActionTypes } from './navigation.actions'
import { createSelector, createFeatureSelector } from '@ngrx/store'
import { toTree, sortBy } from '@df/utils'
import { NavigationNode } from '../../models';

export interface State {
  navigationNodes: any[]
  navigationTree: any[]
  expandedNodes: any[]
  activeBriefId: string
}

export const initialState: State = {
  navigationNodes: null,
  navigationTree: null,
  expandedNodes: [],
  activeBriefId: null
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

    case NavigationActionTypes.SetActiveBriefPath:
      return {
        ...state,
        activeBriefId: action.payload.activeBriefId
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
  (state: State) => JSON.parse(JSON.stringify(state.navigationNodes || []))
)

export const selectActiveBriefIdState = createSelector(
  navigationState,
  (state: State) => state.activeBriefId
)

export const selectExpandedNavigationNodeState = createSelector(
  navigationState,
  (state: State) => state.expandedNodes
)

export const selectExpandedNodesState = createSelector(
  selectNavigationNodeState,
  selectExpandedNavigationNodeState,
  selectActiveBriefIdState,
  (nodes, expandedNodes, briefId) => {
     // tslint:disable-next-line: no-console
   
    let nodesToExpand = []
    if (briefId) {
      const currentBriefNode = nodes.find(p => p.policy && p.subpolicy && `${p.briefId}` === `${briefId}`)
      
      if (currentBriefNode) {
        nodesToExpand.push(currentBriefNode.id)
      }
    }
    const uniqueArray = new Set([...expandedNodes, ...nodesToExpand])
    console.log(`🙈`,Array.from(uniqueArray))
    return Array.from(uniqueArray)
  }
)

export const selectNavigationNodeTreeState = createSelector(
  selectNavigationNodeState,
  selectExpandedNodesState,
  (nodes, expanded) => {
     // tslint:disable-next-line: no-console
    console.log(`👹 `, nodes)
    let sortedNodes = []
    if (expanded) {
      sortedNodes = nodes
        .map(p => ({
          ...p,
          expanded: expanded.includes(p.id)
        }))
        .sort(sortBy('order'))
    } else {
      sortedNodes = nodes.sort(sortBy('order'))
    }

    const tree = toTree(sortedNodes, {
      id: 'id',
      parentId: 'parent',
      children: 'children',
      level: 'level'
    })
    
    return tree
  }
)
