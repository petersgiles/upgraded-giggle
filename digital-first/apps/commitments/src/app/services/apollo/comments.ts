import gql from 'graphql-tag'

export const COMMENTS_BY_COMMITMENT = gql`
query Comments($commitment: ID!) {
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

export const ADD_COMMENT = gql`

mutation AddComment(
  $commitment: Int!
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

export const DELETE_COMMENT = gql`
mutation DeleteComment($id: String!) {
  deleteComment(id: $id) {
    id
    commitment
  }
}
`
