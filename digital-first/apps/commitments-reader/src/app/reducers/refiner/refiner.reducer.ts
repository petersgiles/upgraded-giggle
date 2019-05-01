
import { RefinerActions, RefinerActionTypes } from './refiner.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: RefinerActions): State {
  switch (action.type) {

    case RefinerActionTypes.LoadRefiners:
      return state;

    default:
      return state;
  }
}
