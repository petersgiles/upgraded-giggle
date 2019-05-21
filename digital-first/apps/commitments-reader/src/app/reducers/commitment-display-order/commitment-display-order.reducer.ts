import { createFeatureSelector, createSelector } from '@ngrx/store'
import { NotificationMessage } from '../app/app.model'
import {
  CommitmentDisplayOrderActionTypes,
  CommitmentDisplayOrderActions
} from './commitment-display-order.actions'

export interface State {
  commitmentDisplayOrders: any[]
  reOrderedCommitments: any[]
  errors: NotificationMessage[]
}

export const initialState: State = {
  commitmentDisplayOrders: [],
  reOrderedCommitments: [],
  errors: null
}

export function reducer(
  state = initialState,
  action: CommitmentDisplayOrderActions
): State {
  switch (action.type) {
    case CommitmentDisplayOrderActionTypes.LoadCommitmentDisplayOrders:
      return {
        ...state,
        commitmentDisplayOrders: action.payload
      }
    case CommitmentDisplayOrderActionTypes.SetReOrderedCommitments:
      return {
        ...state,
        reOrderedCommitments: action.payload
      }
    default:
      return state
  }
}

export const commitmengDisplayOrderState = createFeatureSelector<State>(
  'commitmengDisplayOrder'
)

export const getCommitmentDisplayOrdersState = createSelector(
  commitmengDisplayOrderState,
  state => state.commitmentDisplayOrders
)
