import gql from 'graphql-tag'

export const GET_COMMITMENT_ACTIONS = gql`
query CommitmentActions($commitment: ID!) {
  commitmentActions(commitment: $commitment) {
    id
    title
    description
    portfolio {
      id
      title
    }
  }
}
`

export const STORE_COMMITMENT_ACTION = gql`
mutation StoreCommitmentAction($commitment: ID!, $action: ID!) {
  storeCommitmentAction(commitment: $commitment, action: $action) {
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