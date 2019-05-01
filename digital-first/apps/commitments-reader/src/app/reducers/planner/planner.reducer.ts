
import { PlannerActions, PlannerActionTypes } from './planner.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: PlannerActions): State {
  switch (action.type) {

    case PlannerActionTypes.LoadPlanners:
      return state;

    default:
      return state;
  }
}
