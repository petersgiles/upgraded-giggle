import { CommitmentSubscriptionActionTypes, CommitmentSubscriptionActions } from './commitment-subscription.actions'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Subscription } from './subscription.model'

export interface State {
  isSubscribed: boolean
  loading: boolean
  error: any
}

export const initialState: State = {
  isSubscribed: false,
  loading: false,
  error: null,
}

export function reducer(
  state = initialState,
  action: CommitmentSubscriptionActions
): State {
  switch (action.type) {

    case CommitmentSubscriptionActionTypes.LoadSubscriptions: {

        let subscribed = true

        if (action.payload.data.commitmentSubscription == null || action.payload.data.commitmentSubscription.length === 0) {
          subscribed = false
        }

      return {
          ...state,
          isSubscribed: subscribed,
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

export const getIsSubscribed = (state: State) => state.isSubscribed
export const getSubscriptionLoading = (state: State) => state.loading
export const getSubscriptionError = (state: State) => state.error
