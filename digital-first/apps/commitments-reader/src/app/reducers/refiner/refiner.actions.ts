import { Action } from '@ngrx/store'

export enum RefinerActionTypes {
  GetRefinerGroups = '[RefinerActionTypes] GetRefinerGroups',
  LoadRefinerGroups = '[RefinerActionTypes] LoadRefinerGroups',
  GetRefinersFailure = '[RefinerActionTypes] GetRefinersFailure',

  SelectRefinerGroup = '[RefinerActionTypes] SelectRefinerGroup',
  SelectRefiner = '[RefinerActionTypes] SelectRefiner',
  SelectElectorates = '[RefinerActionTypes] SelectRefiner]',
  SearchCommitments = '[RefinerActionTypes] SearchCommitments',
  SetRefinerFromQueryString = '[RefinerActionTypes] SetRefinerFromQueryString',
  ClearRefiners = '[RefinerActionTypes] ClearRefiners',
  ChangeTextRefiner = '[RefinerActionTypes] ChangeTextRefiner',
  RemoveSelectedGroup = '[RefinerActionTypes] RemoveSelectedGroup',
  RemoveSelectedRefiner = '[RefinerActionTypes] RemoveSelectedRefiner',

  ToggleRefinerDrawer = '[RefinerActionTypes] ToggleRefinerDrawer'
}

export class ClearRefiners implements Action {
  type = RefinerActionTypes.ClearRefiners
  constructor(public payload: any) {}
}

export class SelectRefinerGroup implements Action {
  type = RefinerActionTypes.SelectRefinerGroup
  constructor(public payload: any) {}
}

export class SearchCommitments implements Action {
  type = RefinerActionTypes.SearchCommitments
  constructor(public payload: any) {}
}

export class SelectRefiner implements Action {
  type = RefinerActionTypes.SelectRefiner
  constructor(public payload: any) {}
}
export class SelectElectorates implements Action {
  type = RefinerActionTypes.SelectElectorates
  constructor(public payload: any) {}
}

export class ChangeTextRefiner implements Action {
  type = RefinerActionTypes.ChangeTextRefiner
  constructor(public payload: string) {}
}

export class GetRefinerGroups implements Action {
  type = RefinerActionTypes.GetRefinerGroups
  constructor(public payload: any) {}
}

export class LoadRefinerGroups implements Action {
  type = RefinerActionTypes.LoadRefinerGroups
  constructor(public payload: any) {}
}

export class SetRefinerFromQueryString implements Action {
  type = RefinerActionTypes.SetRefinerFromQueryString
  constructor(
    public payload: { refiner: { id: string; group: string }[]; text?: string }
  ) {}
}

export class GetRefinersFailure implements Action {
  type = RefinerActionTypes.GetRefinersFailure
  constructor(public payload: any) {}
}

export class RemoveSelectedGroup implements Action {
  type = RefinerActionTypes.RemoveSelectedGroup
  constructor(public payload: any) {}
}

export class RemoveSelectedRefiner implements Action {
  type = RefinerActionTypes.RemoveSelectedRefiner
  constructor(public payload: any) {}
}

export class ToggleRefinerDrawer implements Action {
  type = RefinerActionTypes.ToggleRefinerDrawer
  constructor(public payload: any) {}
}

export type RefinerActions =
  | GetRefinerGroups
  | LoadRefinerGroups
  | SelectRefinerGroup
  | SelectRefiner
  | SelectElectorates
  | SearchCommitments
  | ChangeTextRefiner
  | GetRefinersFailure
  | ClearRefiners
  | SetRefinerFromQueryString
  | RemoveSelectedRefiner
  | RemoveSelectedGroup
