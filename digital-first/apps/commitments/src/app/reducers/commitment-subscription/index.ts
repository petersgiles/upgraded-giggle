import { createSelector } from '@ngrx/store'

import * as fromCommitmentSubscription from './commitment-Subscription.reducer'
import { toTree } from '@digital-first/df-utils'

export const getCommitmentSubscriptionState = state => state.commitmentSubscription

export const getAllSubscriptionComments = createSelector(
    getCommitmentSubscriptionState,
    state => state.comments
)

export const getSubscriptionCommentLoading = createSelector(
    getCommitmentSubscriptionState,
    state => state.loading
)

export const getSubscriptionCommentError = createSelector(
    getCommitmentSubscriptionState,
    state => state.error
)

export const getSubscriptionActiveComment = createSelector(
    getCommitmentSubscriptionState,
    state => state.activeComment
)

export const getCommitmentSubscriptionPanelExpanded = createSelector(
    getCommitmentSubscriptionState,
    state => state.expanded
)

export const getCurrentCommitmentSubscription = createSelector(
    getAllSubscriptionComments,
    (comments) => {

        // tslint:disable-next-line:no-console
        console.log('getCurrentCommitmentSubscription', comments)

        const subscriptionItems = (comments || []).map(c => ({ ...c })) // creating mutatable list

        const subscription = toTree(subscriptionItems, {
            id: 'id',
            parentId: 'parent',
            children: 'children',
            level: 'level',
            firstParentId: null
        })

        return subscription

    }
)
