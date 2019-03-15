import { idFromLookup } from '@digital-first/df-sharepoint'

export const mapCommitmentPortfolio = (item): any => ({
    id: item.ID,
    commitment: idFromLookup(item.Commitment),
    portfolio: idFromLookup(item.Portfolio),
    Primary: item.Primary
})
export const mapCommitmentPortfolios = (items): any[] => items.map(mapCommitmentPortfolio)
