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

export const STORE_MAP_POINT = gql`
mutation StoreMapPoint($place_id: String!, $latitude: Float!, $longitude: Float!, $address: String!) {
  storeMapPoint(place_id: $place_id, latitude: $latitude, longitude: $longitude, address: $address) {
    address
    latitude
    longitude
    place_id
  }
}
`
export const REMOVE_MAP_POINT = gql`
mutation DeleteMapPoint($place_id: String!) {
  deleteMapPoint(mapPoint: $mapPoint) {
    address
    latitude
    longitude
    place_id
  }
}
`

export const STORE_COMMITMENT_MAP_POINT = gql`
mutation StoreCommitmentMapPoint($commitment: ID!, $mapPoint: ID!) {
  storeCommitmentMapPoint(commitment: $commitment, mapPoint: $mapPoint) {
    id
    title
  }
}
`
export const REMOVE_COMMITMENT_MAP_POINT = gql`
mutation DeleteCommitmentMapPoint($commitment: ID!, $mapPoint: ID!) {
  deleteCommitmentMapPoint(commitment: $commitment, mapPoint: $mapPoint) {
    id
    title
  }
}
`

export const MAP_POINTS_BY_COMMITMENT = gql`
query CommitmentMapPoints($commitment: ID!) {
  commitmentMapPoints(commitment: $commitment) {
    place_id
    latitude
    longitude
    address
  }
}
`