import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router'

import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer,
    createSelector
} from '@ngrx/store'

import { environment } from '../../environments/environment'

import * as fromRouter from '@ngrx/router-store'

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze'

import { localStorageSync } from 'ngrx-store-localstorage'

import { RouterStateUrl } from './router-state-url'
import * as fromNotification from './notification.reducer'
import * as fromCommitment from './commitment/commitment.reducer'
import * as fromUser from './user/user.reducer'
import * as fromContact from './contact/contact.reducer'
import * as fromMapPoint from './map-point/map-point.reducer'
import * as fromRelatedCommitment from './related-commitment/related-commitment.reducer'
import * as fromCommitmentLookup from './commitment-lookup/commitment-lookup.reducer'
import * as fromCommitmentOverview from './commitment-overview/commitment-overview.reducer'
import * as fromCommitmentEdit from './commitment-edit/commitment-edit.reducer'
import * as fromCommitmentDiscussion from './commitment-discussion/commitment-discussion.reducer'
import * as fromCommitmentSubscription from './commitment-subscription/commitment-subscription.reducer'
import * as fromCommitmentContact from './commitment-contact/commitment-contact.reducer'

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({
        keys: [
            { 'auth': ['status'] },
            { 'user': ['drawerOpen'] },
            'commitmentOverview',
            { 'commitmentEdit': ['expandedPanels', 'autosave'] },
            { 'commitmentDiscussion': ['expanded', 'timeFormat'] },
            { 'commitmentContact': ['expanded'] }
        ], rehydrate: true
    })(reducer)
}

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> { return reducer }

export interface State {
    user: fromUser.State
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
    relatedCommitment: fromRelatedCommitment.State
    notification: fromNotification.State
    commitment: fromCommitment.State
    contact: fromContact.State
    mapPoint: fromMapPoint.State
    commitmentLookup: fromCommitmentLookup.State
    commitmentOverview: fromCommitmentOverview.State
    commitmentEdit: fromCommitmentEdit.State
    commitmentDiscussion: fromCommitmentDiscussion.State
    commitmentSubscription: fromCommitmentSubscription.State

    commitmentContact: fromCommitmentContact.State
}

export const reducers: ActionReducerMap<State> = {
    user: fromUser.reducer,
    routerReducer: fromRouter.routerReducer,
    relatedCommitment: fromRelatedCommitment.reducer,
    notification: fromNotification.reducer,
    commitment: fromCommitment.reducer,
    contact: fromContact.reducer,
    mapPoint: fromMapPoint.reducer,
    commitmentLookup: fromCommitmentLookup.reducer,
    commitmentOverview: fromCommitmentOverview.reducer,
    commitmentEdit: fromCommitmentEdit.reducer,
    commitmentDiscussion: fromCommitmentDiscussion.reducer,
    commitmentSubscription: fromCommitmentSubscription.reducer,
    commitmentContact: fromCommitmentContact.reducer
}

export const getNotificationState = state => state.notification

export const getNotification = createSelector(
    getNotificationState,
    fromNotification.getNotification
)

export * from './commitment-lookup'
export * from './related-commitment'
export * from './user'
export * from './map-point'
export * from './contact'
export * from './commitment-overview'
export * from './commitment-edit'
export * from './commitment-discussion'
export * from './commitment-contact'
export * from './commitment'
export * from './commitment-subscription'

export class CustomSerializer
    implements fromRouter.RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        const { url } = routerState
        const { queryParams } = routerState.root

        let state: ActivatedRouteSnapshot = routerState.root
        while (state.firstChild) {
            state = state.firstChild
        }
        const { params } = state

        return { url, queryParams, params }
    }
}

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger, localStorageSyncReducer, storeFreeze]
    : [localStorageSyncReducer]
