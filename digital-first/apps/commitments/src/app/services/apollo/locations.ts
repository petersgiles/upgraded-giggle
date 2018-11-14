import gql from 'graphql-tag'

export const GET_LOCATIONS = gql`
{
  locations {
    id
    title
  }
}
`

export const STORE_COMMITMENT_ELECTORATE = gql`
mutation StoreCommitmentElectorate($commitment: ID!, $electorate: ID!) {
  storeCommitmentElectorate(commitment: $commitment, electorate: $electorate) {
    id
    title
  }
}
`
export const REMOVE_COMMITMENT_ELECTORATE = gql`
mutation DeleteCommitmentElectorate($commitment: ID!, $electorate: ID!) {
  deleteCommitmentElectorate(commitment: $commitment, electorate: $electorate) {
    id
    title
  }
}
`