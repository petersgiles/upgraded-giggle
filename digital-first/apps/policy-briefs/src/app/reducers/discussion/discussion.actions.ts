import { Action } from '@ngrx/store'
import { DiscussionType } from '../../models';


export enum DiscussionActionTypes {
  SetActiveDiscussionChannel = '[Discussion] Get SetActiveDiscussionChannel',
  GetDiscussion = '[Discussion] Get Discussion',
  GetDiscussionFailure = '[Discussion] Get Discussion Failure',
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
  constructor(public payload: { activeBriefId: string , channel?: DiscussionType }) {}
}

export class GetDiscussionFailure implements Action {
  readonly type = DiscussionActionTypes.GetDiscussionFailure
  constructor(public payload: any) {}
}

export class AddComment implements Action {
  readonly type = DiscussionActionTypes.AddComment
  constructor(public payload: {
    brief: any,
    text: any,
    parent: any,
    channel: DiscussionType
  }) {}
}

export class ReplyToComment implements Action {
  readonly type = DiscussionActionTypes.ReplyToComment
  constructor(public payload: { activeComment: string }) {}
}

export class RemoveComment implements Action {
  readonly type = DiscussionActionTypes.RemoveComment
  constructor(public payload: { id: string, brief: string}) {}
}

export class SetActiveDiscussionChannel implements Action {
  readonly type = DiscussionActionTypes.SetActiveDiscussionChannel
  constructor(public payload: DiscussionType) {}
}

export type DiscussionActions =
  | LoadDiscussions
  | GetDiscussion
  | GetDiscussionFailure
  | AddComment
  | ReplyToComment
  | RemoveComment
  | SetActiveDiscussionChannel
