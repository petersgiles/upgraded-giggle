import { Action } from '@ngrx/store'

export enum DiscussionActionTypes {
  GetDiscussion = '[Discussion] Get Discussion',
  GetDiscussionFailure = '[Navigation] Get Discussion Failure',
  LoadDiscussions = '[Discussion] Load Discussions',
  AddComment = '[Discussion] Add Comment',
  ReplyToComment = '[Discussion] Reply To Comment',
  RemoveComment = '[Discussion] Remove Comment'
}

export class LoadDiscussions implements Action {
  readonly type = DiscussionActionTypes.LoadDiscussions
  constructor(public payload: { data: any[]; loading: boolean }) {}
}

export class GetDiscussion implements Action {
  readonly type = DiscussionActionTypes.GetDiscussion
  constructor(public payload: { activeBriefId: string }) {}
}

export class GetDiscussionFailure implements Action {
  readonly type = DiscussionActionTypes.GetDiscussionFailure
  constructor(public payload: any) {}
}

export class AddComment implements Action {
  readonly type = DiscussionActionTypes.AddComment
  constructor(public payload: any) {}
}

export class ReplyToComment implements Action {
  readonly type = DiscussionActionTypes.ReplyToComment
  constructor(public payload: { activeComment: string }) {}
}

export class RemoveComment implements Action {
  readonly type = DiscussionActionTypes.RemoveComment
  constructor(public payload: any) {}
}

export type DiscussionActions =
  | LoadDiscussions
  | GetDiscussion
  | GetDiscussionFailure
  | AddComment
  | ReplyToComment
  | RemoveComment
