import { Action } from '@ngrx/store'

export enum UserActionTypes {
  SetCurrentUser = '[User] Set Current User',
  GetCurrentUser = '[User] Get Current User',
  GetUserOperations = '[User] Get User Operations',
  SetUserOperations = '[User] Set User Operations',
  SetUserOperationDefaults = '[User] Set User Operation Defaults'
}

export class GetCurrentUser implements Action {
  readonly type = UserActionTypes.GetCurrentUser

  constructor(public payload: any) {}
}

export class SetCurrentUser implements Action {
  readonly type = UserActionTypes.SetCurrentUser

  constructor(public payload: any) {}
}

export class GetUserOperations implements Action {
  readonly type = UserActionTypes.GetUserOperations

  constructor(public payload: any) {}
}

export class SetUserOperationDefaults implements Action {
  readonly type = UserActionTypes.SetUserOperationDefaults

  constructor(public payload: any) {}
}

export class SetUserOperations implements Action {
  readonly type = UserActionTypes.SetUserOperations

  constructor(public payload: any) {}
}

export type UserActions =
  | GetCurrentUser
  | SetCurrentUser
  | GetUserOperations
  | SetUserOperations
  | SetUserOperationDefaults
