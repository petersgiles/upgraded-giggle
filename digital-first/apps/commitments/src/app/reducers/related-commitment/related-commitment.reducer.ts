import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { RelatedCommitment } from './related-commitment.model'
import { RelatedCommitmentActions, RelatedCommitmentActionTypes } from './related-commitment.actions'

export interface State extends EntityState<RelatedCommitment> {
  // additional entities state properties
  expanded: boolean
  loading: boolean
  error: any
}

export const adapter: EntityAdapter<RelatedCommitment> = createEntityAdapter<RelatedCommitment>({
  selectId: entitiy => entitiy.id
})

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  expanded: false,
  loading: false,
  error: null
})

export function reducer(
  state = initialState,
  action: RelatedCommitmentActions
): State {
  switch (action.type) {

    case RelatedCommitmentActionTypes.ExpandPanel: {
      return {
        ...state,
        expanded: true
      }
    }

    case RelatedCommitmentActionTypes.CollapsePanel: {
      return {
        ...state,
        expanded: false
      }
    }

    case RelatedCommitmentActionTypes.LoadRelatedCommitments: {
      if (action.payload.data.commitmentRelatedCommitments) {
        return adapter.upsertMany(action.payload.data.commitmentRelatedCommitments, {
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

export const getExpanded = (state: State) => state.expanded
export const getLoading = (state: State) => state.loading
export const getError = (state: State) => state.error
