import { AppActions, AppActionTypes } from './app.actions'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Config } from '../../services/config/config-model'
import { NotificationMessage } from './app.model'

export interface State {
  config: Config
  notification: NotificationMessage
  spinner: boolean
  appError: any
}

export const initialState: State = {
  config: null,
  notification: null,
  spinner: false,
  appError: null
}

export function reducer(state = initialState, action: AppActions): State {
  switch (action.type) {
    case AppActionTypes.HideSpinner:
      return { ...state, spinner: false }

    case AppActionTypes.ShowSpinner:
      return { ...state, spinner: true }

    case AppActionTypes.AppNotification:
      return {
        ...state,
        notification: action.payload
      }

    case AppActionTypes.ClearAppNotification:
      return {
        ...state,
        notification: null
      }

    case AppActionTypes.LoadAppConfiguration:
      return {
        ...state,
        config: action.payload
      }

    case AppActionTypes.HandleGlobalError:
      return {
        ...state,
        appError: action.payload.error
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
export const selectAppBookColour = createSelector(
  selectAppConfigState,
  config => config.header.bookColour
)

export const selectNotification = createSelector(
  appState,
  (state: State) => state.notification
)

export const selectAppSpinnerState = createSelector(
  appState,
  (state: State) => state.spinner
)