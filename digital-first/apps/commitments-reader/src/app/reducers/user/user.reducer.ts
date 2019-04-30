
import { UserActions, UserActionTypes } from './user.actions';
import { AppActions, AppActionTypes } from '../app.actions';

export interface State {
  currentUser
  drawerOpen
  operations
}

export const initialState: State = {
  currentUser: null,
  drawerOpen: false,
  operations: {}
};

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
export const getOperations = (state: State) => state.operations
export const getCurrentUser = (state: State) => state.currentUser
export const getDrawerOpen = (state: State) => state.drawerOpen
