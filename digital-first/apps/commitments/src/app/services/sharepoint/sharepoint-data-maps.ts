import { idFromLookup } from '@digital-first/df-sharepoint'

export const mapCommitmentPortfolio = (commitmentPortfolio): any => ({
  id: commitmentPortfolio.ID,
  commitment: idFromLookup(commitmentPortfolio.Commitment),
  portfolio: idFromLookup(commitmentPortfolio.Portfolio)
})
export const mapCommitmentPortfolios = (commitmentPortfolios): any[] => commitmentPortfolios.map(mapCommitmentPortfolio)
