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

export const GET_COMMITMENT_MAPPOINTS = gql `
{
  allCommitmentMapPoints {
    mapPoint {
      place_id
      address
    }
    commitment {
      id
      title
    }
  }
}`

export const GET_MAPPOINT_COMMITMENTS = gql `
query MapPointCommitments($mapPoint: ID!) {
  mapPointCommitments(mapPoint: $mapPoint) {
    id
    title
    criticalDate {
      id
      title
    }
    portfolio {
      id
      title
    }
    party {
      id
      title
    }
    commitmentType {
      id
      title
    }
  }
}`