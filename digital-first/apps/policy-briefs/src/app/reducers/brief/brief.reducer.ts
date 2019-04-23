
import { BriefActions, BriefActionTypes } from './brief.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: BriefActions): State {
  switch (action.type) {

    case BriefActionTypes.LoadBriefs:
      return state;

    default:
      return state;
  }
}
