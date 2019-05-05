import { Action } from '@ngrx/store'

export enum RefinerActionTypes {
  GetRefinerGroups = '[RefinerActionTypes] GetRefinerGroups',
  LoadRefinerGroups = '[RefinerActionTypes] LoadRefinerGroups',
  GetRefinersFailure = '[RefinerActionTypes] GetRefinersFailure',

  SelectRefinerGroup = '[RefinerActionTypes] SelectRefinerGroup',
  SelectRefiner = '[RefinerActionTypes] SelectRefiner',
  SearchCommitments = '[RefinerActionTypes] SearchCommitments',
  ChangeTextRefiner = '[RefinerActionTypes] ChangeTextRefiner',
  GetRefinedCommitments = '[RefinerActionTypes] GetRefinedCommitments',
  LoadRefinedCommitments = '[RefinerActionTypes] LoadRefinedCommitments'
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

export class GetRefinedCommitments implements Action {
  type = RefinerActionTypes.GetRefinedCommitments

  constructor(public payload: any) {}
}

export class LoadRefinedCommitments implements Action {
  type = RefinerActionTypes.LoadRefinedCommitments
  constructor(public payload: any) {}
}

export class GetRefinersFailure implements Action {
  type = RefinerActionTypes.GetRefinersFailure
  constructor(public payload: any) {}
}
export type RefinerActions =
    GetRefinerGroups
  | LoadRefinerGroups
  | GetRefinedCommitments
  | LoadRefinedCommitments
  | SelectRefinerGroup
  | SelectRefiner
  | SearchCommitments
  | ChangeTextRefiner
  | GetRefinersFailure
