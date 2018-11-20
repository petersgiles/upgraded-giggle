import { Action } from '@ngrx/store'

export enum UserActionTypes {
  SetCurrentUser = '[User] Set Current User',
}

export class SetCurrentUser implements Action {
  readonly type = UserActionTypes.SetCurrentUser

  constructor(public payload: any) { }
}

export type UserActions =
  SetCurrentUser