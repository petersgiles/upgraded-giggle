import { fromLookup, idFromLookup, fromUser } from '@digital-first/df-sharepoint'

import { AnnouncementType } from '../../reducers/announcement-type/announcement-type.model'
import { Party } from '../../reducers/party/party.model'
import { Portfolio } from '../../reducers/portfolio/portfolio.model'
import { Commitment } from '../../reducers/commitment'
import { CommitmentType } from '../../reducers/commitment-type/commitment-type.model'
import { Contact } from '../../reducers/contact/contact.model'
import { Location } from '../../reducers/location/location.model'
import { WhoAnnouncedType } from '../../reducers/who-announced-type/who-announced-type.model'
import { MapPoint } from '../../reducers/map-point/map-point.model'

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

export const mapCommitmentContact = (commitmentContact): any => ({
  id: commitmentContact.ID,
  commitment: idFromLookup(commitmentContact.Commitment),
  contact: idFromLookup(commitmentContact.Contact)
})
export const mapCommitmentContacts = (commitmentContacts): any[] => commitmentContacts.map(mapCommitmentContact)

export const mapCommitmentMapPoint = (commitmentMapPoint): any => ({
  id: commitmentMapPoint.ID,
  commitment: idFromLookup(commitmentMapPoint.Commitment),
  mapPoint: idFromLookup(commitmentMapPoint.MapPoint)
})
export const mapCommitmentMapPoints = (commitmentMapPoints): any[] => commitmentMapPoints.map(mapCommitmentMapPoint)

export const mapComment = (comment): any => {

  const spAuthor = fromUser(comment.Author)

  return {
    id: comment.ID,
    parent: idFromLookup(comment.Parent),
    commitment: fromLookup(comment.Commitment),
    text: comment.Text,
    author: spAuthor,
    created: comment.Created_x0020_Date
  }
}

export const mapComments = (comments): Comment[] => comments.map(mapComment)

export const mapLocation = (location): Location => ({
  id: location.ID,
  title: location.Title
})

export const mapLocations = (locations): Location[] =>
  locations.map(mapLocation)

export const mapMapPoint = (location): MapPoint => ({
  place_id: location.ID,
  address: location.Title,
  latitude: location.Latitude,
  longitude: location.Longitude
})

export const mapMapPoints = (mapPoints): MapPoint[] =>
  mapPoints.map(mapMapPoint)

export const mapContact = (contact): Contact => ({
  id: contact.ID,
  name: contact.Title,
  email: contact.Email,
  phone: contact.Phone

})

export const mapContacts = (contacts): Contact[] => contacts.map(mapContact)

export const mapAnnouncementType = (announcementType): any => ({
  id: announcementType.ID,
  title: announcementType.Title,
  colour: announcementType.Colour,
  sortOrder: announcementType.SortOrder
})

export const mapAnnouncementTypes = (announcementTypes): AnnouncementType[] => announcementTypes.map(mapAnnouncementType)

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

export const mapCommitment = (commitment): Commitment => {
  const item: any = commitment

  const mapped = {
    id: item.ID,
    title: item.Title,
    party: fromLookup(item.PoliticalParty),
    description: item.Description,
    cost: item.Cost,
    location: fromLookup(item.Location),
    whoAnnouncedType: fromLookup(item.WhoAnnouncedType),
    announcementType: fromLookup(item.AnnouncementType),
    commitmentType: fromLookup(item.CommitmentType),
    date: item.Date,
    announcedby: item.AnnouncedBy,
    portfolio: fromLookup(item.Portfolio),
    contacts: []
  }

  return mapped
}

export const mapCommitments = (commitments): Commitment[] => commitments.map(mapCommitment)