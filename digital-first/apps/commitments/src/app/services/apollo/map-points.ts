import gql from 'graphql-tag'

export const GET_MAP_POINTS = gql`
{
  mapPoints {
    place_id
    address
    latitude
    longitude
  }
}
`

export const STORE_COMMITMENT_MAP_POINT = gql`
mutation StoreCommitmentContact($commitment: ID!, $mapPoint: ID!) {
  storeCommitmentMapPoint(commitment: $commitment, mapPoint: $mapPoint) {
    id
    title
  }
}
`
export const REMOVE_COMMITMENT_MAP_POINT = gql`
mutation DeleteCommitmentContact($id: ID!, ) {
  deleteCommitmentMapPoint(id: $id) {
    id
    title
  }
}
`