
import { MapActions, MapActionTypes } from './map.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: MapActions): State {
  switch (action.type) {

    case MapActionTypes.LoadMaps:
      return state;

    default:
      return state;
  }
}
