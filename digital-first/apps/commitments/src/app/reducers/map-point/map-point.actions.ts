import { Action } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { MapPoint } from './map-point.model'
import { DataResult, MapPointsResult } from '../../models'

export enum MapPointActionTypes {
  LoadMapPoints = '[MapPoint] Load MapPoints',
  AddMapPoint = '[MapPoint] Add MapPoint',
  UpsertMapPoint = '[MapPoint] Upsert MapPoint',
  AddMapPoints = '[MapPoint] Add MapPoints',
  UpsertMapPoints = '[MapPoint] Upsert MapPoints',
  UpdateMapPoint = '[MapPoint] Update MapPoint',
  UpdateMapPoints = '[MapPoint] Update MapPoints',
  DeleteMapPoint = '[MapPoint] Delete MapPoint',
  DeleteMapPoints = '[MapPoint] Delete MapPoints',
  ClearMapPoints = '[MapPoint] Clear MapPoints',

  SetCurrentMapPoint = '[MapPoint] Set Current MapPoint',
  GetMapPoints = '[MapPoint] Get MapPoints',
  GetAllMapPoints = '[MapPoint] Get All MapPoints',
  GetMapPointsByCommitment = '[MapPoint] Get Map Points By Commitment',
  StoreMapPoint = '[MapPoint] Store MapPoint',
  RemoveMapPoint = '[MapPoint] Remove MapPoint',
  MapPointsActionFailure = '[MapPoint] MapPoints Action Failure',
}

export class GetMapPointsByCommitment implements Action {
  readonly type = MapPointActionTypes.GetMapPointsByCommitment
  constructor(public payload: { commitment: number }) {}
}

export class StoreMapPoint implements Action {
  readonly type = MapPointActionTypes.StoreMapPoint

  constructor(public payload: MapPoint) {}
}

export class RemoveMapPoint implements Action {
  readonly type = MapPointActionTypes.RemoveMapPoint

  constructor(public payload: {id: number}) {}
}

export class LoadMapPoints implements Action {
  readonly type = MapPointActionTypes.LoadMapPoints

  constructor(public payload: DataResult<MapPointsResult>) { }
}

export class AddMapPoint implements Action {
  readonly type = MapPointActionTypes.AddMapPoint

  constructor(public payload: { location: MapPoint }) { }
}

export class UpsertMapPoint implements Action {
  readonly type = MapPointActionTypes.UpsertMapPoint

  constructor(public payload: { location: MapPoint }) { }
}

export class AddMapPoints implements Action {
  readonly type = MapPointActionTypes.AddMapPoints

  constructor(public payload: { locations: MapPoint[] }) { }
}

export class UpsertMapPoints implements Action {
  readonly type = MapPointActionTypes.UpsertMapPoints

  constructor(public payload: { locations: MapPoint[] }) { }
}

export class UpdateMapPoint implements Action {
  readonly type = MapPointActionTypes.UpdateMapPoint

  constructor(public payload: { location: Update<MapPoint> }) { }
}

export class UpdateMapPoints implements Action {
  readonly type = MapPointActionTypes.UpdateMapPoints

  constructor(public payload: { locations: Update<MapPoint>[] }) { }
}

export class DeleteMapPoint implements Action {
  readonly type = MapPointActionTypes.DeleteMapPoint

  constructor(public payload: { id: string }) { }
}

export class DeleteMapPoints implements Action {
  readonly type = MapPointActionTypes.DeleteMapPoints

  constructor(public payload: { ids: string[] }) { }
}

export class ClearMapPoints implements Action {
  readonly type = MapPointActionTypes.ClearMapPoints
}

export class SetCurrentMapPoint implements Action {
  readonly type = MapPointActionTypes.SetCurrentMapPoint
  constructor(public payload: { id: number }) { }
}
export class GetMapPoints implements Action {
  readonly type = MapPointActionTypes.GetMapPoints
  constructor(public payload?: { ids?: number[] }) { }
}

export class GetAllMapPoints implements Action {
  readonly type = MapPointActionTypes.GetAllMapPoints
  constructor(public payload?: { filter?: any }) { }
}

export class MapPointsActionFailure implements Action {
  readonly type = MapPointActionTypes.MapPointsActionFailure

  constructor(public payload: any) {
  }
}

export type MapPointActions =
  LoadMapPoints
  | AddMapPoint
  | UpsertMapPoint
  | AddMapPoints
  | UpsertMapPoints
  | UpdateMapPoint
  | UpdateMapPoints
  | DeleteMapPoint
  | DeleteMapPoints
  | ClearMapPoints
  | SetCurrentMapPoint
  | GetAllMapPoints
  | GetMapPoints
  | GetMapPointsByCommitment
  | StoreMapPoint
  | RemoveMapPoint
  | MapPointsActionFailure
