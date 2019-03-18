import gql from 'graphql-tag'

export const GET_STATUSES = gql`
{
  statuses {
    id
    title
    icon
    colour
  }
}
`
