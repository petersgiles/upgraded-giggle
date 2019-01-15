import gql from 'graphql-tag'

export const RELATED_LINKS_BY_COMMITMENT = gql`
query CommitmentRelatedLinks($commitment: ID!) {
  commitmentRelatedLinks(commitment: $commitment) {
    id
    commitment
    url
  }
}
`

export const STORE_RELATED_LINK = gql`
mutation StoreRelatedLink($commitment: ID!, $link: string!) {
  storeRelatedLink(commitment: $commitment, link: $link) {
    id
    commitment
    url
  }
}
`
export const REMOVE_RELATED_LINK = gql`
mutation DeleteRelatedLink($id: ID!) {
  deleteRelatedLink(id: $id) {
    commitment
    url
  }
}
`
