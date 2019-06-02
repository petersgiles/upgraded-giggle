import { Action } from '@ngrx/store'
import { NotificationMessage } from './app.model';

export enum AppActionTypes {
  StartAppInitialiser = '[App] Start App Initialiser',
  FinishAppInitialiser = '[App] Finish App Initialiser',
  AppNotification = '[App] AppNotification',
  ClearAppNotification = '[App] Clear AppNotification',
  SetLayoutDrawState = '[App] Set Layout Draw State',
  GetAppConfiguration = '[App] Get App Configuration',
  LoadAppConfiguration = '[App] Load App Configuration',
  LoadAppConfigurationError = '[App] Load App Configuration',
  HideSpinner = '[App] HideSpinner',
  ShowSpinner = '[App] ShowSpinner',
  HandleGlobalError = '[App] Handle Global Error',
  GetRefinedCommitmentsFailure = '[App] GetRefinedCommitmentsFailure'
}

export class ShowSpinner implements Action {
  readonly type = AppActionTypes.ShowSpinner
}

export class HideSpinner implements Action {
  readonly type = AppActionTypes.HideSpinner
}

export class StartAppInitialiser implements Action {
  readonly type = AppActionTypes.StartAppInitialiser
  constructor(public payload: { environment: any }) {}
}

export class GetAppConfiguration implements Action {
  readonly type = AppActionTypes.GetAppConfiguration
}

export class LoadAppConfiguration implements Action {
  readonly type = AppActionTypes.LoadAppConfiguration
  constructor(public payload: any) {}
}

export class FinishAppInitialiser implements Action {
  readonly type = AppActionTypes.FinishAppInitialiser
}

export class AppNotification implements Action {
  readonly type = AppActionTypes.AppNotification
  constructor(public payload: NotificationMessage) {}
}

export class ClearAppNotification implements Action {
  readonly type = AppActionTypes.ClearAppNotification
}

export class SetLayoutDrawState implements Action {
  readonly type = AppActionTypes.SetLayoutDrawState
  constructor(public state: boolean) {}
}

export class LoadAppConfigurationError implements Action {
  readonly type = AppActionTypes.LoadAppConfigurationError
  constructor(public payload) {}
}

export class HandleGlobalError implements Action {
  readonly type = AppActionTypes.HandleGlobalError
  constructor(public payload: {error: any}) {}
}

export class GetRefinedCommitmentsFailure implements Action {
  readonly type = AppActionTypes.GetRefinedCommitmentsFailure
  constructor(public payload: any) {}
}



export type AppActions =
  | StartAppInitialiser
  | FinishAppInitialiser
  | AppNotification
  | ClearAppNotification
  | SetLayoutDrawState
  | GetAppConfiguration
  | LoadAppConfiguration
  | LoadAppConfigurationError
  | ShowSpinner
  | HideSpinner
  | HandleGlobalError
  | GetRefinedCommitmentsFailure
