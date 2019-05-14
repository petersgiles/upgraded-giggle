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
}

export const initialState: State = {
  commitment: null,
  loaded: false,
  handlingAdvices: []
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
        commitment: pmocommitment
      }

    case CommitmentDetailActionTypes.SetPMCHandlingAdviceResult:
      const pmccommitment = JSON.parse(JSON.stringify(state.commitment))
      pmccommitment.pmcHandlingAdvice = action.payload.handlingAdvices
      return {
        ...state,
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


