import { Action } from '@ngrx/store'

export enum RefinerActionTypes {
  GetRefinerGroups = '[RefinerActionTypes] GetRefinerGroups',
  LoadRefinerGroups = '[RefinerActionTypes] LoadRefinerGroups',
  GetRefinersFailure = '[RefinerActionTypes] GetRefinersFailure',

  SelectRefinerGroup = '[RefinerActionTypes] SelectRefinerGroup',
  SelectRefiner = '[RefinerActionTypes] SelectRefiner',
  SearchCommitments = '[RefinerActionTypes] SearchCommitments',
  SetRefinerFromQueryString = '[RefinerActionTypes] SetRefinerFromQueryString',
  ClearRefiners = '[RefinerActionTypes] ClearRefiners',
  ChangeTextRefiner = '[RefinerActionTypes] ChangeTextRefiner',

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
  constructor(public payload: {refiner: {id: string, group: string}[]}) {}
}

export class GetRefinersFailure implements Action {
  type = RefinerActionTypes.GetRefinersFailure
  constructor(public payload: any) {}
}

export type RefinerActions =
    GetRefinerGroups
  | LoadRefinerGroups
  | SelectRefinerGroup
  | SelectRefiner
  | SearchCommitments
  | ChangeTextRefiner
  | GetRefinersFailure
  | ClearRefiners
  | SetRefinerFromQueryString
