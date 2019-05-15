import {
  CommitmentDetailActions,
  CommitmentDetailActionTypes
} from './commitment-detail.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Commitment } from '../../models/commitment.model'
import { generateGUID } from '../../utils'
import { NotificationMessage } from '../app/app.model';

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

    case CommitmentDetailActionTypes.UpdatePMOHandlingAdviceFailure:
      return {
        ...state,
        errors: [{ message: 'Could not update PMO Handling Advice', code: '400',  data: {field:'PMOHandlingAdvice', error: action.payload}}]
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

export const getDetailedCommitmentState = createSelector(
  getCommitmentState,
  getErrorState,
  (commitment, errors) => {
    const detail = { ...commitment, errors }
    console.log(`🙈 `, detail)
    return detail
  }
)
