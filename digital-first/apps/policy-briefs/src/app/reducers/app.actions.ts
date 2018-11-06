import { Action } from '@ngrx/store'

export enum AppActionTypes {
    StartAppInitialiser = '[App] Start App Initialiser',
    FinishAppInitialiser = '[App] Finish App Initialiser',
    Notification = '[App] Notification',
    ClearNotification = '[App] Clear Notification',
}

export class StartAppInitialiser implements Action {
    readonly type = AppActionTypes.StartAppInitialiser
}

export class FinishAppInitialiser implements Action {
    readonly type = AppActionTypes.FinishAppInitialiser
}

export class Notification implements Action {
    readonly type = AppActionTypes.Notification
    constructor(public payload: {message: string, code?: string}) { }
}

export class ClearNotification implements Action {
    readonly type = AppActionTypes.ClearNotification
}

export type AppActions =
    StartAppInitialiser
    | FinishAppInitialiser
    | Notification
    | ClearNotification
