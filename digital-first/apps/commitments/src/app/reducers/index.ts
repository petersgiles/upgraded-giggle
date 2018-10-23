import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router'

import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer,
    createFeatureSelector,
    createSelector
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

export const getCommitmentTypeEntitiesState = state => state.commitmentType

export const {
    selectIds: getCommitmentTypeIds,
    selectEntities: getCommitmentTypeEntities,
    selectAll: getAllCommitmentTypes,
    selectTotal: getTotalCommitmentTypes,
} = fromCommitmentType.adapter.getSelectors(getCommitmentTypeEntitiesState)

export const getCommitmentTypeLoading = createSelector(
    getCommitmentTypeEntitiesState,
    state => state.loading
)

export const getCommitmentTypeError = createSelector(
    getCommitmentTypeEntitiesState,
    state => state.error
)

export const getLocationEntitiesState = state => state.location

export const {
    selectIds: getLocationIds,
    selectEntities: getLocationEntities,
    selectAll: getAllLocations,
    selectTotal: getTotalLocations,
} = fromLocation.adapter.getSelectors(getLocationEntitiesState)

export const getLocationLoading = createSelector(
    getLocationEntitiesState,
    state => state.loading
)

export const getLocationError = createSelector(
    getLocationEntitiesState,
    state => state.error
)

export const getContactEntitiesState = state => state.contact

export const {
    selectIds: getContactIds,
    selectEntities: getContactEntities,
    selectAll: getAllContacts,
    selectTotal: getTotalContacts,
} = fromContact.adapter.getSelectors(getContactEntitiesState)

export const getContactLoading = createSelector(
    getContactEntitiesState,
    state => state.loading
)

export const getContactError = createSelector(
    getContactEntitiesState,
    state => state.error
)

export const getCommentEntitiesState = state => state.comment

export const {
    selectIds: getCommentIds,
    selectEntities: getCommentEntities,
    selectAll: getAllComments,
    selectTotal: getTotalComments,
} = fromComment.adapter.getSelectors(getCommentEntitiesState)

export const getCommentLoading = createSelector(
    getCommentEntitiesState,
    state => state.loading
)

export const getCommentError = createSelector(
    getCommentEntitiesState,
    state => state.error
)

export const getPartyEntitiesState = state => state.party

export const {
    selectIds: getPartyIds,
    selectEntities: getPartyEntities,
    selectAll: getAllPartys,
    selectTotal: getTotalPartys,
} = fromParty.adapter.getSelectors(getPartyEntitiesState)

export const getPartyLoading = createSelector(
    getPartyEntitiesState,
    state => state.loading
)

export const getPartyError = createSelector(
    getPartyEntitiesState,
    state => state.error
)

export const getPortfolioEntitiesState = state => state.portfolio

export const {
    selectIds: getPortfolioIds,
    selectEntities: getPortfolioEntities,
    selectAll: getAllPortfolios,
    selectTotal: getTotalPortfolios,
} = fromPortfolio.adapter.getSelectors(getPortfolioEntitiesState)

export const getPortfolioLoading = createSelector(
    getPortfolioEntitiesState,
    state => state.loading
)

export const getPortfolioError = createSelector(
    getPortfolioEntitiesState,
    state => state.error
)

export const getAnnouncementTypeEntitiesState = state => state.announcementType

export const {
    selectIds: getAnnouncementTypeIds,
    selectEntities: getAnnouncementTypeEntities,
    selectAll: getAllAnnouncementTypes,
    selectTotal: getTotalAnnouncementTypes,
} = fromAnnouncementType.adapter.getSelectors(getAnnouncementTypeEntitiesState)

export const getAnnouncementTypeLoading = createSelector(
    getAnnouncementTypeEntitiesState,
    state => state.loading
)

export const getAnnouncementTypeError = createSelector(
    getAnnouncementTypeEntitiesState,
    state => state.error
)

export const getCommitmentEntitiesState = state => state.commitment

export const getCurrentCommitentId = createSelector(
    getCommitmentEntitiesState,
    fromCommitment.getCurrentCommitentId
)

export const {
    selectIds: getCommitmentIds,
    selectEntities: getCommitmentEntities,
    selectAll: getAllCommitments,
    selectTotal: getTotalCommitments,
} = fromCommitment.adapter.getSelectors(getCommitmentEntitiesState)

export const getCurrentCommitment = createSelector(
    getCommitmentEntities,
    getCurrentCommitentId,
    getPartyEntities,
    getPortfolioEntities,
    getLocationEntities,
    getAnnouncementTypeEntities,
    getCommitmentTypeEntities,
    (commitments, current, partys, portfolios, locations, announcementTypes, commitmentTypes) => {
        const commitment = commitments[current]

        if (commitment) {
            return {
                ...commitment,
                portfolio: commitment.portfolio ? portfolios[commitment.portfolio.id] : null,
                party: commitment.party ? partys[commitment.party.id] : null,
                location: commitment.location ? locations[commitment.location.id] : null,
                announcementType: commitment.announcementType ? announcementTypes[commitment.announcementType.id] : null,
                commitmentType: commitment.commitmentType ? commitmentTypes[commitment.commitmentType.id] : null,
            }
        }

        return commitment
    }
)

export const getAllOverviewCommitments = createSelector(
    getAllCommitments,
    getPartyEntities,
    getPortfolioEntities,
    getLocationEntities,
    getAnnouncementTypeEntities,
    getCommitmentTypeEntities,
    (commitments, partys, portfolios, locations, announcementTypes, commitmentTypes) => {

        const result = commitments.map(commitment => ({
            ...commitment,
            description: null,
            portfolio: commitment.portfolio ? portfolios[commitment.portfolio.id] : null,
            party: commitment.party ? partys[commitment.party.id] : null,
            location: commitment.location ? locations[commitment.location.id] : null,
            announcementType: commitment.announcementType ? announcementTypes[commitment.announcementType.id] : null,
            commitmentType: commitment.commitmentType ? commitmentTypes[commitment.commitmentType.id] : null,
        })
        )
        // tslint:disable-next-line:no-console
        console.log('getAllOverviewCommitments =>', result)
        return result

    }

)

export const getCommitmentLoading = createSelector(
    getCommitmentEntitiesState,
    state => state.loading
)

export const getCommitmentError = createSelector(
    getCommitmentEntitiesState,
    state => state.error
)

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
