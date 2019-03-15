import { idFromLookup, fromLookup } from '@digital-first/df-sharepoint'

export const mapCommitmentPortfolio = (commitmentPortfolio): any => ({
  id: commitmentPortfolio.ID,
  commitment: idFromLookup(commitmentPortfolio.Commitment),
  portfolio: idFromLookup(commitmentPortfolio.Portfolio)
})
export const mapCommitmentPortfolios = (commitmentPortfolios): any[] => commitmentPortfolios.map(mapCommitmentPortfolio)

export const mapGroupPermission = (item): any => ({
  id: item.ID,
  rights: item.Rights,
  component: item.Component,
  group: fromLookup(item.Group).title
      })

export const mapGroupPermissions = (items): any[] => items.map(mapGroupPermission)
