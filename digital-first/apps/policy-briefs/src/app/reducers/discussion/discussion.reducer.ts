
import { DiscussionActions, DiscussionActionTypes } from './discussion.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: DiscussionActions): State {
  switch (action.type) {

    case DiscussionActionTypes.LoadDiscussions:
      return state;

    default:
      return state;
  }
}
