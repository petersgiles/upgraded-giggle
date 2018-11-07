import { AuthActions, AuthActionTypes } from './auth.actions';
import { AuthResult, LoggedInUser } from '../models';

export const AUTH_FEATURE_KEY = 'auth';

/**
 * Interface for the 'Auth' data used in
 *  - AuthState, and
 *  - authReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface AuthState {
  user: LoggedInUser | null
  auth: AuthResult
  error: string | null
  pending: boolean
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialState: AuthState = {
  user: null,
  auth: null,
  error: null,
  pending: false,
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
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

    case AuthActionTypes.Login: {
      return {
        ...state,
        error: null,
        pending: true,
      }
    }

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        error: null,
        pending: false,
      }
    }

    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      }
    }

    default: {
      return state
    }
  }
}


export const getAuth = (state: AuthState) => state.auth
export const getUser = (state: AuthState) => state.user
export const getError = (state: AuthState) => state.error
export const getPending = (state: AuthState) => state.pending
