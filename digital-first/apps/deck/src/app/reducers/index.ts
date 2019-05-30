import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store'

import { environment } from '../../environments/environment'

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze'

import { localStorageSync } from 'ngrx-store-localstorage'
import * as fromRouter from '@ngrx/router-store'
import { RouterStateUrl } from '@digital-first/df-app-core'

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [{ auth: ['status'] }, { user: ['drawerOpen'] },  { navigation: ['expandedNodes'] }],
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

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, localStorageSyncReducer, storeFreeze]
  : [localStorageSyncReducer]
