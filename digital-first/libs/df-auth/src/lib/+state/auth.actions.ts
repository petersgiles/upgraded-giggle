import { Action } from '@ngrx/store'
import { AuthResult, Authenticate, User } from './models'

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  AuthTokenSuccess = '[Auth] Token Success',

  AuthTokenRefresh = '[Auth] Token Refresh',
  AuthTokenRefreshSuccess = '[Auth] Token Refresh Success',
  AuthTokenRefreshFailure = '[Auth] Token Refresh Failure',

  StartAutoTokenRefresh = '[Auth] Start Auto Token Refresh',
  StartAutoTokenRefreshSuccess = '[Auth] Start Auto Token Refresh Success',
  StartAutoTokenRefreshFailure = '[Auth] Start Token Refresh Failure'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login

  constructor(public payload: Authenticate) {
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess

  constructor(public payload: { user: User }) {
  }
}

export class AuthTokenSuccess implements Action {
  readonly type = AuthActionTypes.AuthTokenSuccess

  constructor(public payload: { auth: AuthResult }) {
  }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure

  constructor(public payload: any) {
  }
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect

  constructor(public payload: string) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout
}

// Refresh token actions

export class AuthTokenRefresh implements Action {
  readonly type = AuthActionTypes.AuthTokenRefresh
}

export class AuthTokenRefreshSuccess implements Action {
  readonly type = AuthActionTypes.AuthTokenRefreshSuccess

  constructor(public payload: AuthResult) {
  }
}

export class AuthTokenRefreshFailure implements Action {
  readonly type = AuthActionTypes.AuthTokenRefreshFailure

  constructor(public payload: any) {
  }
}

export class StartAutoTokenRefresh implements Action {
  readonly type = AuthActionTypes.StartAutoTokenRefresh
}

export class StartAutoTokenRefreshSuccess implements Action {
  readonly type = AuthActionTypes.StartAutoTokenRefreshSuccess
}

export class StartAutoTokenRefreshFailure implements Action {
  readonly type = AuthActionTypes.StartAutoTokenRefreshFailure
  constructor(public payload: any) {
  }
}

export type AuthAction =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | AuthTokenSuccess
  | AuthTokenRefresh
  | AuthTokenRefreshSuccess
  | AuthTokenRefreshFailure
  | StartAutoTokenRefresh
  | StartAutoTokenRefreshSuccess
  | StartAutoTokenRefreshFailure

export const fromAuthActions = {
  Login,
  LoginSuccess,
  LoginFailure,
  LoginRedirect,
  Logout,
  AuthTokenSuccess,
  AuthTokenRefresh,
  AuthTokenRefreshSuccess,
  AuthTokenRefreshFailure,
  StartAutoTokenRefresh,
  StartAutoTokenRefreshSuccess,
  StartAutoTokenRefreshFailure
}