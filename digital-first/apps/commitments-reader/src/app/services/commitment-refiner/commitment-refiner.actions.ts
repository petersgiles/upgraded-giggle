import { CommitmentRefinerGraph } from '../../generated/graphql'

export abstract class RefinerAction {
  type: string
  payload: any
}

export enum RefinerActionTypes {
  GetRefinerGroups = '[RefinerActionTypes] GetRefinerGroups',
  LoadRefinerGroups = '[RefinerActionTypes] LoadRefinerGroups',
  GetRefinedCommitments = '[RefinerActionTypes] GetRefinedCommitments',
  LoadRefinedCommitments = '[RefinerActionTypes] LoadRefinedCommitments',
  SelectRefinerGroup = '[RefinerActionTypes] SelectRefinerGroup',
  SelectRefiner = '[RefinerActionTypes] SelectRefiner',
  SearchCommitments = '[RefinerActionTypes] SearchCommitments',
  ChangeTextRefiner = '[RefinerActionTypes] ChangeTextRefiner',
  GetMapPoints = '[RefinerActionTypes] GetMapPoints'
}

export class GetMapPoints implements RefinerAction {
  type = RefinerActionTypes.GetMapPoints
  constructor(public payload: CommitmentRefinerGraph) {}
}

export class GetRefinerGroups implements RefinerAction {
  type = RefinerActionTypes.GetRefinerGroups
  constructor(public payload: any) {}
}

export class LoadRefinerGroups implements RefinerAction {
  type = RefinerActionTypes.LoadRefinerGroups
  constructor(public payload: any) {}
}
export class GetRefinedCommitments implements RefinerAction {
  type = RefinerActionTypes.GetRefinedCommitments

  constructor(public payload: CommitmentRefinerGraph) {}
}

export class LoadRefinedCommitments implements RefinerAction {
  type = RefinerActionTypes.LoadRefinedCommitments
  constructor(public payload: any) {}
}

export class SelectRefinerGroup implements RefinerAction {
  type = RefinerActionTypes.SelectRefinerGroup
  constructor(public payload: any) {}
}

export class SearchCommitments implements RefinerAction {
  type = RefinerActionTypes.SearchCommitments
  constructor(public payload: any) {}
}

export class SelectRefiner implements RefinerAction {
  type = RefinerActionTypes.SelectRefiner
  constructor(public payload: any) {}
}

export class ChangeTextRefiner implements RefinerAction {
  type = RefinerActionTypes.ChangeTextRefiner
  constructor(public payload: string) {}
}

export type RefinerServiceActions =
  | GetRefinerGroups
  | LoadRefinerGroups
  | GetRefinedCommitments
  | LoadRefinedCommitments
  | SelectRefinerGroup
  | SelectRefiner
  | ChangeTextRefiner
  | SearchCommitments
  | GetMapPoints
