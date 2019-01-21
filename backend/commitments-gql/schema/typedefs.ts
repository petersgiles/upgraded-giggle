import { gql } from 'apollo-server';


export const typeDefs = gql`

type Comment {
  id: ID
  parent: String
  commitment: Int!
  text: String
  author: Contact
  created: String
}

type PoliticalParty {
    id: ID,
    title: String,
    description: String,
    sortorder: String,
    colour: String,
    icon: String,
    abbr:  String,
    leader:  String,
    position:  String,
    ideology:  String,
    mps:  String,
    senators: String
}

type AnnouncementType {
    id: ID,
    title: String,
    description: String,
    sortorder: String,
    colour: String,
    icon: String,
}

type CriticalDate {
    id: ID,
    title: String,
    description: String,
    sortorder: String,
    colour: String,
    icon: String,
}

type WhoAnnouncedType {
    id: ID,
    title: String,
    description: String,
    sortorder: String,
    colour: String,
    icon: String,
}

type ThemeType {
    id: ID,
    title: String,
    description: String,
    sortorder: String,
    colour: String,
    icon: String,
    party: PoliticalParty,
}

type PackageType {
    id: ID,
    title: String,
    description: String,
    sortorder: String,
    colour: String,
    icon: String,
    party: PoliticalParty,
}

type CommitmentType {
    id: ID,
    title: String,
    description: String,
    sortorder: String,
    colour: String,
    icon: String,
}

type Portfolio {
    id: ID,
    title: String,
    description: String,
    sortorder: String,
    colour: String,
    icon: String,
}

type Contact {
  id: ID,
  name: String
  jobTitle: String
  firstName: String
  username: String
  email: String
  phone: String,
  ccid: ID,
  portfolio: Portfolio
  party: PoliticalParty
}

type Electorate {
    id: ID,
    title: String,
    group: String, 
    area: String
}

type Tag {
    id: ID,
    caption: String
}

type CommitmentAction {
  id: ID,
  commitment: Commitment
  portfolio: Portfolio
  title: String
  description: String
  actionType: Int
}

  type CommitmentContact {
    commitment: Commitment,
    contact: Contact
  }

   type MapPoint {
    place_id: String
    address: String
    latitude: Float
    longitude: Float
  }

  type CommitmentMapPoint {
    commitment: Commitment,
    mapPoint: MapPoint
  }

  type CommitmentElectorate {
    commitment: Commitment,
    electorate: Electorate
  }

  type CommitmentPortfolio {
    commitment: Commitment,
    portfolio: Portfolio
  }

  type RelatedCommitment {
    commitment: ID,
    relatedTo: ID
  }

  type RelatedLink {
    id: ID,
    commitment: ID,
    url: String
  }

  type GroupPermission {
    id: ID,
    group: String,
    component: String,
    rights: String
  }
  
  type Subscription {
    Title: String
    commitment: ID,
    subscriber: ID
  }

  # This "Commitment" type can be used in other type declarations.
  type Commitment {
    id: ID,
    title: String,
    description: String,
    cost: String,
    date: String,
    criticalDate: CriticalDate,
    announcedby: String,
    party: PoliticalParty,
    whoAnnouncedType: WhoAnnouncedType,
    announcementType: AnnouncementType,
    commitmentType: CommitmentType,
    themeType: ThemeType,
    packageType: PackageType,
    portfolio: Portfolio,
    electorates: [Electorate],
    comments: [Comment],
    contacts: [Contact],
    mapPoints: [MapPoint],
    tags: [Tag]
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    commitments: [Commitment],
    commitment(id: ID!): Commitment,
    commitmentActions(commitment: ID!): [CommitmentAction],
    commitmentContacts(commitment: ID!): [Contact],
    commitmentMapPoints(commitment: ID!): [MapPoint],
    commitmentPortfolios(commitment: ID!): [Portfolio],
    commitmentElectorates(commitment: ID!): [Electorate],
    commitmentRelatedCommitments(commitment: ID!): [Commitment],
    commitmentRelatedLinks(commitment: ID!): [RelatedLink],
    mapPointCommitments(mapPoint: ID!) : [Commitment],
    parties: [PoliticalParty],
    portfolios: [Portfolio],
    criticalDates: [CriticalDate],
    mapPoints: [MapPoint],
    themeTypes: [ThemeType],
    packageTypes: [PackageType],
    relatedCommitment: [RelatedCommitment],
    relatedLinks: [RelatedLink],
    commitmentSubscription(commitment: ID!, user: ID!): [Subscription]
    announcementTypes: [AnnouncementType],
    commitmentTypes: [CommitmentType]
    whoAnnouncedTypes: [WhoAnnouncedType]
    contacts: [Contact],
    comments(commitment: ID!): [Comment],
    locations: [Electorate],
    tags:[Tag],
    groupPermissions: [GroupPermission],
  }

  # The mutation root type, used to define all mutations.
  type Mutation {
    upsertCommitment( 
      id: ID,
      title: String!,
      description: String!,
      party: ID
      cost: String
      location: ID,
      whoAnnouncedType: ID,
      themeType: ID,
      packageType: ID,
      announcementType: ID,
      criticalDate: ID,
      commitmentType: ID,
      date: String,
      announcedby: String,
      portfolio: ID,
      contacts: String
      ): Commitment,
    addComment(
      commitment: ID!,
      parent: String,
      text: String!,
      author: String!,
      created: String!
    ): Comment,
    deleteComment(
      id: ID!
    ): Comment,
    storeContact( 
      name: String,
      jobTitle: String
      firstName: String
      username: String,
      email: String,
      phone: String,
      portfolio: ID,
      party: ID): Contact,
    deleteContact(id:  ID!): Contact,
    storeCommitmentContact(commitment: ID!, contact: ID!): Commitment,
    deleteCommitmentContact(commitment: ID!, contact: ID!): Commitment,
    storeCommitmentAction(id: ID
      commitment: ID!,
      portfolio: ID!
      description: String!): Commitment,
    deleteCommitmentAction(commitment: ID!, action: ID!): Commitment,
    storeMapPoint(place_id: String!, latitude: Float!, longitude: Float!, address: String!): MapPoint,
    deleteMapPoint(place_id: String!): MapPoint,
    storeCommitmentMapPoint(commitment: ID!, mapPoint: ID!): Commitment,
    deleteCommitmentMapPoint(commitment: ID!, mapPoint: ID!): Commitment,
    storeCommitmentElectorate(commitment: ID!, electorate: ID!): Commitment,
    deleteCommitmentElectorate(commitment: ID!, electorate: ID!): Commitment,
    storeRelatedCommitment(commitment: ID!, relatedTo: ID!): Commitment,
    deleteRelatedCommitment(commitment: ID!, relatedTo: ID!): Commitment,
    storeRelatedLink(commitment: ID!, url: String!): Commitment,
    deleteRelatedLink(id: ID!): Commitment,
    storeCommitmentPortfolio(commitment: ID!, portfolio: ID!): Commitment,
    deleteCommitmentPortfolio(id: ID!): Commitment,
    storeCommitmentSubscription(commitment: ID!, subscriber: ID!): Commitment,
    deleteCommitmentSubscription(commitment: ID!, subscriber: ID!): Commitment,
    }

`;