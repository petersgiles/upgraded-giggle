import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Commitment } from './commitment.model'
import { CommitmentActions, CommitmentActionTypes } from './commitment.actions'

export interface State extends EntityState<Commitment> {
  // additional entities state properties
  currentCommitent: number | string
  loading: boolean
  saved: boolean
  error: any
}

export const adapter: EntityAdapter<Commitment> = createEntityAdapter<Commitment>()

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  currentCommitent: null,
  loading: false,
  saved: false,
  error: null
})

export function reducer(
  state = initialState,
  action: CommitmentActions
): State {
  switch (action.type) {
    case CommitmentActionTypes.AddCommitment: {

      return adapter.addOne(action.payload.data.commitment, {
        ...state,
        loading: action.payload.loading,
        saved: false,
        error: action.payload.error
      })
    }

    case CommitmentActionTypes.UpsertCommitment: {
      return adapter.upsertOne(action.payload.data.commitment, {
        ...state,
        loading: action.payload.loading,
        saved: false,
        error: action.payload.error
      })
    }

    case CommitmentActionTypes.AddCommitments: {
      return adapter.addMany(action.payload.data.commitments, {
        ...state,
        loading: action.payload.loading,
        saved: false,
        error: action.payload.error
      })
    }

    case CommitmentActionTypes.UpsertCommitments: {
      return adapter.upsertMany(action.payload.data.commitments, {
        ...state,
        loading: action.payload.loading,
        saved: false,
        error: action.payload.error
      })
    }
    case CommitmentActionTypes.LoadCommitments: {
      return adapter.upsertMany(action.payload.data.commitments, {
        ...state,
        loading: action.payload.loading,
        saved: false,
        error: action.payload.error
      })
    }

    case CommitmentActionTypes.ClearCommitments: {
      return adapter.removeAll(state)
    }

    case CommitmentActionTypes.SetCurrentCommitment: {
      return {...state, currentCommitent: action.payload.id, loading: false, saved: true}
    }

    case CommitmentActionTypes.CommitmentsActionFailure: {
      return {...state, loading: false, saved: false, error: action.payload.error}
    }

    case CommitmentActionTypes.StoreCommitment: {
      return {...state, loading: true, saved: false, error: action.payload.error}
    }
    default: {
      return state
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors()

export const getCurrentCommitentId = (state: State) => state.currentCommitent