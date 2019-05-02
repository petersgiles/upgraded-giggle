import { Action } from '@ngrx/store';

export enum OverviewActionTypes {
  LoadOverviews = '[Overview] Load Overviews',
  

  
  GetRefinedCommitments = '[RefinerActionTypes] GetRefinedCommitments',
  LoadRefinedCommitments = '[RefinerActionTypes] LoadRefinedCommitments',
  
}

export class LoadOverviews implements Action {
  readonly type = OverviewActionTypes.LoadOverviews;
}


export type OverviewActions = LoadOverviews;
