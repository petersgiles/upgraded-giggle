import { UserActionTypes, UserActions } from './user.actions'
import { AppActionTypes, AppActions } from '../app.actions'

export interface State {
  currentUser,
  drawerOpen,
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

    case UserActionTypes.SetUserOperations : {
// tslint:disable-next-line:no-console
console.log('SetUserOperations', action.payload)
      const ops = action.payload.data.groupPermissions.reduce((acc: any, item: any) => {

        const components = item.component.split(',')
        acc[item.group] = {
          ...(components || []).reduce((obj, c) =>  (obj[c] = item.rights , obj), {})
        }
        return acc
      }, {})

// tslint:disable-next-line:no-console
console.log('SetUserOperations', action.payload, ops)

      return {
        ...state,
        operations: {...ops}
      }
    }

    default:
      return state
  }
}
export const getOperations = (state: State) => state.operations
export const getCurrentUser = (state: State) => state.currentUser
export const getDrawerOpen = (state: State) => state.drawerOpen