import { AppActions, AppActionTypes } from './app.actions'
import { AppConfig } from '../../models'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export interface State {
  config: any //AppConfig
}

export const initialState: State = {
  config: null
}

export function reducer(state = initialState, action: AppActions): State {
  switch (action.type) {
    case AppActionTypes.LoadAppConfiguration:
      return {
        ...state,
        config: action.payload
      }

    default:
      return state
  }
}

export const appState = createFeatureSelector<State>('app')

export const selectAppConfigState = createSelector(
  appState,
  (state: State) => state.config
)

export const selectAppBookTypeState = createSelector(
  selectAppConfigState,
  config => config.header.bookType
)
export const selectAppBookColuor = createSelector(
  selectAppConfigState,
  config => config.header.bookColour
)

