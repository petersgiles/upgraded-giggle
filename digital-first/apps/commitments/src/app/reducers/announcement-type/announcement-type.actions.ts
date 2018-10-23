import { Action } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { AnnouncementType } from './announcement-type.model'
import { DataResult, AnnouncementTypesResult } from '../../models'

export enum AnnouncementTypeActionTypes {
  LoadAnnouncementTypes = '[AnnouncementType] Load AnnouncementTypes',
  AddAnnouncementType = '[AnnouncementType] Add AnnouncementType',
  UpsertAnnouncementType = '[AnnouncementType] Upsert AnnouncementType',
  AddAnnouncementTypes = '[AnnouncementType] Add AnnouncementTypes',
  UpsertAnnouncementTypes = '[AnnouncementType] Upsert AnnouncementTypes',
  UpdateAnnouncementType = '[AnnouncementType] Update AnnouncementType',
  UpdateAnnouncementTypes = '[AnnouncementType] Update AnnouncementTypes',
  DeleteAnnouncementType = '[AnnouncementType] Delete AnnouncementType',
  DeleteAnnouncementTypes = '[AnnouncementType] Delete AnnouncementTypes',
  ClearAnnouncementTypes = '[AnnouncementType] Clear AnnouncementTypes',

  SetCurrentAnnouncementType = '[AnnouncementType] Set Current AnnouncementType',
  GetAnnouncementTypes = '[AnnouncementType] Get AnnouncementTypes',
  GetAllAnnouncementTypes = '[AnnouncementType] Get All AnnouncementTypes',
  AnnouncementTypesActionFailure = '[AnnouncementType] AnnouncementTypes Action Failure',
}

export class LoadAnnouncementTypes implements Action {
  readonly type = AnnouncementTypeActionTypes.LoadAnnouncementTypes

  constructor(public payload: DataResult<AnnouncementTypesResult>) {}
}

export class AddAnnouncementType implements Action {
  readonly type = AnnouncementTypeActionTypes.AddAnnouncementType

  constructor(public payload: { announcementType: AnnouncementType }) {}
}

export class UpsertAnnouncementType implements Action {
  readonly type = AnnouncementTypeActionTypes.UpsertAnnouncementType

  constructor(public payload: { announcementType: AnnouncementType }) {}
}

export class AddAnnouncementTypes implements Action {
  readonly type = AnnouncementTypeActionTypes.AddAnnouncementTypes

  constructor(public payload: { announcementTypes: AnnouncementType[] }) {}
}

export class UpsertAnnouncementTypes implements Action {
  readonly type = AnnouncementTypeActionTypes.UpsertAnnouncementTypes

  constructor(public payload: { announcementTypes: AnnouncementType[] }) {}
}

export class UpdateAnnouncementType implements Action {
  readonly type = AnnouncementTypeActionTypes.UpdateAnnouncementType

  constructor(public payload: { announcementType: Update<AnnouncementType> }) {}
}

export class UpdateAnnouncementTypes implements Action {
  readonly type = AnnouncementTypeActionTypes.UpdateAnnouncementTypes

  constructor(public payload: { announcementTypes: Update<AnnouncementType>[] }) {}
}

export class DeleteAnnouncementType implements Action {
  readonly type = AnnouncementTypeActionTypes.DeleteAnnouncementType

  constructor(public payload: { id: string }) {}
}

export class DeleteAnnouncementTypes implements Action {
  readonly type = AnnouncementTypeActionTypes.DeleteAnnouncementTypes

  constructor(public payload: { ids: string[] }) {}
}

export class ClearAnnouncementTypes implements Action {
  readonly type = AnnouncementTypeActionTypes.ClearAnnouncementTypes
}

export class SetCurrentAnnouncementType implements Action {
  readonly type = AnnouncementTypeActionTypes.SetCurrentAnnouncementType
  constructor(public payload: { id: number }) {}
}
export class GetAnnouncementTypes implements Action {
  readonly type = AnnouncementTypeActionTypes.GetAnnouncementTypes
  constructor(public payload: { ids: number[] }) {}
}

export class GetAllAnnouncementTypes implements Action {
  readonly type = AnnouncementTypeActionTypes.GetAllAnnouncementTypes
  constructor(public payload?: { filter?: any }) {}
}

export class AnnouncementTypesActionFailure implements Action {
  readonly type = AnnouncementTypeActionTypes.AnnouncementTypesActionFailure

  constructor(public payload: any) {
  }
}

export type AnnouncementTypeActions =
 LoadAnnouncementTypes
 | AddAnnouncementType
 | UpsertAnnouncementType
 | AddAnnouncementTypes
 | UpsertAnnouncementTypes
 | UpdateAnnouncementType
 | UpdateAnnouncementTypes
 | DeleteAnnouncementType
 | DeleteAnnouncementTypes
 | ClearAnnouncementTypes
 | SetCurrentAnnouncementType
 | GetAllAnnouncementTypes
 | GetAnnouncementTypes
 | AnnouncementTypesActionFailure
