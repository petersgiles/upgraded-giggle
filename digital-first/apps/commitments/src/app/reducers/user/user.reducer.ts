import { UserActionTypes, UserActions } from './user.actions'

export interface State {
  currentUser
}

export const initialState: State = {
  currentUser: null
}

export function reducer(
  state = initialState,
  action: UserActions
): State {
  switch (action.type) {

    case UserActionTypes.SetCurrentUser: {
      return {
        ...state,
        currentUser: action.payload
      }
    }

    default:
      return state
  }
}

export const getCurrentUser = (state: State) => state.currentUser