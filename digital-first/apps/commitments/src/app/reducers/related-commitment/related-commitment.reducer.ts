import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { RelatedCommitment } from './related-commitment.model'
import { RelatedCommitmentActions, RelatedCommitmentActionTypes } from './related-commitment.actions'

export interface State extends EntityState<RelatedCommitment> {
  // additional entities state properties
  loading: boolean
  error: any
}

export const adapter: EntityAdapter<RelatedCommitment> = createEntityAdapter<RelatedCommitment>({
})

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  error: null
})

export function reducer(
  state = initialState,
  action: RelatedCommitmentActions
): State {
  switch (action.type) {
    case RelatedCommitmentActionTypes.AddRelatedCommitment: {
      return adapter.addOne(action.payload.location, state)
    }

    case RelatedCommitmentActionTypes.UpsertRelatedCommitment: {
      return adapter.upsertOne(action.payload.location, state)
    }

    case RelatedCommitmentActionTypes.AddRelatedCommitments: {
      return adapter.addMany(action.payload.locations, state)
    }

    case RelatedCommitmentActionTypes.UpsertRelatedCommitments: {
      return adapter.upsertMany(action.payload.locations, state)
    }

    case RelatedCommitmentActionTypes.UpdateRelatedCommitment: {
      return adapter.updateOne(action.payload.location, state)
    }

    case RelatedCommitmentActionTypes.UpdateRelatedCommitments: {
      return adapter.updateMany(action.payload.locations, state)
    }

    case RelatedCommitmentActionTypes.DeleteRelatedCommitment: {
      return adapter.removeOne(action.payload.id, state)
    }

    case RelatedCommitmentActionTypes.DeleteRelatedCommitments: {
      return adapter.removeMany(action.payload.ids, state)
    }

    case RelatedCommitmentActionTypes.LoadRelatedCommitments: {

      if (action.payload.data.relatedCommitments) {
        return adapter.upsertMany(action.payload.data.relatedCommitments, {
          ...state,
          loading: action.payload.loading,
          error: action.payload.error
        })
      }

      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error
      }
    }

    case RelatedCommitmentActionTypes.ClearRelatedCommitments: {
      return adapter.removeAll(state)
    }

    case RelatedCommitmentActionTypes.GetRelatedCommitments: {
      return { ...state, loading: true, error: null }
    }

    case RelatedCommitmentActionTypes.GetAllRelatedCommitments: {
      return { ...state, loading: true, error: null }
    }

    case RelatedCommitmentActionTypes.RelatedCommitmentsActionFailure: {
      return { ...state, loading: false, error: action.payload.error }
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
