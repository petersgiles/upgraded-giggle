import { RelatedCommitment } from '../../models'
import { RelatedCommitmentActions, RelatedCommitmentActionTypes } from './related-commitment.actions'

export interface State  {
  entities: RelatedCommitment[]
  expanded: boolean
  loading: boolean
  error: any
}

export const initialState: State = {
  entities: [],
  expanded: false,
  loading: false,
  error: null
}

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

      if (action.payload.data.relatedCommitments) {
        return {
          ...state,
          entities: action.payload.data.relatedCommitments,
          loading: action.payload.loading,
          error: action.payload.error
        }
      }

      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error
      }
    }

    case RelatedCommitmentActionTypes.ClearRelatedCommitments: {
      return {
        ...state,
        entities: []
      }
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

export const selectAll = (state: State) => state.entities
export const getExpanded = (state: State) => state.expanded
export const getLoading = (state: State) => state.loading
export const getError = (state: State) => state.error
