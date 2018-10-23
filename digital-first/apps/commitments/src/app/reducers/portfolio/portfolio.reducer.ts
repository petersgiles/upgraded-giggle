import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { Portfolio } from './portfolio.model'
import { PortfolioActions, PortfolioActionTypes } from './portfolio.actions'

export interface State extends EntityState<Portfolio> {
  // additional entities state properties
  loading: boolean
  error: any
}

export const adapter: EntityAdapter<Portfolio> = createEntityAdapter<Portfolio>()

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  error: null
})

export function reducer(
  state = initialState,
  action: PortfolioActions
): State {
  switch (action.type) {
    case PortfolioActionTypes.AddPortfolio: {
      return adapter.addOne(action.payload.portfolio, state)
    }

    case PortfolioActionTypes.UpsertPortfolio: {
      return adapter.upsertOne(action.payload.portfolio, state)
    }

    case PortfolioActionTypes.AddPortfolios: {
      return adapter.addMany(action.payload.portfolios, state)
    }

    case PortfolioActionTypes.UpsertPortfolios: {
      return adapter.upsertMany(action.payload.portfolios, state)
    }

    case PortfolioActionTypes.UpdatePortfolio: {
      return adapter.updateOne(action.payload.portfolio, state)
    }

    case PortfolioActionTypes.UpdatePortfolios: {
      return adapter.updateMany(action.payload.portfolios, state)
    }

    case PortfolioActionTypes.DeletePortfolio: {
      return adapter.removeOne(action.payload.id, state)
    }

    case PortfolioActionTypes.DeletePortfolios: {
      return adapter.removeMany(action.payload.ids, state)
    }

    case PortfolioActionTypes.LoadPortfolios: {
      return adapter.addAll(action.payload.data.portfolios, {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error
      })
    }

    case PortfolioActionTypes.ClearPortfolios: {
      return adapter.removeAll(state)
    }

    case PortfolioActionTypes.GetPortfolios: {
      return {...state, loading: true, error: null}
    }

    case PortfolioActionTypes.GetAllPortfolios: {
      return {...state, loading: true, error: null}
    }

    case PortfolioActionTypes.PortfoliosActionFailure: {
      return {...state, loading: false, error: action.payload.error}
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
