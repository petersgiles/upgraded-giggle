import gql from 'graphql-tag'

export const GET_COMMITMENT_CONTACTS = gql`
query CommitmentActions($commitment: ID!) {
  commitmentContacts(commitment: $commitment) {
    id
    jobTitle
    firstName
    username
    email
    phone
    portfolio {
      id
      title
    }
  }
}
`

export const STORE_COMMITMENT_CONTACT = gql`
mutation StoreCommitmentAction($commitment: ID!, $contact: ID!) {
  storeCommitmentAction(commitment: $commitment, contact: $contact) {
    id
    title
  }
}
`
export const REMOVE_COMMITMENT_CONTACT = gql`
mutation DeleteCommitmentAction($commitment: ID!, $contact: ID! ) {
  deleteCommitmentAction(commitment: $commitment, contact: $contact) {
    id
    title
  }
}
`