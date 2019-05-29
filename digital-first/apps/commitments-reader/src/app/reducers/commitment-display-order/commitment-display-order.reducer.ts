import { createFeatureSelector, createSelector } from '@ngrx/store'
import { NotificationMessage } from '@digital-first/df-app-core'
import {
  CommitmentDisplayOrderActionTypes,
  CommitmentDisplayOrderActions
} from './commitment-display-order.actions'

export interface State {
  commitmentDisplayOrders: any[]
  reOrderedCommitmentIds: any[]
  displayOrderListChanged: boolean
  errors: NotificationMessage[]
}

export const initialState: State = {
  commitmentDisplayOrders: [],
  reOrderedCommitmentIds: [],
  displayOrderListChanged: false,
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
        reOrderedCommitmentIds: action.payload
      }
    case CommitmentDisplayOrderActionTypes.SetDisplayOrderListChanged:
      return {
        ...state,
        displayOrderListChanged: action.payload
      }
    case CommitmentDisplayOrderActionTypes.GetCommitmentDisplayOrdersFailure:
      return {
        ...state,
        errors: [
          {
            message: 'Could not load Commitment Display Orders',
            code: '400',
            data: { field: 'Commitment Display Order', error: action.payload }
          }
        ]
      }
    case CommitmentDisplayOrderActionTypes.ApplyCommitmentDisplayOrdersFailure:
      return {
        ...state,
        errors: [
          {
            message: 'Could not update Commitment Display Orders',
            code: '400',
            data: { field: 'Commitment Display Order', error: action.payload }
          }
        ]
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
      commitmentId: row.commitmentId,
      title: row.commitment ? row.commitment.title : '',
      displayOrder: row.displayOrder,
      portfolio: row.commitment
        ? row.commitment.portfolioLookup
          ? row.commitment.portfolioLookup.title
          : ''
        : ''
    }))
)

export const getDisplayOrderListChangedState = createSelector(
  commitmengDisplayOrderState,
  (state: State) => state.displayOrderListChanged
)
