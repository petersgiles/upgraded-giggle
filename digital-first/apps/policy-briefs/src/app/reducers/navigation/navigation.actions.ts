import { Action } from '@ngrx/store'
import { NavigatorTreeNode } from '@df/components'
import { expand } from 'rxjs/operators'

export enum NavigationActionTypes {
  GetNavigations = '[Navigation] Get Navigations',
  GetNavigationsFailure = '[Navigation] Get Navigations Failure',
  LoadNavigations = '[Navigation] Load Navigations',
  ToggleExpand = '[Navigation] Toggle Expand',
  SetActiveBriefPath = '[Navigation] SetActiveBriefPath'
}

export class SetActiveBriefPath implements Action {
  readonly type = NavigationActionTypes.SetActiveBriefPath
  constructor(public payload: { activeBriefId: string }) {}
}

export class GetNavigations implements Action {
  readonly type = NavigationActionTypes.GetNavigations
}

export class ToggleExpand implements Action {
  readonly type = NavigationActionTypes.ToggleExpand

  constructor(public payload: { id: string; expanded: boolean }) {}
}

export class GetNavigationsFailure implements Action {
  readonly type = NavigationActionTypes.GetNavigationsFailure

  constructor(public payload: any) {}
}

export class LoadNavigations implements Action {
  readonly type = NavigationActionTypes.LoadNavigations
  constructor(
    public payload: { nodes: NavigatorTreeNode[]; loading: boolean }
  ) {}
}

export type NavigationActions =
  | LoadNavigations
  | GetNavigations
  | GetNavigationsFailure
  | ToggleExpand
  | SetActiveBriefPath
