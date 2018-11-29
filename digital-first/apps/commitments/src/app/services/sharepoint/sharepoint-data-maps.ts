import { idFromLookup } from '@digital-first/df-sharepoint'

import { AnnouncementType } from '../../models/announcement-type.model'
import { Party } from '../../models/party.model'
import { Portfolio } from '../../models/portfolio.model'
import { CommitmentType } from '../../models/commitment-type.model'

import { WhoAnnouncedType } from '../../models/who-announced-type.model'
import { CriticalDate } from '../../models/critical-date.model'

export const mapAnnouncementType = (announcementType): any => ({
  id: announcementType.ID,
  title: announcementType.Title,
  colour: announcementType.Colour,
  sortOrder: announcementType.SortOrder
})

export const mapAnnouncementTypes = (announcementTypes): AnnouncementType[] => announcementTypes.map(mapAnnouncementType)

export const mapCriticalDate = (item): any => ({
  id: item.ID,
  title: item.Title,
  colour: item.Colour,
  sortOrder: item.SortOrder
})

export const mapCriticalDates = (list): CriticalDate[] => list.map(mapCriticalDate)

export const mapWhoAnnouncedType = (announcementType): any => ({
  id: announcementType.ID,
  title: announcementType.Title,
  colour: announcementType.Colour,
  sortOrder: announcementType.SortOrder
})

export const mapWhoAnnouncedTypes = (whoAnnouncedTypes): WhoAnnouncedType[] => whoAnnouncedTypes.map(mapWhoAnnouncedType)

export const mapCommitmentType = (commitmentType): any => ({
  id: commitmentType.ID,
  title: commitmentType.Title,
  colour: commitmentType.Colour,
  sortOrder: commitmentType.SortOrder
})

export const mapCommitmentTypes = (commitmentTypes): CommitmentType[] => commitmentTypes.map(mapCommitmentType)

export const mapParty = (party): any => ({
  id: party.ID,
  title: party.Title,
  colour: party.Colour,
  sortOrder: party.SortOrder
})

export const mapParties = (parties): Party[] => parties.map(mapParty)

export const mapPortfolio = (portfolio): any => ({
  id: portfolio.ID,
  title: portfolio.Title,
  colour: portfolio.Colour,
  sortOrder: portfolio.SortOrder
})

export const mapPortfolios = (portfolios): Portfolio[] => portfolios.map(mapPortfolio)

export const mapCommitmentPortfolio = (commitmentPortfolio): any => ({
  id: commitmentPortfolio.ID,
  commitment: idFromLookup(commitmentPortfolio.Commitment),
  portfolio: idFromLookup(commitmentPortfolio.Portfolio)
})
export const mapCommitmentPortfolios = (commitmentPortfolios): any[] => commitmentPortfolios.map(mapCommitmentPortfolio)
