import gql from 'graphql-tag'

export const SUBSCRIPTION_BY_COMMITMENT = gql`
query Subscription($commitment: ID!) {
    comments(commitment: $commitment) {
      id
      commitment
      text
      created
      parent
      author {
        username
        name
        email
        phone
      }
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
