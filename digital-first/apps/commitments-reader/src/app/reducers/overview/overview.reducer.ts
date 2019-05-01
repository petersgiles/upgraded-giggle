
import { OverviewActions, OverviewActionTypes } from './overview.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: OverviewActions): State {
  switch (action.type) {

    case OverviewActionTypes.LoadOverviews:
      return state;

    default:
      return state;
  }
}
