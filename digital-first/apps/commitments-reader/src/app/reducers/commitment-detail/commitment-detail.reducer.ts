
import { CommitmentDetailActions, CommitmentDetailActionTypes } from './commitment-detail.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Commitment } from '../../models/commitment.model'

export interface CommitmentDetailsState {
 commitment: Commitment
 loaded: boolean
 handlingAdvices: []
 PMOUpdateLoaded: boolean
 PMCUpdateLoaded: boolean
 PMOHandlingAdvice: any
 PMCHandlingAdvice: any
}

export const initialState: CommitmentDetailsState = {
 commitment: null,
 loaded: false,
 handlingAdvices: [],
 PMOUpdateLoaded: false,
 PMCUpdateLoaded: false,
 PMOHandlingAdvice: null,
 PMCHandlingAdvice: null
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
     case CommitmentDetailActionTypes.LoadHandlingAdvices:
     if(action.payload){

       return {
        ...state,
        handlingAdvices: action.payload.advices,
        loaded: true
      }
     }

     case CommitmentDetailActionTypes.SetPMCHandlingAdviceResult:
     if(action.payload){
      return{
        ...state,
        PMCUpdateLoaded: true,
        PMCHandlingAdvice: action.payload.res
      }
    }

    case CommitmentDetailActionTypes.SetPMOHandlingAdviceResult:
    if(action.payload){
      return{
        ...state,
        PMOUpdateLoaded: true,
        PMOHandlingAdvice: action.payload.res
      }
    }
     

    default:
      return state
  }
}

/*export const getHandlingAdvicesState = (state: CommitmentDetailsState) => state.handlingAdvices
//export const getCommitmentState = (state: CommitmentDetailsState) => state.commitment
export const getPMOUpdateState = (state: CommitmentDetailsState) => state.PMOUpdateLoaded
export const getPMCUpdateState = (state: CommitmentDetailsState) => state.PMCUpdateLoaded

export const commitmentDetailState = createFeatureSelector<CommitmentDetailsState>('CommitmentDetail')


export const getCommitmentState = createSelector(
  commitmentDetailState,
  (state: CommitmentDetailsState) => state.commitment
)

export const getCommitment = createSelector(
  getCommitmentState,
  (commitment) => {
    return commitment
  }
)

  export const getHandlingAdvice = createSelector(
    commitmentDetailState,
    getHandlingAdvicesState
  )

export const getPMOUpdatedState = createSelector(
  commitmentDetailState,
  getPMOUpdateState
)

export const getPMCUpdatedState = createSelector(
  commitmentDetailState,
  getPMCUpdateState
)*/
