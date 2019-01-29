import gql from 'graphql-tag'

export const GET_COMMITMENT_ACTIONS = gql`
query CommitmentActions($commitment: ID!) {
  commitmentActions(commitment: $commitment) {
    id
    title
    description
    costing
    portfolio {
      id
      title
    }
  }
}
`

export const STORE_COMMITMENT_ACTION = gql`
mutation StoreCommitmentAction(
  $id: ID
  $commitment: ID!
  $portfolio: ID!
  $costing: String!
  $description: String!
  ) {
  storeCommitmentAction(id: $id, commitment: $commitment, portfolio: $portfolio, costing: $costing, description: $description) {
    id
    title
  }
}
`
export const REMOVE_COMMITMENT_ACTION = gql`
mutation DeleteCommitmentAction($commitment: ID!, $action: ID! ) {
  deleteCommitmentAction(commitment: $commitment, action: $action) {
    id
    title
  }
}
`