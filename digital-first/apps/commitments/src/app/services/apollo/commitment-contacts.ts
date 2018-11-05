import gql from 'graphql-tag'

export const GET_COMMITMENT_CONTACTS = gql`
  query CommitmentContacts($commitment: ID!) {
  commitmentContacts(commitment: $commitment) {
    id
    phone
    name
    email
    portfolio {
      id
      title
    }
  }
}
`

export const STORE_COMMITMENT_CONTACT = gql`
mutation StoreCommitmentContact($commitment: ID!, $contact: ID!) {
  storeCommitmentContact(commitment: $commitment, contact: $contact) {
    id
    title
  }
}
`
