import { CommitmentRefinerGraph } from '../../generated/graphql'

export abstract class RefinerAction {
  type: string
  payload: any
}

export enum RefinerActionTypes {
  GetRefinerGroups = '[RefinerActionTypes] GetRefinerGroups',
  LoadRefinerGroups = '[RefinerActionTypes] LoadRefinerGroups',
  GetCommitmentMapPointSearch = '[RefinerActionTypes] GetCommitmentMapPointSearch',
  LoadRefinedMapPoints = '[RefinerActionTypes] LoadRefinedMapPoints',
  GetRefinedCommitments = '[RefinerActionTypes] GetRefinedCommitments',
  LoadRefinedCommitments = '[RefinerActionTypes] LoadRefinedCommitments',
  GetCommitmentMapPointAll = '[RefinerActionTypes] GetCommitmentMapPointAll',
  LoadMapPointsCommitments = '[RefinerActionTypes] LoadMapPointsCommitments',
  SelectRefinerGroup = '[RefinerActionTypes] SelectRefinerGroup',
  SelectRefiner = '[RefinerActionTypes] SelectRefiner',
  SelectMapPoint = '[RefinerActionTypes] SelectMapPoint'
}

export class GetCommitmentMapPointSearch implements RefinerAction {
  type = RefinerActionTypes.GetCommitmentMapPointSearch
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

  constructor(public payload: CommitmentRefinerGraph) {}
}

export class LoadRefinedCommitments implements RefinerAction {
  type = RefinerActionTypes.LoadRefinedCommitments
  constructor(public payload: any) {}
}

export class GetCommitmentMapPointAll implements RefinerAction {
  type = RefinerActionTypes.GetCommitmentMapPointAll
  constructor(public payload: any) {}
}

export class LoadMapPointsCommitments implements RefinerAction {
  type = RefinerActionTypes.LoadMapPointsCommitments
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
export class SelectMapPoint implements RefinerAction {
  type = RefinerActionTypes.SelectMapPoint
  constructor(public payload: any) {}
}

export type RefinerServiceActions =
  | GetRefinerGroups
  | LoadRefinerGroups
  | GetRefinedCommitments
  | LoadRefinedCommitments
  | GetCommitmentMapPointSearch
  | LoadRefinedMapPoints
  | SelectRefinerGroup
  | SelectRefiner
  | SelectMapPoint
  | GetCommitmentMapPointAll
  | LoadMapPointsCommitments
