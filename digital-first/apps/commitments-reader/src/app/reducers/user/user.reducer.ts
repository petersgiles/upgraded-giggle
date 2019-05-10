import { UserActions, UserActionTypes } from './user.actions'
import { AppActions, AppActionTypes } from '../app/app.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import {
  OPERATION_DEFAULTS,
  OPERATION_RIGHTS_PRECEDENT
} from '../../services/app-data/app-operations'

export interface State {
  currentUser
  drawerOpen
  operations
}

export const initialState: State = {
  currentUser: null,
  drawerOpen: false,
  operations: {}
}

export function reducer(
  state = initialState,
  action: UserActions | AppActions
): State {
  switch (action.type) {
    case UserActionTypes.SetCurrentUser: {
      return {
        ...state,
        currentUser: action.payload
      }
    }

    case AppActionTypes.SetLayoutDrawState: {
      return {
        ...state,
        drawerOpen: action.state
      }
    }

    case UserActionTypes.SetUserOperations: {
      let ops = {}
      if (action.payload.data && action.payload.data.groupPermissions) {
        ops = action.payload.data.groupPermissions.reduce(
          (acc: any, item: any) => {
            const components = item.component
            acc[item.group] = {
              ...(components || []).reduce(
                (componentRights: any, component: any) => {
                  componentRights[component] = item.rights
                  return componentRights
                },
                acc[item.group] || {}
              )
            }
            return acc
          },
          {}
        )
      }

      return {
        ...state,
        operations: { ...ops }
      }
    }

    default:
      return state
  }
}

export const userState = createFeatureSelector<State>('user')

export const getOperations = createSelector(
  userState,
  (state: State) => state.operations
)

export const getCurrentUser = createSelector(
  userState,
  (state: State) => state.currentUser
)
export const getDrawerOpen = createSelector(
  userState,
  (state: State) => state.drawerOpen
)

export const getCurrentUserOperations = createSelector(
  getCurrentUser,
  getOperations,
  (user, operations) => {
    if (!user || !operations || !user.roles) {
      return {
        ...OPERATION_DEFAULTS
      }
    }

    const rights = Object.keys(OPERATION_DEFAULTS).reduce(
      (acc: any, componentName: any) => {
        const operationsRights = user.roles.reduce(
          (rightsAcc: any, group: any) => {
            const groupComponents = operations[group]
            if (groupComponents && groupComponents[componentName]) {
              rightsAcc.push(groupComponents[componentName])
            }
            return rightsAcc
          },
          []
        )

        const orderedRights = operationsRights.sort((left: any, right: any) =>
          OPERATION_RIGHTS_PRECEDENT.indexOf(left) >
          OPERATION_RIGHTS_PRECEDENT.indexOf(right)
            ? 1
            : -1
        )
        acc[componentName] = orderedRights[0]
        return acc
      },
      {}
    )

    const finalRights = Object.keys(rights).reduce((a, i) => {
      if (rights[i]) {
        a[i] = rights[i]
      }
      return a
    }, {})

    return {
      ...OPERATION_DEFAULTS,
      ...finalRights
    }
  }
)
