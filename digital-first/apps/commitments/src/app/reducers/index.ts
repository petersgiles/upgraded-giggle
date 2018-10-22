import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router'

import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store'
import * as fromRouter from '@ngrx/router-store'

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze'

import { localStorageSync } from 'ngrx-store-localstorage'

import { environment } from '../../environments/environment'
import { RouterStateUrl } from './router-state-url'
import * as fromAnnouncementType from './announcement-type/announcement-type.reducer'
import * as fromCommitment from './commitment/commitment.reducer'
import * as fromPortfolio from './portfolio/portfolio.reducer'
import * as fromParty from './party/party.reducer'
import * as fromComment from './comment/comment.reducer'
import * as fromContact from './contact/contact.reducer'
import * as fromLocation from './location/location.reducer'
import * as fromCommitmentType from './commitment-type/commitment-type.reducer'

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: [{ 'auth': ['status'] }, { 'topic-nav': ['page'] }], rehydrate: true })(reducer)
}

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> { return reducer }

export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
    announcementType: fromAnnouncementType.State
    commitment: fromCommitment.State
    portfolio: fromPortfolio.State
    party: fromParty.State
    comment: fromComment.State
    contact: fromContact.State
    location: fromLocation.State
    commitmentType: fromCommitmentType.State

}

export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer,
    announcementType: fromAnnouncementType.reducer,
    commitment: fromCommitment.reducer,
    portfolio: fromPortfolio.reducer,
    party: fromParty.reducer,
    comment: fromComment.reducer,
    contact: fromContact.reducer,
    location: fromLocation.reducer,
    commitmentType: fromCommitmentType.reducer,
}

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger, localStorageSyncReducer, storeFreeze]
    : [localStorageSyncReducer]

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
