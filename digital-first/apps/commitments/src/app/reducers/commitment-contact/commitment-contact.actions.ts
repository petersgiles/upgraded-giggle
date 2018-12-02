import { Action } from '@ngrx/store'

export enum CommitmentContactActionTypes {
  ExpandPanel = '[CommitmentContact] Expand Panel',
  CollapsePanel = '[CommitmentContact] Collapse Panel',
}

export class CollapsePanel implements Action {
  readonly type = CommitmentContactActionTypes.CollapsePanel
}

export class ExpandPanel implements Action {
  readonly type = CommitmentContactActionTypes.ExpandPanel
}

export type CommitmentContactActions =
    CollapsePanel
  | ExpandPanel
