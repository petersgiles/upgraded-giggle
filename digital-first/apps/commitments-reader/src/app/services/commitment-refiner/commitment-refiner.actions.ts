export abstract class RefinerAction {
  type: string
  payload: any
}

export enum RefinerActionTypes {
  GetRefinerGroups = '[RefinerActionTypes] GetRefinerGroups',
  LoadRefinerGroups = '[RefinerActionTypes] LoadRefinerGroups',
  GetRefinedMapPoints = '[RefinerActionTypes] GetRefinedMapPoints',
  LoadRefinedMapPoints = '[RefinerActionTypes] LoadRefinedMapPoints',
  GetRefinedCommitments = '[RefinerActionTypes] GetRefinedCommitments',
  LoadRefinedCommitments = '[RefinerActionTypes] LoadRefinedCommitments',
  SelectRefinerGroup = '[RefinerActionTypes] SelectRefinerGroup',
  SelectRefiner = '[RefinerActionTypes] SelectRefiner'
}

export class GetRefinedMapPoints implements RefinerAction {
  type = RefinerActionTypes.GetRefinedMapPoints
  constructor(public payload: any) {}
}

export class LoadRefinedMapPoints implements RefinerAction {
  type = RefinerActionTypes.LoadRefinedMapPoints
  constructor(public payload: any) {}
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
    constructor(public payload: any) {}
  }

export class LoadRefinedCommitments implements RefinerAction {
    type = RefinerActionTypes.LoadRefinedCommitments
    constructor(public payload: any) {}
  }

export class SelectRefinerGroup implements RefinerAction {
  type = RefinerActionTypes.SelectRefinerGroup
  constructor(public payload: any) {}
}

export class SelectRefiner implements RefinerAction {
  type = RefinerActionTypes.SelectRefiner
  constructor(public payload: any) {}
}

export type RefinerServiceActions =
  | GetRefinerGroups
  | LoadRefinerGroups
  | GetRefinedCommitments
  | LoadRefinedCommitments
  | GetRefinedMapPoints
  | LoadRefinedMapPoints
  | SelectRefinerGroup
  | SelectRefiner
