import { fromLookup } from '@digital-first/df-sharepoint'
import { AnnouncementType, Party, Portfolio, Commitment } from '../models/commitment-models'

export const byIdQuery = (criteria: { id }) =>
    `<View>
        <Query>
            <Where>
            <Eq>
                <FieldRef Name='ID' />
                <Value Type='Number'>${criteria.id}</Value>
            </Eq>
            </Where>
        </Query>
    </View>`

export const byCommitmentIdQuery = (criteria: { id }) => `
    <View>
        <Query>
            <Where>
            <Eq>
                <FieldRef Name='Commitment' LookupId='True' />
                <Value Type='Lookup'>${criteria.id}</Value>
            </Eq>
            </Where>
        </Query>
    </View>`

export const mapComment = (comment): any => ({
    id: comment.ID,
    parent: comment.Parent,
    commitment: fromLookup(comment.Commitment),
    text: comment.Text,
    author: comment.Created_x0020_By,
    created: comment.Created_x0020_Date,
})

export const mapComments = (comments): Comment[] => comments.map(mapComment)

export const mapLocation = (location): any => ({
    id: location.ID,
    title: location.Title,
    state: location.State,
    area: location.Area,
})

export const mapLocations = (locations): Location[] => locations.map(mapLocation)

export const mapAnnouncementType = (announcementType): any => ({
    id: announcementType.ID,
    title: announcementType.Title,
    colour: announcementType.Colour,
    sortOrder: announcementType.SortOrder
})

export const mapAnnouncementTypes = (announcementTypes): AnnouncementType[] => announcementTypes.map(mapAnnouncementType)

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
    sortOrder: portfolio.SortOrder,
})

export const mapPortfolios = (portfolios): Portfolio[] => portfolios.map(mapPortfolio)

export const mapCommitment = (data: {
    commitment,
    parties,
    portfolios,
    announcementTypes,
    locations,
    comments?
}): any => {

    const item: any = data.commitment

    return {
        id: item.ID,
        title: item.Title,
        party: data.parties.find(p => fromLookup(item.PoliticalParty).id === p.id),
        description: item.Description,
        cost: item.Cost,
        location: data.locations.find(p => fromLookup(item.Location).id === p.id),
        type: data.announcementTypes.find(p => fromLookup(item.CommitmentType).id === p.id),
        date: item.Date,
        announcedby: item.AnnouncedBy,
        portfolio: data.portfolios.find(p => fromLookup(item.Portfolio).id === p.id),
        comments: data.comments,
        contacts: item.Contacts
    }

}

export const mapCommitments = (data: {
    commitments,
    parties,
    portfolios,
    announcementTypes,
    locations
}): Commitment[] =>
    data.commitments.map((item) => mapCommitment({
        commitment: item,
        parties: data.parties,
        portfolios: data.portfolios,
        announcementTypes: data.announcementTypes,
        locations: data.locations
    }))