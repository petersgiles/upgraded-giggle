import { UserActions, UserActionTypes, GetCurrentUser } from './user.actions'
import { AppActions, AppActionTypes } from '../app/app.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export const ROLE_OWNERS = 'ROLE_OWNERS'
export const ROLE_MEMBERS = 'ROLE_MEMBERS'
export const ROLE_VISITORS = 'ROLE_VISITORS'

export const OPERATION_RIGHT_READ = 'read'
export const OPERATION_RIGHT_WRITE = 'write'
export const OPERATION_RIGHT_HIDE = 'hide'

export const OPERATION_RIGHTS_PRECEDENT = [OPERATION_RIGHT_HIDE, OPERATION_RIGHT_WRITE, OPERATION_RIGHT_READ]

export interface State {
  currentUser
  drawerOpen
  operations
  operationDefaults
}

export const initialState: State = {
  currentUser: null,
  drawerOpen: false,
  operations: {},
  operationDefaults: {}
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

    case UserActionTypes.SetUserOperationDefaults: {
      return {
        ...state,
        operationDefaults: action.payload
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
      console.log(`👤`, action.payload, ops)

      return {
        ...state,
        operations: { ...ops }
      }
    }

    default:
      return state
  }
}
export const getOperationDefaults = (state: State) => state.operationDefaults
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

export const getUserCurrentOperationDefaults = createSelector(
  userState,
  getOperationDefaults
)

export const getUserCurrentUserOperations = createSelector(
  getUserCurrentUser,
  getUserCurrentUserPermissions,
  getUserCurrentOperationDefaults,
  (user, operations, defaults) => {
    if (!defaults) {
      // tslint:disable-next-line: no-console
      console.log(`👤 NO DEFAULTS`, defaults)
      return {}
    }

    if (!user || !operations || !user.roles) {
      // tslint:disable-next-line: no-console
      console.log(`👤 USE DEFAULTS`, user, operations)
      return {
        ...defaults
      }
    }
    const rights = Object.keys(defaults).reduce(
      (acc: any, componentName: any) => {

        // tslint:disable-next-line: no-console
        console.log(`👤 USE rights`, componentName)

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

      // tslint:disable-next-line: no-console
      console.log(`👤`, finalRights)

    return {
      ...defaults,
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

      console.log(`👤`, operations)
      console.log(`👤`, item)
      console.log(`👤`, op)
      console.log(`👤`, row)
      console.log(`👤`, acc)
      return acc
    }, [])
)