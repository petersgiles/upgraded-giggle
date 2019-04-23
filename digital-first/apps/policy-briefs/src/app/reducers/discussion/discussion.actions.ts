import { Action } from '@ngrx/store'

export enum DiscussionActionTypes {
  GetDiscussion = '[Discussion] Get Discussion',
  GetDiscussionFailure = '[Navigation] Get Discussion Failure',
  LoadDiscussions = '[Discussion] Load Discussions'
}

export class LoadDiscussions implements Action {
  readonly type = DiscussionActionTypes.LoadDiscussions
  constructor(public payload: { data: any[]; loading: boolean }) {}
}

export class GetDiscussion implements Action {
  readonly type = DiscussionActionTypes.GetDiscussion
  constructor(public payload: { briefId: any }) {}
}

export class GetDiscussionFailure implements Action {
  readonly type = DiscussionActionTypes.GetDiscussionFailure
  constructor(public payload: any) {}
}

export type DiscussionActions =
  | LoadDiscussions
  | GetDiscussion
  | GetDiscussionFailure
