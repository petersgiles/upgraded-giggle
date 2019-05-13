
import { CommitmentDetailActions, CommitmentDetailActionTypes } from './commitment-detail.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Commitment } from '../../models/commitment.model'

export interface State {
 commitment: Commitment
 loaded: boolean
 handlingAdvices: []
 PMOUpdateLoaded: boolean
 PMCUpdateLoaded: boolean
 PMOHandlingAdvice: any
 PMCHandlingAdvice: any
}

export const initialState: State = {
 commitment: null,
 loaded: false,
 handlingAdvices: [],
 PMOUpdateLoaded: false,
 PMCUpdateLoaded: false,
 PMOHandlingAdvice: null,
 PMCHandlingAdvice: null
}

export function reducer(state = initialState, action: CommitmentDetailActions): State {
  switch (action.type) {

    case CommitmentDetailActionTypes.LoadCommitmentDetails:
    return state

    case CommitmentDetailActionTypes.LoadDetailedCommitment:

    console.log(`🤡 LoadDetailedCommitment`, action)
       return {
        ...state,
        commitment: action.payload,
        loaded: true
      }

     case CommitmentDetailActionTypes.LoadHandlingAdvices:

     console.log(`🤡 LoadHandlingAdvices`, action)
       return {
        ...state,
        handlingAdvices: action.payload.advices,
        loaded: true
      }
 
     case CommitmentDetailActionTypes.SetPMCHandlingAdviceResult:

      return{
        ...state,
        PMCUpdateLoaded: true,
        PMCHandlingAdvice: action.payload.res
      }

    case CommitmentDetailActionTypes.SetPMOHandlingAdviceResult:

      return{
        ...state,
        PMOUpdateLoaded: true,
        PMOHandlingAdvice: action.payload.res
      }
    default:
      return state
  }
}

export const commitmentDetailState = createFeatureSelector<State>('commitmentDetail')

export const getDetailedCommitmentState = createSelector(
  commitmentDetailState,
  (state) => state.commitment
)

export const getHandlingAdvicesState = createSelector(
  commitmentDetailState,
  (state) => state.handlingAdvices
)

/*export const getHandlingAdvicesState = (state: CommitmentDetailsState) => state.handlingAdvices
//export const getCommitmentState = (state: CommitmentDetailsState) => state.commitment
export const getPMOUpdateState = (state: CommitmentDetailsState) => state.PMOUpdateLoaded
export const getPMCUpdateState = (state: CommitmentDetailsState) => state.PMCUpdateLoaded



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
