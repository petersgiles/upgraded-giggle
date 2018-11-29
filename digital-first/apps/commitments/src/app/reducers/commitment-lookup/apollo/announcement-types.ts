import gql from 'graphql-tag'

export const GET_ANNOUNCEMENT_TYPES = gql`
{
  announcementTypes {
    id
    title
    icon
    colour
  }
}
`