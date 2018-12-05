import { CommitmentOverviewMapActions, CommitmentOverviewMapActionTypes } from './commitment-overview-map.actions'
import { MapPoint } from '@digital-first/df-components'

export interface State {
  mapPoints: MapPoint[]
}

export const initialState: State = {
  mapPoints: null
}

export function reducer(
  state = initialState,
  action: CommitmentOverviewMapActions
): State {
  switch (action.type) {

    case CommitmentOverviewMapActionTypes.LoadCommitmentOverviewMapPoints: {

      // tslint:disable-next-line:no-console
      console.log('LoadMapPoints', action.payload)

      return {
        ...state,
        mapPoints: action.payload.data.mapPoints
      }
    }

    case CommitmentOverviewMapActionTypes.ClearCommitmentOverviewMapPoints: {
      return {
        ...state,
        mapPoints: []
      }
    }

    default:
      return state
  }
}

export const getOverviewMapPoints = (state: State) => state.mapPoints