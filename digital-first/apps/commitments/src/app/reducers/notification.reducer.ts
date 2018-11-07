import { AppActions, AppActionTypes } from './app.actions'

export interface State {
  notification: any
}

export const initialState: State = {
    notification: null
}

export function reducer(
  state = initialState,
  action: AppActions
): State {
  switch (action.type) {

    case AppActionTypes.AppNotification: {
      return {
        ...state,
        notification: action.payload
      }
    }

    case AppActionTypes.ClearAppNotification: {
      return {
        ...state,
        notification: null
      }
    }

    default:
      return state
  }
}

export const getNotification = (state: State) => state.notification