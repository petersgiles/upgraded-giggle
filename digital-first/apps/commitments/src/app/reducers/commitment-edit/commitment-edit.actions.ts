import { Action } from '@ngrx/store'

export enum CommitmentEditActionTypes {
  ExpandPanel = '[CommitmentEdit] Expand Panel',
  CollapsePanel = '[CommitmentEdit] Collapse Panel',
  ChangeTimeFormat = '[CommitmentEdit] Change Time Format',
}

export class ChangeTimeFormat implements Action {
  readonly type = CommitmentEditActionTypes.ChangeTimeFormat

  constructor(public payload: 'dateFormat' | 'timeAgo' | 'calendar') { }
}

export class CollapsePanel implements Action {
  readonly type = CommitmentEditActionTypes.CollapsePanel

  constructor(public payload: number | string) { }
}

export class ExpandPanel implements Action {
  readonly type = CommitmentEditActionTypes.ExpandPanel

  constructor(public payload: number | string) { }
}

export type CommitmentEditActions =
    CollapsePanel
  | ExpandPanel
  | ChangeTimeFormat
