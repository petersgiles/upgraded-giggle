import {
  CommitmentOverviewMapActions,
  CommitmentOverviewMapActionTypes
} from './commitment-overview-map.actions'
import { MapPoint } from '@digital-first/df-map'
import { Commitment } from '../commitment/commitment.model'

export interface State {
  mapPoints: MapPoint[]
  commitmentMapPoints: any[]
  commitments: Commitment[]
}

export const initialState: State = {
  mapPoints: null,
  commitmentMapPoints: null,
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

    case CommitmentOverviewMapActionTypes.LoadCommitmentOverviewCommitmentMapPoints: {
      return {
        ...state,
        commitmentMapPoints: action.payload.data.commitmentMapPoints
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
export const getOverviewCommitmentMapPoints = (state: State) =>
  state.commitmentMapPoints
