import { UserActionTypes, UserActions } from './user.actions'
import { AppActionTypes, AppActions } from '../app.actions'

export interface State {
  currentUser,
  drawerOpen
}

export const initialState: State = {
  currentUser: null,
  drawerOpen: false
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

    default:
      return state
  }
}

export const getCurrentUser = (state: State) => state.currentUser
export const getDrawerOpen = (state: State) => state.drawerOpen