
import { CommitmentDetailActions, CommitmentDetailActionTypes } from './commitment-detail.actions'
import { Commitment } from '../../models/commitment.model'
import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

export interface CommitmentDetailsState {
 commitments: Commitment[]
}

export const initialState: CommitmentDetailsState = {
 commitments: []
}

export function reducer(state = initialState, action: CommitmentDetailActions): CommitmentDetailsState {
  switch (action.type) {

    case CommitmentDetailActionTypes.LoadCommitmentDetails:
  
      return state

    default:
      return state
  }
}

