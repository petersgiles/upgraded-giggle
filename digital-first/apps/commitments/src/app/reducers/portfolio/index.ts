import * as fromPortfolio from './portfolio.reducer'
import { createSelector } from '@ngrx/store'

export const getPortfolioEntitiesState = state => state.portfolio

export const {
    selectIds: getPortfolioIds,
    selectEntities: getPortfolioEntities,
    selectAll: getAllPortfolios,
    selectTotal: getTotalPortfolios,
} = fromPortfolio.adapter.getSelectors(getPortfolioEntitiesState)

export const getPortfolioLoading = createSelector(
    getPortfolioEntitiesState,
    state => state.loading
)

export const getPortfolioError = createSelector(
    getPortfolioEntitiesState,
    state => state.error
)