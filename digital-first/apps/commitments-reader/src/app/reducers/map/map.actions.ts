import { Action } from '@ngrx/store';

export enum MapActionTypes {
  LoadMaps = '[Map] Load Maps',
  
  
}

export class LoadMaps implements Action {
  readonly type = MapActionTypes.LoadMaps;
}


export type MapActions = LoadMaps;
