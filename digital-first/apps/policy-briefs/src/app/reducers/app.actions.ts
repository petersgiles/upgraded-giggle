import { Action } from '@ngrx/store'

export enum AppActionTypes {
    StartAppInitialiser = '[App] Start App Initialiser',
    FinishAppInitialiser = '[App] Finish App Initialiser',
    AppNotification = '[App] AppNotification',
    ClearAppNotification = '[App] Clear AppNotification',
    SetLayoutDrawState = '[App] Set Layout Draw State',
}

export class StartAppInitialiser implements Action {
    readonly type = AppActionTypes.StartAppInitialiser
    constructor(public payload: {environment: any}) { }
}

export class FinishAppInitialiser implements Action {
    readonly type = AppActionTypes.FinishAppInitialiser
}

export class AppNotification implements Action {
    readonly type = AppActionTypes.AppNotification
    constructor(public payload: {message: string, code?: string, data?: any}) { }
}

export class ClearAppNotification implements Action {
    readonly type = AppActionTypes.ClearAppNotification
}

export class SetLayoutDrawState implements Action {
    readonly type = AppActionTypes.SetLayoutDrawState
    constructor(public state: boolean) { }
}

export type AppActions =
    StartAppInitialiser
    | FinishAppInitialiser
    | AppNotification
    | ClearAppNotification
    | SetLayoutDrawState
