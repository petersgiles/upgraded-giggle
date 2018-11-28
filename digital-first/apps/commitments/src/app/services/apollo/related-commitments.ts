import gql from 'graphql-tag'

export const RELATED_COMMITMENTS_BY_COMMITMENT = gql`
query CommitmentRelatedCommitments($commitment: ID!) {
  commitmentRelatedCommitments(commitment: $commitment) {
   id
   title
  }
}
`

export const STORE_RELATED_COMMITMENT = gql`
mutation StoreRelatedCommitment($commitment: ID!, $relatedTo: ID!) {
  storeRelatedCommitment(commitment: $commitment, relatedTo: $relatedTo) {
    id
    title
  }
}
`
export const REMOVE_RELATED_COMMITMENT = gql`
mutation DeleteRelatedCommitment($commitment: ID!, $relatedTo: ID!) {
  deleteRelatedCommitment(commitment: $commitment, relatedTo: $relatedTo) {
    id
    title
  }
}
`
