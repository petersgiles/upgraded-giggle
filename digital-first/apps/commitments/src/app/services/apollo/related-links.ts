import gql from 'graphql-tag'

export const RELATED_LINKS_BY_COMMITMENT = gql`
query CommitmentRelatedLinks($commitment: ID!) {
  commitmentRelatedLinks(commitment: $commitment) {
   id
   title
  }
}
`

export const STORE_RELATED_LINK = gql`
mutation StoreRelatedLink($commitment: ID!, $link: string!) {
  storeRelatedLink(commitment: $commitment, link: $link) {
    id
    title
  }
}
`
export const REMOVE_RELATED_LINK = gql`
mutation DeleteRelatedLink($commitment: ID!, $link: string!) {
  deleteRelatedLink(commitment: $commitment, link: $link) {
    id
    title
  }
}
`
