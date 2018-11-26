import gql from 'graphql-tag'

export const RELATED_COMMITMENTS_BY_COMMITMENT = gql`
query CommitmentRelatedCommitments($commitment: ID!) {
  commitmentRelatedCommitments(commitment: $commitment) {
   id
  }
}
`