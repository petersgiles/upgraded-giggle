import { createSelector } from '@ngrx/store'

export const getCommitmentSubscriptionState = state => state.commitmentSubscription

export const getIsSubscribed = createSelector(
    getCommitmentSubscriptionState,
    state => state.isSubscribed
)

export const getSubscriptionLoading = createSelector(
    getCommitmentSubscriptionState,
    state => state.loading
)

export const getSubscriptionError = createSelector(
    getCommitmentSubscriptionState,
    state => state.error
)
