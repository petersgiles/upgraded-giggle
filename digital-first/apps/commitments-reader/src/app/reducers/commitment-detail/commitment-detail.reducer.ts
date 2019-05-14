import {
  CommitmentDetailActions,
  CommitmentDetailActionTypes
} from './commitment-detail.actions'
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

export function reducer(
  state = initialState,
  action: CommitmentDetailActions
): State {
  switch (action.type) {
    case CommitmentDetailActionTypes.LoadCommitmentDetails:
      return state

    case CommitmentDetailActionTypes.LoadDetailedCommitment:
      return {
        ...state,
        commitment: action.payload,
        loaded: true
      }

    case CommitmentDetailActionTypes.LoadHandlingAdvices:
      return {
        ...state,
        handlingAdvices: action.payload.advices,
        loaded: true
      }

    case CommitmentDetailActionTypes.SetPMOHandlingAdviceResult:
      const pmocommitment = JSON.parse(JSON.stringify(state.commitment))
      pmocommitment.pmoHandlingAdvice = action.payload.handlingAdvices
      return {
        ...state,
        PMOUpdateLoaded: true,
        commitment: pmocommitment
      }

    case CommitmentDetailActionTypes.SetPMCHandlingAdviceResult:
      const pmccommitment = JSON.parse(JSON.stringify(state.commitment))
      pmccommitment.pmcHandlingAdvice = action.payload.handlingAdvices
      return {
        ...state,
        PMCUpdateLoaded: true,
        commitment: pmccommitment
      }
    default:
      return state
  }
}

export const commitmentDetailState = createFeatureSelector<State>(
  'commitmentDetail'
)

export const getDetailedCommitmentState = createSelector(
  commitmentDetailState,
  state => state.commitment
)

export const getHandlingAdvicesState = createSelector(
  commitmentDetailState,
  state => state.handlingAdvices
)

export const getPMOUpdatedState = createSelector(
  commitmentDetailState,
  state => state.PMOHandlingAdvice
)

export const getPMCUpdatedState = createSelector(
  commitmentDetailState,
  state => state.PMCHandlingAdvice
)

