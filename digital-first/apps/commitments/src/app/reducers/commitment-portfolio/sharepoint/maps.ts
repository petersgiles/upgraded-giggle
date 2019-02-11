import { idFromLookup } from '@digital-first/df-sharepoint'

export const mapCommitmentPortfolio = (item): any => ({
    id: item.ID,
    commitment: idFromLookup(item.Commitment),
    contact: idFromLookup(item.Contact)
})
export const mapCommitmentPortfolios = (items): any[] => items.map(mapCommitmentPortfolio)
