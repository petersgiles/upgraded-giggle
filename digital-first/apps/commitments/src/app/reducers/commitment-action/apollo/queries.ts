import gql from 'graphql-tag'

export const GET_COMMITMENT_ACTIONS = gql`
query CommitmentActions($commitment: ID!) {
  commitmentActions(commitment: $commitment) {
    id
    title
    portfolio {
      id
      title
    }
  }
}
`

export const STORE_COMMITMENT_ACTION = gql`
mutation StoreCommitmentAction($commitment: ID!, $contact: ID!) {
  storeCommitmentAction(commitment: $commitment, contact: $contact) {
    id
    title
  }
}
`
export const REMOVE_COMMITMENT_ACTION = gql`
mutation DeleteCommitmentAction($commitment: ID!, $contact: ID! ) {
  deleteCommitmentAction(commitment: $commitment, contact: $contact) {
    id
    title
  }
}
`