import { Action } from '@ngrx/store'
import { DataResult, CommentsResult } from '../../models'

export enum CommitmentDiscussionActionTypes {
  ExpandPanel = '[CommitmentDiscussion] Expand Panel',
  CollapsePanel = '[CommitmentDiscussion] Collapse Panel',
  ChangeTimeFormat = '[CommitmentDiscussion] Change Time Format',
  LoadComments = '[CommitmentDiscussion] Load Comments',
  ClearComments = '[CommitmentDiscussion] Clear Comments',
  GetCommentsByCommitment = '[CommitmentDiscussion] Get Comments By Commitment',
  CommentActionFailure = '[CommitmentDiscussion] Comment Action Failure',
  StoreComment = '[CommitmentDiscussion] Store Comment',
  RemoveComment = '[CommitmentDiscussion] Remove Comment',
}

export class ChangeTimeFormat implements Action {
  readonly type = CommitmentDiscussionActionTypes.ChangeTimeFormat

  constructor(public payload: 'dateFormat' | 'timeAgo' | 'calendar') { }
}

export class CollapsePanel implements Action {
  readonly type = CommitmentDiscussionActionTypes.CollapsePanel
}

export class ExpandPanel implements Action {
  readonly type = CommitmentDiscussionActionTypes.ExpandPanel
}

export class LoadComments implements Action {
  readonly type = CommitmentDiscussionActionTypes.LoadComments

  constructor(public payload: DataResult<CommentsResult>) {}
}

export class ClearComments implements Action {
  readonly type = CommitmentDiscussionActionTypes.ClearComments
}

export class GetCommentsByCommitment implements Action {
  readonly type = CommitmentDiscussionActionTypes.GetCommentsByCommitment
  constructor(public payload: { commitment: number }) {}
}

export class StoreComment implements Action {
  readonly type = CommitmentDiscussionActionTypes.StoreComment

  constructor(public payload: { commitment: any; parent: any; comment: any; }) {}
}

export class RemoveComment implements Action {
  readonly type = CommitmentDiscussionActionTypes.RemoveComment

  constructor(public payload: {id: number}) {}
}

export class CommentActionFailure implements Action {
  readonly type = CommitmentDiscussionActionTypes.CommentActionFailure

  constructor(public payload: any) {
  }
}

export type CommitmentDiscussionActions =
    CollapsePanel
  | ExpandPanel
  | LoadComments
  | ChangeTimeFormat
  | ClearComments
  | GetCommentsByCommitment
  | CommentActionFailure
  | StoreComment
  | RemoveComment