import gql from 'graphql-tag'

export const GET_ANNOUNCEMENT_TYPES = gql`
{
    announcementType {
    id
    title
    icon
    colour
  }
}
`