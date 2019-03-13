import { createSelector } from '@ngrx/store'
import * as fromCommitmentPortfolio from './commitment-portfolio.reducer'
import { getAllPortfolios } from '../commitment-lookup'

export const getCommitmentPortfolioState = state => state.commitmentPortfolio

export const getAllCommitmentPortfolios = createSelector(
    getCommitmentPortfolioState,
    fromCommitmentPortfolio.selectAll
)

export const getCommitmentPortfolioPanelExpanded = createSelector(
    getCommitmentPortfolioState,
    state => state.expanded
)

export const getRelatedCommitmentPortfolios = createSelector(
    getAllCommitmentPortfolios,
    getAllPortfolios,
    (related, portfolios) => {

const relatedTags =  (related || []).map(r => ({
    id: r.id,
    group: 'Portfolio',
    icon: 'business',
    caption: r.title,
    order: 1,
    colour: r.colour,
    selected: true
}))

const portfolioTags = (portfolios || []).map(r => ({
    id: r.id,
    group: 'Portfolio',
    icon: 'business',
    caption: r.title,
    order: 1,
    colour: r.colour,
    selected: false
})).filter(p => !relatedTags.some(s => p.id === s.id))
        // tslint:disable-next-line:no-console
        console.log(relatedTags, portfolioTags)
        return [...relatedTags, ...portfolioTags]
    }
)
