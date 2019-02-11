import { createSelector } from '@ngrx/store'
import { DataTableConfig } from '@digital-first/df-datatable'
import * as fromCommitmentPortfolio from './commitment-portfolio.reducer'

export const getCommitmentPortfolioState = state => state.commitmentPortfolio

export const getAllCommitmentPortfolios = createSelector(
    getCommitmentPortfolioState,
    fromCommitmentPortfolio.selectAll
)

export const getCommitmentPortfolioPanelExpanded = createSelector(
    getCommitmentPortfolioState,
    state => state.expanded
)