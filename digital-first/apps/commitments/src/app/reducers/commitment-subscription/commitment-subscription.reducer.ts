import { CommitmentSubscriptionActionTypes, CommitmentSubscriptionActions } from './commitment-subscription.actions'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Subscription } from './subscription.model'

export interface State {
  expanded: boolean
  subscriptions: []
  loading: boolean
  error: any
}

export const initialState: State = {
  expanded: false,
  subscriptions: null,
  loading: false,
  error: null,
}

export function reducer(
  state = initialState,
  action: CommitmentSubscriptionActions
): State {
  switch (action.type) {

    case CommitmentSubscriptionActionTypes.LoadSubscriptions: {

        // tslint:disable-next-line:no-console
        console.log('LoadSubscriptions', action.payload)

      return {
          ...state,
          subscriptions: action.payload.data.subscription,
          loading: action.payload.loading,
          error: action.payload.error
        }
    }

    case CommitmentSubscriptionActionTypes.GetSubscriptionsByCommitment: {
      return { ...state, loading: true, error: null }
    }

    default:
      return state
  }
}

export const selectAll = (state: State) => state.subscriptions
export const getExpanded = (state: State) => state.expanded
export const getSubscriptionLoading = (state: State) => state.loading
export const getSubscriptionError = (state: State) => state.error
