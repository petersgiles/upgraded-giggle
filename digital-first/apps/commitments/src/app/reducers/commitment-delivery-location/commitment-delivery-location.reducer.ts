import { DeliveryLocation } from './commitment-delivery-location.model'
import { DeliveryLocationActions, DeliveryLocationActionTypes } from './commitment-delivery-location.actions'

export interface State {
  mapPoints: DeliveryLocation[]
  electorates: any[]
  expanded: boolean
  loading: boolean
  error: any
}

export const initialState: State = {
  mapPoints: [],
  electorates: [],
  expanded: false,
  loading: false,
  error: null
}

export function reducer(
  state = initialState,
  action: DeliveryLocationActions
): State {
  switch (action.type) {

    case DeliveryLocationActionTypes.ExpandPanel: {
      return {
        ...state,
        expanded: true
      }
    }

    case DeliveryLocationActionTypes.CollapsePanel: {
      return {
        ...state,
        expanded: false
      }
    }

    // case DeliveryLocationActionTypes.LoadDeliveryLocations: {

    //     // tslint:disable-next-line:no-console
    //     console.log('LoadDeliveryLocations', action.payload)

    //   if (action.payload.data.commitmentDeliveryLocations) {
    //     return {
    //       ...state,
    //       entities: [...action.payload.data.commitmentDeliveryLocations],
    //       loading: action.payload.loading,
    //       error: action.payload.error
    //     }
    //   }

    //   return {
    //     ...state,
    //     loading: action.payload.loading,
    //     error: action.payload.error
    //   }
    // }

    // case DeliveryLocationActionTypes.ClearDeliveryLocations: {
    //   return {
    //     ...state,
    //     entities: []
    //   }
    // }

    // case DeliveryLocationActionTypes.GetDeliveryLocations: {
    //   return { ...state, loading: true, error: null }
    // }

    // case DeliveryLocationActionTypes.GetAllDeliveryLocations: {
    //   return { ...state, loading: true, error: null }
    // }

    case DeliveryLocationActionTypes.DeliveryLocationsActionFailure: {
      return { ...state, loading: false, error: action.payload.error }
    }

    default: {
      return state
    }
  }
}
export const selectAllMapPoints = (state: State) => state.electorates
export const selectAllElectorates = (state: State) => state.electorates
export const getExpanded = (state: State) => state.expanded
export const getLoading = (state: State) => state.loading
export const getError = (state: State) => state.error