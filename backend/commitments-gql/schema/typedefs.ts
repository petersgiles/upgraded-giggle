import { gql } from 'apollo-server';


export const typeDefs = gql`

type Comment {
  id: String
  parent: String
  commitment: Int!
  text: String
  author: Contact
  created: String
}

type PoliticalParty {
    id: String,
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
    id: String,
    title: String,
    description: String,
    sortorder: String,
    colour: String,
    icon: String,
}

type CommitmentType {
    id: String,
    title: String,
    description: String,
    sortorder: String,
    colour: String,
    icon: String,
}

type Portfolio {
    id: String,
    title: String,
    description: String,
    sortorder: String,
    colour: String,
    icon: String,
}

type Contact {
  id: String,
  name: String
  username: String
  email: String
  phone: String,
  portfolio: Portfolio
}

type Electorate {
    id: String,
    title: String,
    state: String, 
    area: String
}

type Tag {
    id: String,
    caption: String
}


  # This "Commitment" type can be used in other type declarations.
  type Commitment {
    id: Int,
    title: String,
    party: PoliticalParty,
    description: String,
    cost: String,
    location: Electorate,
    announcementType: AnnouncementType,
    commitmentType: CommitmentType
    date: String,
    announcedby: String,
    portfolio: Portfolio,
    contacts: [Contact]
    tags: [Tag]
    comments: [Comment]
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    commitments: [Commitment],
    commitment(id: Int!): Commitment,
    parties: [PoliticalParty],
    portfolios: [Portfolio],
    announcementTypes: [AnnouncementType],
    commitmentTypes: [CommitmentType]
    locations: [Electorate],
    contacts: [Contact],
    comments(commitment: Int!):  [Comment],
    tags:[Tag]
  }

  # The mutation root type, used to define all mutations.
  type Mutation {
    upsertCommitment( 
      id: Int!,
      title: String!,
      description: String!,
      party: ID
      cost: String
      location: ID,
      announcementType: ID,
      commitmentType: ID,
      date: String,
      announcedby: String,
      portfolio: ID,
      contacts: String
      ): Commitment,
    addComment(
      commitment: Int!,
      parent: String,
      text: String!,
      author: String!,
      created: String!
    ): Comment,
    deleteComment(
      id: String!,
      commitment: Int!
    ): Comment
    }

`;