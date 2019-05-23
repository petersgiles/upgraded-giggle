import { UserActions, UserActionTypes, GetCurrentUser } from './user.actions'
import { AppActions, AppActionTypes } from '../app/app.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import {
  OPERATION_DEFAULTS,
  OPERATION_RIGHTS_PRECEDENT,
  OPERATION_PLANNER,
  OPERATION_RIGHT_WRITE
} from '../../services/app-data/app-operations'
import { stringify } from 'querystring'

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
      const groupPermissions = JSON.parse(
        JSON.stringify(action.payload.data.groupPermissions)
      )
      ops = (groupPermissions || []).reduce((acc: any, item: any) => {
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
      }, {})

      // tslint:disable-next-line: no-console
      console.log(`🌶️🌶️🌶️`, action.payload, ops)

      return {
        ...state,
        operations: { ...ops }
      }
    }

    default:
      return state
  }
}
export const getOperations = (state: State) => state.operations
export const getCurrentUser = (state: State) => state.currentUser
export const getDrawerOpen = (state: State) => state.drawerOpen

export const userState = createFeatureSelector<State>('user')

export const getUserCurrentUser = createSelector(
  userState,
  getCurrentUser
)

export const getUserCurrentUserPermissions = createSelector(
  userState,
  getOperations
)

export const getUserCurrentUserOperations = createSelector(
  getUserCurrentUser,
  getUserCurrentUserPermissions,
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

export interface MatrixRow {
  title: string
  write: boolean
  read: boolean
  hide: boolean
}

export const getUserOperationMatrix = createSelector(
  getUserCurrentUserOperations,
  operations =>
    Object.keys(operations).reduce((acc, item) => {
      const row: MatrixRow = {
        title: item,
        write: false,
        read: false,
        hide: false
      }

      const op = operations[item]

      row[op] = true
      acc.push(row)

      console.log(`💦`, operations)
      console.log(`💦`, item)
      console.log(`💦`, op)
      console.log(`💦`, row)
      console.log(`💦`, acc)
      return acc
    }, [])
)

export const getUserCurrentUserPlannerPermission = createSelector(
  getUserCurrentUser,
  getUserCurrentUserOperations,
  (user, operations) =>
    user && user.isSiteAdmin
      ? OPERATION_RIGHT_WRITE
      : operations[OPERATION_PLANNER]
)
