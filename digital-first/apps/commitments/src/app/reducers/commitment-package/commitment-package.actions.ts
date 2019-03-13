import { Action } from '@ngrx/store'

export enum CommitmentPackageActionTypes {
  ExpandPanel = '[CommitmentPackage] Expand Panel',
  CollapsePanel = '[CommitmentPackage] Collapse Panel',
  ClearCommitmentPackages = '[CommitmentPackage] Clear Commitment Packages',
  LoadCommitmentPackages = '[CommitmentPackage] Load Commitment Packages',
  GetPackagesByCommitment = '[CommitmentPackage] Get Packages By Commitment',
  AddPackageToCommitment = '[CommitmentPackage] Add Package To Commitment',
  RemovePackageFromCommitment = '[CommitmentPackage] Remove Package To Commitment',
  CommitmentPackageActionFailure = '[CommitmentPackage] Commitment Package Action Failure',
}

export class CollapsePanel implements Action {
  readonly type = CommitmentPackageActionTypes.CollapsePanel
}

export class ExpandPanel implements Action {
  readonly type = CommitmentPackageActionTypes.ExpandPanel
}

export class AddPackageToCommitment implements Action {
  readonly type = CommitmentPackageActionTypes.AddPackageToCommitment
  constructor(public payload: { commitment: any, mypackage: any }) { }
}

export class RemovePackageFromCommitment implements Action {
  readonly type = CommitmentPackageActionTypes.RemovePackageFromCommitment
  constructor(public payload: { commitment: any, mypackage: any }) { }
}

export class CommitmentPackageActionFailure implements Action {
  readonly type = CommitmentPackageActionTypes.CommitmentPackageActionFailure
  constructor(public payload: any) { }
}

export class GetPackagesByCommitment implements Action {
  readonly type = CommitmentPackageActionTypes.GetPackagesByCommitment
  constructor(public payload: { commitment: any }) { }
}

export class LoadCommitmentPackages implements Action {
  readonly type = CommitmentPackageActionTypes.LoadCommitmentPackages
  constructor(public payload: { packages: any[] }) { }
}

export class ClearCommitmentPackages implements Action {
  readonly type = CommitmentPackageActionTypes.ClearCommitmentPackages
}

export type CommitmentPackageActions =
    CollapsePanel
  | ExpandPanel
  | GetPackagesByCommitment
  | AddPackageToCommitment
  | RemovePackageFromCommitment
  | CommitmentPackageActionFailure
  | ClearCommitmentPackages
  | LoadCommitmentPackages
