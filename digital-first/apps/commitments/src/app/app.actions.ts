import { Action } from '@ngrx/store'

export enum AppActionTypes {
    StartAppInitialiser = '[App] Start App Initialiser',
    FinishAppInitialiser = '[App] Finish App Initialiser'
}

export class StartAppInitialiser implements Action {
    readonly type = AppActionTypes.StartAppInitialiser
}

export class FinishAppInitialiser implements Action {
    readonly type = AppActionTypes.FinishAppInitialiser
}

export type AppActions =
    StartAppInitialiser
    | FinishAppInitialiser
