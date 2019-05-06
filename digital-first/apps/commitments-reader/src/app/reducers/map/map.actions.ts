import { Action } from '@ngrx/store'

export enum MapActionTypes {
  LoadMapPoints = '[Map] Load Maps',
  GetRefinedMapPoints = '[Map] GetRefinedMapPoints',
  GetMapPointsFailure = '[Map] GetMapPointsFailure'
}

export class LoadMapPoints implements Action {
  readonly type = MapActionTypes.LoadMapPoints
  constructor(public payload: any) {}
}

export class GetRefinedMapPoints implements Action {
  readonly type = MapActionTypes.GetRefinedMapPoints
  constructor(public payload: any) {}
}

export class GetMapPointsFailure implements Action {
  type = MapActionTypes.GetMapPointsFailure
  constructor(public payload: any) {}
}

export type MapActions = LoadMapPoints | GetRefinedMapPoints | GetMapPointsFailure
