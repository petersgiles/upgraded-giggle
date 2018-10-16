import { gql } from 'apollo-server';

export const typeDefs = gql`

  type Artifact {
    id: Int
  }

  # The "Query" type is the root of all GraphQL queries.
  type Query {
  
  }

  # The mutation root type, used to define all mutations.
  type Mutation {
   
  }

`;