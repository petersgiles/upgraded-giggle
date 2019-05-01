import { Action } from '@ngrx/store';

export enum PlannerActionTypes {
  LoadPlanners = '[Planner] Load Planners',
  
  
}

export class LoadPlanners implements Action {
  readonly type = PlannerActionTypes.LoadPlanners;
}


export type PlannerActions = LoadPlanners;
