import { Action } from '@ngrx/store';

export enum MapActionTypes {
  LoadMaps = '[Map] Load Maps',
  GetMapPoints = '[RefinerActionTypes] GetMapPoints'
}

export class LoadMaps implements Action {
  readonly type = MapActionTypes.LoadMaps;
}


export type MapActions = LoadMaps;
