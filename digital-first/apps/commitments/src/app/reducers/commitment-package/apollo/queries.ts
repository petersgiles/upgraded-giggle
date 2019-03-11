import gql from 'graphql-tag'

export const GET_COMMITMENT_PACKAGES = gql`
query CommitmentPackages($commitment: ID!) {
  commitmentPackages(commitment: $commitment) {
    id
    title
  }
}
`

export const STORE_COMMITMENT_PACKAGE = gql`
mutation StoreCommitmentPackage($commitment: ID!, $mypackage: ID!) {
  storeCommitmentPackage(commitment: $commitment, package: $mypackage) {
    id
    title
  }
}
`
export const REMOVE_COMMITMENT_PACKAGE = gql`
mutation DeleteCommitmentPackage($commitment: ID!, $mypackage: ID! ) {
  deleteCommitmentPackage(commitment: $commitment, package: $mypackage) {
    id
    title
  }
}
`
