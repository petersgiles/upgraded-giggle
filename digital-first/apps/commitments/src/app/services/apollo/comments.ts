import gql from 'graphql-tag'

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
  }
}
`

export const DELETE_COMMENT = gql`
mutation DeleteComment($id: String!, $commitment: Int!) {
  deleteComment(id: $id, commitment: $commitment) {
    id
    commitment
  }
}
`
