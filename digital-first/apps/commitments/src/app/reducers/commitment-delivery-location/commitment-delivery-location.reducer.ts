import {
  DeliveryLocationActions,
  DeliveryLocationActionTypes
} from './commitment-delivery-location.actions'
import { MapPoint } from '@digital-first/df-map'
import { Electorate } from '../../models'

export interface State {
  mapPoints: MapPoint[]
  electorates: Electorate[]
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

    case DeliveryLocationActionTypes.LoadMapPoints: {
      return {
        ...state,
        mapPoints: [...action.payload.data.mapPoints],
        loading: action.payload.loading,
        error: action.payload.error
      }
    }

    case DeliveryLocationActionTypes.LoadElectorates: {
      return {
        ...state,
        electorates: [...action.payload.data.commitmentElectorates],
        loading: action.payload.loading,
        error: action.payload.error
      }
    }

    // if (action.payload.data.mapPoints) {
    //   return {
    //     ...state,
    //     mapPoints: [...action.payload.data.mapPoints],
    //     loading: action.payload.loading,
    //     error: action.payload.error
    //   }
    // }

    case DeliveryLocationActionTypes.DeliveryLocationsActionFailure: {
      return { ...state, loading: false, error: action.payload.error }
    }

    default: {
      return state
    }
  }
}
export const selectAllMapPoints = (state: State) => state.mapPoints
export const selectAllElectorates = (state: State) => state.electorates
export const getExpanded = (state: State) => state.expanded
export const getLoading = (state: State) => state.loading
export const getError = (state: State) => state.error
