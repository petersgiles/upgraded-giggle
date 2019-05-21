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
        commitmentDisplayOrders: action.payload.data.siteCommitmentDisplayOrders
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
  'commitmentDisplayOrder'
)

export const getCommitmentDisplayOrdersState = createSelector(
  commitmengDisplayOrderState,
  (state: State) => state.commitmentDisplayOrders
)

export const getCommitmentsWithDisplayOrderState = createSelector(
  getCommitmentDisplayOrdersState,
  commitmentDisplayOrders =>
    (commitmentDisplayOrders || []).map(row => ({
      commitmentId: row.commitment ? row.commitment.id : 0,
      title: row.commitment ? row.commitment.title : '',
      displayOrder: row.displayOrder,
      portfolio: row.commitment
        ? row.commitment.portfolioLookUp
          ? row.commitment.portfolioLookUp.title
          : ''
        : ''
    }))
)
