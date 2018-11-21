import gql from 'graphql-tag'

export const GET_CRITICAL_DATES = gql`
{
  announcementTypes {
    id
    title
    icon
    colour
  }
}
`
