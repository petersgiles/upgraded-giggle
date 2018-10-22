import gql from 'graphql-tag'

export const GET_LOCATIONS = gql`
{
  locations {
    id
    title
  }
}
`