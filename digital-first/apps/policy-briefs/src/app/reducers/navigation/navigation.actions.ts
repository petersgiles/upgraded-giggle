import { Action } from '@ngrx/store'
import { NavigatorTreeNode } from '@df/components';

export enum NavigationActionTypes {
  GetNavigations = '[Navigation] Get Navigations',
  GetNavigationsFailure = '[Navigation] Get Navigations Failure',
  LoadNavigations = '[Navigation] Load Navigations'
}

export class GetNavigations implements Action {
  readonly type = NavigationActionTypes.GetNavigations

}


export class GetNavigationsFailure implements Action {
  readonly type = NavigationActionTypes.GetNavigationsFailure

  constructor(public payload: any) {
  }
}

export class LoadNavigations implements Action {
  readonly type = NavigationActionTypes.LoadNavigations
  constructor(public payload: { nodes: NavigatorTreeNode[], loading: boolean}) {
  }
}

export type NavigationActions = LoadNavigations | GetNavigations | GetNavigationsFailure
