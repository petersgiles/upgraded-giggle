import { Action } from '@ngrx/store'

export enum AppActionTypes {
    StartAppInitialiser = '[App] Start App Initialiser',
    FinishAppInitialiser = '[App] Finish App Initialiser',
    AppNotification = '[App] AppNotification',
    ClearAppNotification = '[App] Clear AppNotification',
}

export class StartAppInitialiser implements Action {
    readonly type = AppActionTypes.StartAppInitialiser
}

export class FinishAppInitialiser implements Action {
    readonly type = AppActionTypes.FinishAppInitialiser
}

export class AppNotification implements Action {
    readonly type = AppActionTypes.AppNotification
    constructor(public payload: {message: string, code?: string}) { }
}

export class ClearAppNotification implements Action {
    readonly type = AppActionTypes.ClearAppNotification
}

export type AppActions =
    StartAppInitialiser
    | FinishAppInitialiser
    | AppNotification
    | ClearAppNotification
