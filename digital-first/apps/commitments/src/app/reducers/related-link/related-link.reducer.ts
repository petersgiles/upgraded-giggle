import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { RelatedLink } from './related-link.model'
import { RelatedLinkActions, RelatedLinkActionTypes } from './related-link.actions'

export interface State extends EntityState<RelatedLink> {
  // additional entities state properties
  expanded: boolean
  loading: boolean
  error: any
}

export const adapter: EntityAdapter<RelatedLink> = createEntityAdapter<RelatedLink>({
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
  action: RelatedLinkActions
): State {
  switch (action.type) {

    case RelatedLinkActionTypes.ExpandPanel: {
      return {
        ...state,
        expanded: true
      }
    }

    case RelatedLinkActionTypes.CollapsePanel: {
      return {
        ...state,
        expanded: false
      }
    }

    case RelatedLinkActionTypes.LoadRelatedLinks: {
      if (action.payload.data.commitmentRelatedLinks) {
        return adapter.upsertMany(action.payload.data.commitmentRelatedLinks, {
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

    case RelatedLinkActionTypes.ClearRelatedLinks: {
      return adapter.removeAll(state)
    }

    case RelatedLinkActionTypes.GetRelatedLinks: {
      return { ...state, loading: true, error: null }
    }

    case RelatedLinkActionTypes.GetAllRelatedLinks: {
      return { ...state, loading: true, error: null }
    }

    case RelatedLinkActionTypes.RelatedLinksActionFailure: {
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