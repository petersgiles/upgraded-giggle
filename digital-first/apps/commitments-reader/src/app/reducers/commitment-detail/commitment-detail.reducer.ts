
import { CommitmentDetailActions, CommitmentDetailActionTypes } from './commitment-detail.actions'
import { Commitment } from '../../models/commitment.model'

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

       return {
        ...state,
        commitment: action.payload.commitment,
        loaded: true
      }
     }
     

    default:
      return state
  }
}

