import {
  CommitmentDetailActions,
  CommitmentDetailActionTypes
} from './commitment-detail.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Commitment } from '../../models/commitment.model'
import { NotificationMessage } from '@digital-first/df-app-core'

export interface State {
  commitment: Commitment
  loaded: boolean
  handlingAdvices: []
  errors: NotificationMessage[]
}

export const initialState: State = {
  commitment: null,
  loaded: false,
  handlingAdvices: [],
  errors: null
}

export function reducer(
  state = initialState,
  action: CommitmentDetailActions
): State {
  switch (action.type) {
    case CommitmentDetailActionTypes.ClearCurrentDetailedCommitment:
    return {
      ...state,
      commitment: null,
      errors: null,
      loaded: true
    }

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
      pmocommitment.pmoHandlingAdvice = action.payload.handlingAdvice
      return {
        ...state,
        commitment: pmocommitment
      }

    case CommitmentDetailActionTypes.UpdatePMOHandlingAdviceFailure:
      return {
        ...state,
        errors: [
          {
            message: 'Could not update PMO Handling Advice',
            code: '400',
            data: { field: 'PMOHandlingAdvice', error: action.payload }
          }
        ]
      }

      case CommitmentDetailActionTypes.UpdatePMCHandlingAdviceFailure:
      return {
        ...state,
        errors: [
          {
            message: 'Could not update PMO Handling Advice',
            code: '400',
            data: { field: 'PMCHandlingAdvice', error: action.payload }
          }
        ]
      }

    case CommitmentDetailActionTypes.SetPMCHandlingAdviceResult:
      const pmccommitment = JSON.parse(JSON.stringify(state.commitment))
      pmccommitment.pmcHandlingAdvice = action.payload.handlingAdvice
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

export const getErrorState = createSelector(
  commitmentDetailState,
  state => state.errors
)

export const getCommitmentState = createSelector(
  commitmentDetailState,
  state => state.commitment
)

export const getHandlingAdvicesState = createSelector(
  commitmentDetailState,
  state => state.handlingAdvices
)

export const getCurrentPMOHandlingAdviceState = createSelector(
  getHandlingAdvicesState,
  getCommitmentState,
  (handlings: any, commitment: any) => {
    let label = ''
    if (commitment && handlings) {
      const found: any = handlings.find(
        (p: any) => p.value === commitment.pmoHandlingAdvice.value
      )
      if (found) {
        label = found.label
      }
    }

    return label
  }
)

export const getCurrentPMCHandlingAdviceState = createSelector(
  getHandlingAdvicesState,
  getCommitmentState,
  (handlings: any, commitment: any) => {
    let label = ''
    if (commitment && handlings) {
      const found: any = handlings.find(
        (p: any) => p.value === commitment.pmcHandlingAdvice.value
      )
      if (found) {
        label = found.label
      }
    }

    return label
  }
)

export const getDetailedCommitmentState = createSelector(
  getCommitmentState,
  getErrorState,
  (commitment, errors) => {
    const detail = { commitment, errors }
    return detail
  }
)
