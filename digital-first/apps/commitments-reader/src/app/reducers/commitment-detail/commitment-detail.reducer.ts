
import { CommitmentDetailActions, CommitmentDetailActionTypes } from './commitment-detail.actions'
import { Commitment } from '../../models/commitment.model'
import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';

export interface CommitmentDetailsState {
 commitment: Commitment
 loaded: boolean
}

export const initialState: CommitmentDetailsState = {
 commitment: null,
 loaded: false
}

export function reducer(state = initialState, action: CommitmentDetailActions): CommitmentDetailsState {
  switch (action.type) {

    case CommitmentDetailActionTypes.LoadCommitmentDetails:
    return state

    case CommitmentDetailActionTypes.LoadDetailedCommitment:
     if(action.payload){
       let result = action.payload
       return {
        ...state,
        commitment: result.payload.commitment,
        loaded: true
      }
     }
     

    default:
      return state
  }
}

