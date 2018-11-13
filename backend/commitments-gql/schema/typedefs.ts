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

type WhoAnnouncedType {
    id: ID,
    title: String,
    description: String,
    sortorder: String,
    colour: String,
    icon: String,
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
  username: String
  email: String
  phone: String,
  ccid: ID,
  portfolio: Portfolio
}

type Electorate {
    id: ID,
    title: String,
    state: String, 
    area: String
}

type Tag {
    id: ID,
    caption: String
}

  type CommitmentContact {
    commitment: Commitment,
    contact: Contact
  }

   type MapPoint {
    place_id: String
    address: String
    latitude: Int
    longitude: Int
  }

  type CommitmentMapPoint {
    commitment: Commitment,
    mapPoint: MapPoint
  }

  # This "Commitment" type can be used in other type declarations.
  type Commitment {
    id: ID,
    title: String,
    party: PoliticalParty,
    description: String,
    cost: String,
    location: Electorate,
    announcementType: AnnouncementType,
    whoAnnouncedType: WhoAnnouncedType,
    commitmentType: CommitmentType
    date: String,
    announcedby: String,
    portfolio: Portfolio,
    mapPoints: [CommitmentMapPoint],
    contacts: [Contact]
    tags: [Tag]
    comments: [Comment]
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    commitments: [Commitment],
    commitment(id: ID!): Commitment,
    commitmentContacts(commitment: ID!): [Contact],
    commitmentMapPoints(commitment: ID!): [MapPoint],
    parties: [PoliticalParty],
    portfolios: [Portfolio],
    mapPoints: [MapPoint],
    announcementTypes: [AnnouncementType],
    commitmentTypes: [CommitmentType]
    whoAnnouncedTypes: [WhoAnnouncedType]
    locations: [Electorate],
    contacts: [Contact],
    comments(commitment: ID!):  [Comment],
    tags:[Tag]
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
      announcementType: ID,
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
      username: String,
      email: String,
      phone: String,
      portfolio: ID): Contact,
    deleteContact(id:  ID!): Contact,
    storeCommitmentContact(commitment: ID!, contact: ID!): Commitment,
    deleteCommitmentContact(id: ID!): Commitment,
    }

`;