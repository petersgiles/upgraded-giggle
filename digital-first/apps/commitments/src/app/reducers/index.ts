import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router'

import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer
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
import * as fromWhoAnnouncedType from './who-announced-type/who-announced-type.reducer'
import * as fromAnnouncementType from './announcement-type/announcement-type.reducer'
import * as fromCommitment from './commitment/commitment.reducer'
import * as fromPortfolio from './portfolio/portfolio.reducer'
import * as fromParty from './party/party.reducer'
import * as fromComment from './comment/comment.reducer'
import * as fromContact from './contact/contact.reducer'
import * as fromLocation from './location/location.reducer'
import * as fromCommitmentType from './commitment-type/commitment-type.reducer'
import * as fromCommitmentOverview from './commitment-overview/commitment-overview.reducer'

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: [{ 'auth': ['status'] }, 'commitmentOverview'], rehydrate: true })(reducer)
}

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> { return reducer }

export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
    whoAnnouncedType: fromWhoAnnouncedType.State
    announcementType: fromAnnouncementType.State
    commitment: fromCommitment.State
    portfolio: fromPortfolio.State
    party: fromParty.State
    comment: fromComment.State
    contact: fromContact.State
    location: fromLocation.State
    commitmentType: fromCommitmentType.State
    commitmentOverview: fromCommitmentOverview.State

}

export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer,
    whoAnnouncedType: fromWhoAnnouncedType.reducer,
    announcementType: fromAnnouncementType.reducer,
    commitment: fromCommitment.reducer,
    portfolio: fromPortfolio.reducer,
    party: fromParty.reducer,
    comment: fromComment.reducer,
    contact: fromContact.reducer,
    location: fromLocation.reducer,
    commitmentType: fromCommitmentType.reducer,
    commitmentOverview: fromCommitmentOverview.reducer
}

export * from './commitment-type'
export * from './location'
export * from './contact'
export * from './comment'
export * from './party'
export * from './portfolio'
export * from './announcement-type'
export * from './commitment-overview'
export * from './commitment'
export * from './who-announced-type'

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
