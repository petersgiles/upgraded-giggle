import { gql } from 'apollo-server';

export const typeDefs = gql`

  type Artifact {
    id: Int
    title: String
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
    artifacts: [Artifact]
  }

  # The mutation root type, used to define all mutations.
  type Mutation {
    removeArtifact(
      id: ID!
    ): [Artifact],
    storeArtifact( 
      title: String,
     ): [Artifact],
  }

`;