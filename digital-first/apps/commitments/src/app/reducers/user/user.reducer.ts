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
  operations: {
    'commitment': 'read',
    'location': 'read',
    'contacts': 'read',
    'costing': 'read',
    'relatedLinks': 'read',
    'relatedCommitments': 'read',
    'discussion': 'read',
  }
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
      return {
        ...state,
        operations: {...action.payload}
      }
    }

    default:
      return state
  }
}
export const getCurrentUserOperations = (state: State) => state.operations
export const getCurrentUser = (state: State) => state.currentUser
export const getDrawerOpen = (state: State) => state.drawerOpen