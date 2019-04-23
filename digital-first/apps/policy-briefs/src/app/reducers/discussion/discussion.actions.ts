import { Action } from '@ngrx/store';

export enum DiscussionActionTypes {
  LoadDiscussions = '[Discussion] Load Discussions',
  
  
}

export class LoadDiscussions implements Action {
  readonly type = DiscussionActionTypes.LoadDiscussions;
}


export type DiscussionActions = LoadDiscussions;
