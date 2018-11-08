import { AuthAction, AuthActionTypes } from './auth.actions'
import { User, AuthResult } from './models'

export const AUTH_FEATURE_KEY = 'auth'

/**
 * Interface for the 'Auth' data used in
 *  - AuthState, and
 *  - authReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */

export interface AuthState {
  user: User | null
  auth: AuthResult
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState
}

export const initialState: AuthState = {
  user: null,
  auth: null
}

export function authReducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {

  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        user: action.payload.user,
      }
    }

    case AuthActionTypes.AuthTokenSuccess: {

      return {
        ...state,
        auth: action.payload.auth,
      }
    }

    // TODO: check with Pete, what should we do when web api stops refreshing our token?  set it to null?
    case AuthActionTypes.AuthTokenRefreshFailure: {
      return {
        ...state,
        auth: null,
      }
    }

    case AuthActionTypes.AuthTokenRefreshSuccess: {
      return {
        ...state,
        auth: action.payload,
      }
    }

    case AuthActionTypes.Logout: {
      return initialState
    }
  }

  return state
}
