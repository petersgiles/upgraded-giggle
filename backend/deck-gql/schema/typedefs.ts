import { gql } from 'apollo-server';

export const typeDefs = gql`

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type DeckCardPresentation {
    id: ID!
    description: String!
  }

  type DeckCardMedia {
    id: ID!
  }

  type DeckCardAction {
    id: ID!
    description: String!
    action: String!
  }

  type DeckCardActionButton {
    id: ID!
    text: String!
    action: DeckCardAction
  }

  type DeckCardActionIcon {
    id: ID!
    text: String!
    action: DeckCardAction
  }

  type DeckCard {
    id: ID!
    thumbnail: String
    title: String!
    subTitle: String
    supportingText: String
    parentId: ID
    order: Int!
    presentation: DeckCardPresentation
    buttons: [DeckCardActionButton]
    icons: [DeckCardActionIcon]
  }

  input DeckCardInput {
    id: ID
    thumbnail: String
    title: String!
    subTitle: String
    supportingText: String
    parentId: ID
    order: Int!
    # presentation: DeckCardPresentation
    # buttons: [DeckCardActionButton]
    # icons: [DeckCardActionIcon]
  }

  type StoreDeckCardMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    card: DeckCard
  }

  type RemoveDeckCardMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    cards(parentId: ID): [DeckCard]
  }

  # The mutation root type, used to define all mutations.
  type Mutation {
    storeCard( 
      card: DeckCardInput,
     ): StoreDeckCardMutationResponse,
    removeCard(
      id: ID!
    ): RemoveDeckCardMutationResponse
  }
`;