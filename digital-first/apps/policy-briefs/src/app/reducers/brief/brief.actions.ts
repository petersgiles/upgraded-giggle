import { Action } from '@ngrx/store';

export enum BriefActionTypes {
  LoadBriefs = '[Brief] Load Briefs',
  
  
}

export class LoadBriefs implements Action {
  readonly type = BriefActionTypes.LoadBriefs;
}


export type BriefActions = LoadBriefs;
