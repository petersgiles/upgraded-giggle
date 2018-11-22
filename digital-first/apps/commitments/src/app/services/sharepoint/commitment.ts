import { Commitment } from '../../reducers'
import { fromLookup } from '@digital-first/df-sharepoint'

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
        contacts: []
    }

    return mapped
}

export const mapCommitments = (commitments): Commitment[] => commitments.map(mapCommitment)