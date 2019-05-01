import { Action } from '@ngrx/store';

export enum RefinerActionTypes {
  LoadRefiners = '[Refiner] Load Refiners',
  
  
}

export class LoadRefiners implements Action {
  readonly type = RefinerActionTypes.LoadRefiners;
}


export type RefinerActions = LoadRefiners;
