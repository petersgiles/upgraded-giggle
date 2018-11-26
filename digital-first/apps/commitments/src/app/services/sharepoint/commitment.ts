import { Commitment } from '../../reducers'
import { fromLookup } from '@digital-first/df-sharepoint'
import { RelatedCommitment } from '../../reducers/related-commitment/related-commitment.model'

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

export const mapCommitments = (commitments): Commitment[] => commitments.map(mapCommitment)

export const mapRelatedCommitment = (item): any => ({
    id: item.ID,
    title: item.Title,
    commitment: fromLookup(item.Commitment),
    relatedTo: fromLookup(item.RelatedTo),
  })

export const mapRelatedCommitments = (commitments): RelatedCommitment[] => commitments.map(mapRelatedCommitment)
