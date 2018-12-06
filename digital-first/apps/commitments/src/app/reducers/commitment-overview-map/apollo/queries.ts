import gql from 'graphql-tag'

export const GET_MAPPOINTS = gql `
{
  mapPoints {
    place_id
    longitude
    latitude
    address
  }
}`

export const GET_MAPPOINT_COMMITMENTS = gql `
query MapPointCommitments($mapPoint: ID!) {
  mapPointCommitments(mapPoint: $mapPoint) {
  	id
    title
  }
}`