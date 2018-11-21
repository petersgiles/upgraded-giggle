import { Action } from '@ngrx/store'
import { Update } from '@ngrx/entity'
import { CriticalDate } from './critical-date.model'
import { DataResult, CriticalDatesResult } from '../../models'

export enum CriticalDateActionTypes {
  LoadCriticalDates = '[CriticalDate] Load CriticalDates',
  AddCriticalDate = '[CriticalDate] Add CriticalDate',
  UpsertCriticalDate = '[CriticalDate] Upsert CriticalDate',
  AddCriticalDates = '[CriticalDate] Add CriticalDates',
  UpsertCriticalDates = '[CriticalDate] Upsert CriticalDates',
  UpdateCriticalDate = '[CriticalDate] Update CriticalDate',
  UpdateCriticalDates = '[CriticalDate] Update CriticalDates',
  DeleteCriticalDate = '[CriticalDate] Delete CriticalDate',
  DeleteCriticalDates = '[CriticalDate] Delete CriticalDates',
  ClearCriticalDates = '[CriticalDate] Clear CriticalDates',

  SetCurrentCriticalDate = '[CriticalDate] Set Current CriticalDate',
  GetCriticalDates = '[CriticalDate] Get CriticalDates',
  GetAllCriticalDates = '[CriticalDate] Get All CriticalDates',
  CriticalDatesActionFailure = '[CriticalDate] CriticalDates Action Failure',
}

export class LoadCriticalDates implements Action {
  readonly type = CriticalDateActionTypes.LoadCriticalDates

  constructor(public payload: DataResult<CriticalDatesResult>) {}
}

export class AddCriticalDate implements Action {
  readonly type = CriticalDateActionTypes.AddCriticalDate

  constructor(public payload: { announcementType: CriticalDate }) {}
}

export class UpsertCriticalDate implements Action {
  readonly type = CriticalDateActionTypes.UpsertCriticalDate

  constructor(public payload: { announcementType: CriticalDate }) {}
}

export class AddCriticalDates implements Action {
  readonly type = CriticalDateActionTypes.AddCriticalDates

  constructor(public payload: { announcementTypes: CriticalDate[] }) {}
}

export class UpsertCriticalDates implements Action {
  readonly type = CriticalDateActionTypes.UpsertCriticalDates

  constructor(public payload: { announcementTypes: CriticalDate[] }) {}
}

export class UpdateCriticalDate implements Action {
  readonly type = CriticalDateActionTypes.UpdateCriticalDate

  constructor(public payload: { announcementType: Update<CriticalDate> }) {}
}

export class UpdateCriticalDates implements Action {
  readonly type = CriticalDateActionTypes.UpdateCriticalDates

  constructor(public payload: { announcementTypes: Update<CriticalDate>[] }) {}
}

export class DeleteCriticalDate implements Action {
  readonly type = CriticalDateActionTypes.DeleteCriticalDate

  constructor(public payload: { id: string }) {}
}

export class DeleteCriticalDates implements Action {
  readonly type = CriticalDateActionTypes.DeleteCriticalDates

  constructor(public payload: { ids: string[] }) {}
}

export class ClearCriticalDates implements Action {
  readonly type = CriticalDateActionTypes.ClearCriticalDates
}

export class SetCurrentCriticalDate implements Action {
  readonly type = CriticalDateActionTypes.SetCurrentCriticalDate
  constructor(public payload: { id: number }) {}
}
export class GetCriticalDates implements Action {
  readonly type = CriticalDateActionTypes.GetCriticalDates
  constructor(public payload: { ids: number[] }) {}
}

export class GetAllCriticalDates implements Action {
  readonly type = CriticalDateActionTypes.GetAllCriticalDates
  constructor(public payload?: { filter?: any }) {}
}

export class CriticalDatesActionFailure implements Action {
  readonly type = CriticalDateActionTypes.CriticalDatesActionFailure

  constructor(public payload: any) {
  }
}

export type CriticalDateActions =
 LoadCriticalDates
 | AddCriticalDate
 | UpsertCriticalDate
 | AddCriticalDates
 | UpsertCriticalDates
 | UpdateCriticalDate
 | UpdateCriticalDates
 | DeleteCriticalDate
 | DeleteCriticalDates
 | ClearCriticalDates
 | SetCurrentCriticalDate
 | GetAllCriticalDates
 | GetCriticalDates
 | CriticalDatesActionFailure
