import gql from 'graphql-tag'

export const GET_COMMITMENT_CONTACTS = gql`
query CommitmentContacts($commitment: ID!) {
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
mutation StoreCommitmentContact($commitment: ID!, $contact: ID!) {
  storeCommitmentContact(commitment: $commitment, contact: $contact) {
    id
    title
  }
}
`
export const REMOVE_COMMITMENT_CONTACT = gql`
mutation DeleteCommitmentContact($id: ID!, ) {
  deleteCommitmentContact(id: $id) {
    id
    title
  }
}
`