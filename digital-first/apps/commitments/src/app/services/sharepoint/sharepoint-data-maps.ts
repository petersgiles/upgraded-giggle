import { fromLookup } from '@digital-first/df-sharepoint'
import { AnnouncementType } from '../../reducers/announcement-type/announcement-type.model'
import { Party } from '../../reducers/party/party.model'
import { Portfolio } from '../../reducers/portfolio/portfolio.model'
import { Commitment } from '../../reducers/commitment/commitment.model'
import { DataResult, CommitmentsResult } from '../../models'

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
  created: comment.Created_x0020_Date
})

export const mapComments = (comments): Comment[] => comments.map(mapComment)

export const mapLocation = (location): any => ({
  id: location.ID,
  title: location.Title,
  state: location.State,
  area: location.Area
})

export const mapLocations = (locations): Location[] =>
  locations.map(mapLocation)

export const mapAnnouncementType = (announcementType): any => ({
  id: announcementType.ID,
  title: announcementType.Title,
  colour: announcementType.Colour,
  sortOrder: announcementType.SortOrder
})

export const mapAnnouncementTypes = (announcementTypes): AnnouncementType[] =>
  announcementTypes.map(mapAnnouncementType)

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

export const mapPortfolios = (portfolios): Portfolio[] =>
  portfolios.map(mapPortfolio)

export const mapCommitment = (commitment): Commitment => {
  const item: any = commitment

  const mapped = {
    id: item.ID,
    title: item.Title,
    party: fromLookup(item.PoliticalParty).id,
    description: item.Description,
    cost: item.Cost,
    location: fromLookup(item.Location).id,
    announcementType: fromLookup(item.CommitmentType).id,
    commitmentType: fromLookup(item.CommitmentType).id,
    date: item.Date,
    announcedby: item.AnnouncedBy,
    portfolio: fromLookup(item.Portfolio).id,
    contacts: item.Contacts
  }

  // tslint:disable-next-line:no-console
  console.log('Map Commitment =>', item, mapped)
  return mapped
}

export const mapCommitments = (spData): Commitment[] => spData.map(mapCommitment)