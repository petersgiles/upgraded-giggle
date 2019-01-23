import { Action } from '@ngrx/store'
import { MapPoint } from '@digital-first/df-components'

export enum DeliveryLocationActionTypes {

  ExpandPanel = '[DeliveryLocation] Expand Panel',
  CollapsePanel = '[DeliveryLocation] Collapse Panel',

  DeliveryLocationsActionFailure = '[DeliveryLocation] DeliveryLocations Action Failure',

  GetMapPointsByCommitment = '[DeliveryLocation] Get Map Points By Commitment',
  AddMapPointToCommitment = '[DeliveryLocation] Add MapPoint To Commitment',
  RemoveMapPointFromCommitment = '[DeliveryLocation] Remove MapPoint From Commitment',
  LoadMapPoints = '[DeliveryLocation] Load MapPoints',
  ClearMapPoints = '[DeliveryLocation] Clear MapPoints',

  GetElectoratesByCommitment = '[DeliveryLocation] Get Electorates By Commitment',
  AddElectorateToCommitment = '[DeliveryLocation] Add Electorate ToCommitment',
  RemoveElectorateFromCommitment = '[DeliveryLocation] Remove Electorate From Commitment',
  LoadElectorates = '[DeliveryLocation] Load Electorates',
  ClearElectorates = '[DeliveryLocation] Clear Electorates',

}

export class CollapsePanel implements Action {
  readonly type = DeliveryLocationActionTypes.CollapsePanel
}

export class ExpandPanel implements Action {
  readonly type = DeliveryLocationActionTypes.ExpandPanel
}

export class DeliveryLocationsActionFailure implements Action {
  readonly type = DeliveryLocationActionTypes.DeliveryLocationsActionFailure

  constructor(public payload: any) {}
}

export class GetMapPointsByCommitment implements Action {
  readonly type = DeliveryLocationActionTypes.GetMapPointsByCommitment
  constructor(public payload: { commitment: number | string }) {}
}

export class AddMapPointToCommitment implements Action {
  readonly type = DeliveryLocationActionTypes.AddMapPointToCommitment

  constructor(public payload: { commitment: number | string, mapPoint: MapPoint }) { }
}

export class RemoveMapPointFromCommitment implements Action {
  readonly type = DeliveryLocationActionTypes.RemoveMapPointFromCommitment

  constructor(public payload: { commitment: string | number, mapPoint: MapPoint }) { }
}

export class LoadMapPoints implements Action {
  readonly type = DeliveryLocationActionTypes.LoadMapPoints

  constructor(public payload: any) { }
}

export class ClearMapPoints implements Action {
  readonly type = DeliveryLocationActionTypes.ClearMapPoints

  constructor(public payload?: any) { }
}

export class GetElectoratesByCommitment implements Action {
  readonly type = DeliveryLocationActionTypes.GetElectoratesByCommitment
  constructor(public payload: { commitment: number | string }) {}
}

export class AddElectorateToCommitment implements Action {
  readonly type = DeliveryLocationActionTypes.AddElectorateToCommitment

  constructor(public payload: { commitment: number | string, electorate: string | number }) { }
}

export class RemoveElectorateFromCommitment implements Action {
  readonly type = DeliveryLocationActionTypes.RemoveElectorateFromCommitment

  constructor(public payload: { commitment: number | string, electorate: string | number }) { }
}

export class LoadElectorates implements Action {
  readonly type = DeliveryLocationActionTypes.LoadElectorates

  constructor(public payload: any) { }
}

export class ClearElectorates implements Action {
  readonly type = DeliveryLocationActionTypes.ClearElectorates

  constructor(public payload?: any) { }
}

export type DeliveryLocationActions =
  | CollapsePanel
  | ExpandPanel
  | DeliveryLocationsActionFailure
  | AddMapPointToCommitment
  | RemoveMapPointFromCommitment
  | LoadMapPoints
  | ClearMapPoints
  | AddElectorateToCommitment
  | RemoveElectorateFromCommitment
  | GetMapPointsByCommitment
  | GetElectoratesByCommitment
  | LoadElectorates
  | ClearElectorates
