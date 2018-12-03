import gql from 'graphql-tag'

export const SUBSCRIPTION_BY_COMMITMENT = gql`
query Subscription($commitment: ID!, $user: ID!) {
    commitmentSubscription (commitment: $commitment, user: $user) {
      subscriber
      commitment
    }
  }
`

export const ADD_SUBSCRIPTION = gql`

mutation AddSubscription(
  $commitment: ID!
  $subscriber: ID!
) {
  storeCommitmentSubscription(
    commitment: $commitment
    subscriber: $subscriber
  ) {
    id
    title

  }
}
`

export const DELETE_SUBSCRIPTION = gql`
mutation RemoveSubscription(
  $commitment: ID!
  $subscriber: ID!
  ) {
    deleteCommitmentSubscription(commitment: $commitment, subscriber: $subscriber) {
    id
    title
  }
}
`
