
import { CommitmentDetailActions, CommitmentDetailActionTypes } from './commitment-detail.actions';

export interface State {

}

export const initialState: State = {

};

export function reducer(state = initialState, action: CommitmentDetailActions): State {
  switch (action.type) {

    case CommitmentDetailActionTypes.LoadCommitmentDetails:
      return state;

    default:
      return state;
  }
}
