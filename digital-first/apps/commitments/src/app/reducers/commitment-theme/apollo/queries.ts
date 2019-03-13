import gql from 'graphql-tag'

export const GET_COMMITMENT_THEMES = gql`
query CommitmentTheme($commitment: ID!) {
  commitmentThemes(commitment: $commitment) {
    id
    title
  }
}
`

export const STORE_COMMITMENT_THEME = gql`
mutation StoreCommitmentTheme($commitment: ID!, $theme: ID!) {
  storeCommitmentTheme(commitment: $commitment, theme: $theme) {
    id
    title
  }
}
`
export const REMOVE_COMMITMENT_THEME = gql`
mutation DeleteCommitmentTheme($commitment: ID!, $theme: ID! ) {
  deleteCommitmentTheme(commitment: $commitment, theme: $theme) {
    id
    title
  }
}
`
