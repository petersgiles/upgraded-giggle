import { Action } from '@ngrx/store';

export enum OverviewActionTypes {
  LoadOverviews = '[Overview] Load Overviews',
  
  
}

export class LoadOverviews implements Action {
  readonly type = OverviewActionTypes.LoadOverviews;
}


export type OverviewActions = LoadOverviews;
