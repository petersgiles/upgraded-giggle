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
  $parent: String
  $text: String!
  $author: String!
  $created: String!
) {
  addComment(
    commitment: $commitment
    parent: $parent
    text: $text
    author: $author
    created: $created
  ) {
    id
    commitment
    parent
    text
  }
}
`

export const DELETE_SUBSCRIPTION = gql`
mutation DeleteComment($id: ID!) {
  deleteComment(id: $id) {
    id
    commitment
  }
}
`
