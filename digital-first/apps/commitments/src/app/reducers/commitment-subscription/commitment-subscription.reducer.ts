import { CommitmentSubscriptionActionTypes, CommitmentSubscriptionActions } from './commitment-subscription.actions'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Subscription } from './subscription.model'

export interface State {
  expanded: boolean
  timeFormat: 'dateFormat' | 'timeAgo' | 'calendar'
  subscriptions: []
  loading: boolean
  error: any
}

export const initialState: State = {
  expanded: false,
  timeFormat: 'timeAgo',
  subscriptions: null,
  loading: false,
  error: null,
}

export function reducer(
  state = initialState,
  action: CommitmentSubscriptionActions
): State {
  switch (action.type) {

    case CommitmentSubscriptionActionTypes.ExpandPanel: {
      return {
        ...state,
        expanded: true
      }
    }

    case CommitmentSubscriptionActionTypes.CollapsePanel: {
      return {
        ...state,
        expanded: false
      }
    }

    case CommitmentSubscriptionActionTypes.LoadSubscriptions: {

        // tslint:disable-next-line:no-console
        console.log('LoadSubsriptions', action.payload)

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
export const getTimeFormat = (state: State) => state.timeFormat
export const getSubscriptionLoading = (state: State) => state.loading
export const getSubscriptionError = (state: State) => state.error
