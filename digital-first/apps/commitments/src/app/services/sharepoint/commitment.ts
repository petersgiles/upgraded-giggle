import { Commitment } from '../../reducers'
import { fromLookup } from '@digital-first/df-sharepoint'
import { RelatedCommitment } from '../../reducers/related-commitment/related-commitment.model'
import { RelatedLink } from '../../reducers/related-link/related-link.model'

export const mapCommitment = (commitment): Commitment => {
  const item: any = commitment

  const mapped = {
    id: item.ID,
    title: item.Title,
    party: fromLookup(item.PoliticalParty),
    description: item.Description,
    cost: item.Cost,
    costingRequired: item.CostingRequired,
    electorates: [],
    location: fromLookup(item.Location),
    whoAnnouncedType: fromLookup(item.WhoAnnouncedType),
    announcementType: fromLookup(item.AnnouncementType),
    criticalDate: fromLookup(item.CriticalDate),
    commitmentType: fromLookup(item.CommitmentType),
    themeType: fromLookup(item.ThemeType),
    packageType: fromLookup(item.PackageType),
    date: item.Date,
    announcedby: item.AnnouncedBy,
    portfolio: fromLookup(item.Portfolio),
    portfolios: [],
    mapPoints: [],
    contacts: [],
    relatedContacts: []
  }

  return mapped
}

export const mapCommitments = (commitments): Commitment[] =>
  commitments.map(mapCommitment)
