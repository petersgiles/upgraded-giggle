import { Action } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { WhoAnnouncedType } from './who-announced-type.model'
import { DataResult, WhoAnnouncedTypesResult } from '../../models'

export enum WhoAnnouncedTypeActionTypes {
  LoadWhoAnnouncedTypes = '[WhoAnnouncedType] Load WhoAnnouncedTypes',
  AddWhoAnnouncedType = '[WhoAnnouncedType] Add WhoAnnouncedType',
  UpsertWhoAnnouncedType = '[WhoAnnouncedType] Upsert WhoAnnouncedType',
  AddWhoAnnouncedTypes = '[WhoAnnouncedType] Add WhoAnnouncedTypes',
  UpsertWhoAnnouncedTypes = '[WhoAnnouncedType] Upsert WhoAnnouncedTypes',
  UpdateWhoAnnouncedType = '[WhoAnnouncedType] Update WhoAnnouncedType',
  UpdateWhoAnnouncedTypes = '[WhoAnnouncedType] Update WhoAnnouncedTypes',
  DeleteWhoAnnouncedType = '[WhoAnnouncedType] Delete WhoAnnouncedType',
  DeleteWhoAnnouncedTypes = '[WhoAnnouncedType] Delete WhoAnnouncedTypes',
  ClearWhoAnnouncedTypes = '[WhoAnnouncedType] Clear WhoAnnouncedTypes',

  SetCurrentWhoAnnouncedType = '[WhoAnnouncedType] Set Current WhoAnnouncedType',
  GetWhoAnnouncedTypes = '[WhoAnnouncedType] Get WhoAnnouncedTypes',
  GetAllWhoAnnouncedTypes = '[WhoAnnouncedType] Get All WhoAnnouncedTypes',
  WhoAnnouncedTypesActionFailure = '[WhoAnnouncedType] WhoAnnouncedTypes Action Failure',
}

export class LoadWhoAnnouncedTypes implements Action {
  readonly type = WhoAnnouncedTypeActionTypes.LoadWhoAnnouncedTypes

  constructor(public payload: DataResult<WhoAnnouncedTypesResult>) {}
}

export class AddWhoAnnouncedType implements Action {
  readonly type = WhoAnnouncedTypeActionTypes.AddWhoAnnouncedType

  constructor(public payload: { whoAnnouncedType: WhoAnnouncedType }) {}
}

export class UpsertWhoAnnouncedType implements Action {
  readonly type = WhoAnnouncedTypeActionTypes.UpsertWhoAnnouncedType

  constructor(public payload: { whoAnnouncedType: WhoAnnouncedType }) {}
}

export class AddWhoAnnouncedTypes implements Action {
  readonly type = WhoAnnouncedTypeActionTypes.AddWhoAnnouncedTypes

  constructor(public payload: { whoAnnouncedTypes: WhoAnnouncedType[] }) {}
}

export class UpsertWhoAnnouncedTypes implements Action {
  readonly type = WhoAnnouncedTypeActionTypes.UpsertWhoAnnouncedTypes

  constructor(public payload: { whoAnnouncedTypes: WhoAnnouncedType[] }) {}
}

export class UpdateWhoAnnouncedType implements Action {
  readonly type = WhoAnnouncedTypeActionTypes.UpdateWhoAnnouncedType

  constructor(public payload: { whoAnnouncedType: Update<WhoAnnouncedType> }) {}
}

export class UpdateWhoAnnouncedTypes implements Action {
  readonly type = WhoAnnouncedTypeActionTypes.UpdateWhoAnnouncedTypes

  constructor(public payload: { whoAnnouncedTypes: Update<WhoAnnouncedType>[] }) {}
}

export class DeleteWhoAnnouncedType implements Action {
  readonly type = WhoAnnouncedTypeActionTypes.DeleteWhoAnnouncedType

  constructor(public payload: { id: string }) {}
}

export class DeleteWhoAnnouncedTypes implements Action {
  readonly type = WhoAnnouncedTypeActionTypes.DeleteWhoAnnouncedTypes

  constructor(public payload: { ids: string[] }) {}
}

export class ClearWhoAnnouncedTypes implements Action {
  readonly type = WhoAnnouncedTypeActionTypes.ClearWhoAnnouncedTypes
}

export class SetCurrentWhoAnnouncedType implements Action {
  readonly type = WhoAnnouncedTypeActionTypes.SetCurrentWhoAnnouncedType
  constructor(public payload: { id: number }) {}
}
export class GetWhoAnnouncedTypes implements Action {
  readonly type = WhoAnnouncedTypeActionTypes.GetWhoAnnouncedTypes
  constructor(public payload: { ids: number[] }) {}
}

export class GetAllWhoAnnouncedTypes implements Action {
  readonly type = WhoAnnouncedTypeActionTypes.GetAllWhoAnnouncedTypes
  constructor(public payload?: { filter?: any }) {}
}

export class WhoAnnouncedTypesActionFailure implements Action {
  readonly type = WhoAnnouncedTypeActionTypes.WhoAnnouncedTypesActionFailure

  constructor(public payload: any) {
  }
}

export type WhoAnnouncedTypeActions =
 LoadWhoAnnouncedTypes
 | AddWhoAnnouncedType
 | UpsertWhoAnnouncedType
 | AddWhoAnnouncedTypes
 | UpsertWhoAnnouncedTypes
 | UpdateWhoAnnouncedType
 | UpdateWhoAnnouncedTypes
 | DeleteWhoAnnouncedType
 | DeleteWhoAnnouncedTypes
 | ClearWhoAnnouncedTypes
 | SetCurrentWhoAnnouncedType
 | GetAllWhoAnnouncedTypes
 | GetWhoAnnouncedTypes
 | WhoAnnouncedTypesActionFailure
