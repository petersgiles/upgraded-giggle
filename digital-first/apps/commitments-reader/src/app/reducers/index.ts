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
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { RouterStateUrl } from './router-state-url'

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [{ auth: ['status'] }, { user: ['drawerOpen'] },  { refiner: ['expandedRefinerGroups', 'selectedRefiners'] }],
    rehydrate: true
  })(reducer)
}

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return reducer
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
}

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
