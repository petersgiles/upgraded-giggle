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

export const mapRelatedCommitment = (item): any => {
  const relatedTo = fromLookup(item.RelatedTo)
  // tslint:disable-next-line:no-console
  console.log(relatedTo)
  return {
    id: item.ID,
    title: relatedTo.title,
    commitment: fromLookup(item.Commitment),
    relatedTo: relatedTo
  }
}

export const mapRelatedCommitments = (commitments): RelatedCommitment[] =>
  commitments.map(mapRelatedCommitment)

export const mapRelatedLink = (item): any => ({
  id: item.ID,
  title: item.Url,
  commitment: fromLookup(item.Commitment),
  url: item.Url
})

export const mapRelatedLinks = (commitments): RelatedLink[] =>
  commitments.map(mapRelatedLink)
