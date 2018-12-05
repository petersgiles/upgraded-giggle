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