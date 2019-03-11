import { Action } from '@ngrx/store'

export enum CommitmentThemeActionTypes {
  ExpandPanel = '[CommitmentTheme] Expand Panel',
  CollapsePanel = '[CommitmentTheme] Collapse Panel',
  ClearCommitmentTheme = '[CommitmentTheme] Clear Commitment Theme',
  LoadCommitmentThemes = '[CommitmentTheme] Load Commitment Themes',
  GetThemesByCommitment = '[CommitmentTheme] Get Theme By Commitment',
  AddThemeToCommitment = '[CommitmentTheme] Add Theme To Commitment',
  RemoveThemeFromCommitment = '[CommitmentTheme] Remove Theme To Commitment',
  CommitmentThemeActionFailure = '[CommitmentTheme] Commitment Theme Action Failure',
}

export class CollapsePanel implements Action {
  readonly type = CommitmentThemeActionTypes.CollapsePanel
}

export class ExpandPanel implements Action {
  readonly type = CommitmentThemeActionTypes.ExpandPanel
}

export class AddThemeToCommitment implements Action {
  readonly type = CommitmentThemeActionTypes.AddThemeToCommitment
  constructor(public payload: { commitment: any, theme: any }) { }
}

export class RemoveThemeFromCommitment implements Action {
  readonly type = CommitmentThemeActionTypes.RemoveThemeFromCommitment
  constructor(public payload: { commitment: any, theme: any }) { }
}

export class CommitmentThemeActionFailure implements Action {
  readonly type = CommitmentThemeActionTypes.CommitmentThemeActionFailure
  constructor(public payload: any) { }
}

export class GetThemesByCommitment implements Action {
  readonly type = CommitmentThemeActionTypes.GetThemesByCommitment
  constructor(public payload: { commitment: any }) { }
}

export class LoadCommitmentThemes implements Action {
  readonly type = CommitmentThemeActionTypes.LoadCommitmentThemes
  constructor(public payload: { themes: any[] }) { }
}

export class ClearCommitmentTheme implements Action {
  readonly type = CommitmentThemeActionTypes.ClearCommitmentTheme
}

export type CommitmentThemeActions =
    CollapsePanel
  | ExpandPanel
  | GetThemesByCommitment
  | AddThemeToCommitment
  | RemoveThemeFromCommitment
  | CommitmentThemeActionFailure
  | ClearCommitmentTheme
  | LoadCommitmentThemes
