import { Action } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { Party } from './party.model'
import { DataResult, PartysResult } from '../../models'

export enum PartyActionTypes {
  LoadPartys = '[Party] Load Partys',
  AddParty = '[Party] Add Party',
  UpsertParty = '[Party] Upsert Party',
  AddPartys = '[Party] Add Partys',
  UpsertPartys = '[Party] Upsert Partys',
  UpdateParty = '[Party] Update Party',
  UpdatePartys = '[Party] Update Partys',
  DeleteParty = '[Party] Delete Party',
  DeletePartys = '[Party] Delete Partys',
  ClearPartys = '[Party] Clear Partys',

  SetCurrentParty = '[Party] Set Current Party',
  GetPartys = '[Party] Get Partys',
  GetAllPartys = '[Party] Get All Partys',
  PartysActionFailure = '[Party] Partys Action Failure',
}

export class LoadPartys implements Action {
  readonly type = PartyActionTypes.LoadPartys

  constructor(public payload: DataResult<PartysResult>) {}
}

export class AddParty implements Action {
  readonly type = PartyActionTypes.AddParty

  constructor(public payload: { party: Party }) {}
}

export class UpsertParty implements Action {
  readonly type = PartyActionTypes.UpsertParty

  constructor(public payload: { party: Party }) {}
}

export class AddPartys implements Action {
  readonly type = PartyActionTypes.AddPartys

  constructor(public payload: { partys: Party[] }) {}
}

export class UpsertPartys implements Action {
  readonly type = PartyActionTypes.UpsertPartys

  constructor(public payload: { partys: Party[] }) {}
}

export class UpdateParty implements Action {
  readonly type = PartyActionTypes.UpdateParty

  constructor(public payload: { party: Update<Party> }) {}
}

export class UpdatePartys implements Action {
  readonly type = PartyActionTypes.UpdatePartys

  constructor(public payload: { partys: Update<Party>[] }) {}
}

export class DeleteParty implements Action {
  readonly type = PartyActionTypes.DeleteParty

  constructor(public payload: { id: string }) {}
}

export class DeletePartys implements Action {
  readonly type = PartyActionTypes.DeletePartys

  constructor(public payload: { ids: string[] }) {}
}

export class ClearPartys implements Action {
  readonly type = PartyActionTypes.ClearPartys
}

export class SetCurrentParty implements Action {
  readonly type = PartyActionTypes.SetCurrentParty
  constructor(public payload: { id: number }) {}
}
export class GetPartys implements Action {
  readonly type = PartyActionTypes.GetPartys
  constructor(public payload: { ids: number[] }) {}
}

export class GetAllPartys implements Action {
  readonly type = PartyActionTypes.GetAllPartys
  constructor(public payload?: { filter?: any }) {}
}

export class PartysActionFailure implements Action {
  readonly type = PartyActionTypes.PartysActionFailure

  constructor(public payload: any) {
  }
}
export type PartyActions =
 LoadPartys
 | AddParty
 | UpsertParty
 | AddPartys
 | UpsertPartys
 | UpdateParty
 | UpdatePartys
 | DeleteParty
 | DeletePartys
 | ClearPartys
 | SetCurrentParty
 | GetAllPartys
 | GetPartys
 | PartysActionFailure