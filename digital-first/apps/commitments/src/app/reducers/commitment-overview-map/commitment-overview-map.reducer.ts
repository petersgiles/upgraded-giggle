import { CommitmentOverviewMapActions, CommitmentOverviewMapActionTypes } from './commitment-overview-map.actions'
import { MapPoint } from '@digital-first/df-map'
import { Commitment } from '../commitment/commitment.model'

export interface State {
  mapPoints: MapPoint[]
  commitments: Commitment[]
}

export const initialState: State = {
  mapPoints: null,
  commitments: null
}

export function reducer(
  state = initialState,
  action: CommitmentOverviewMapActions
): State {
  switch (action.type) {

    case CommitmentOverviewMapActionTypes.LoadCommitmentOverviewMapPoints: {
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

    case CommitmentOverviewMapActionTypes.LoadCommitmentOverviewMapCommitments: {

      return {
        ...state,
        commitments: action.payload.data.commitments
      }
    }

    case CommitmentOverviewMapActionTypes.ClearCommitmentOverviewMapPoints: {
      return {
        ...state,
        commitments: []
      }
    }

    default:
      return state
  }
}

export const getOverviewMapPoints = (state: State) => state.mapPoints
export const getOverviewCommitments = (state: State) => state.commitments
