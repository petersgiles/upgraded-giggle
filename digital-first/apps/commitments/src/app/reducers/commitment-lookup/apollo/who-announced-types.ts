import gql from 'graphql-tag'

export const GET_WHO_ANNOUNCED_TYPES = gql`
{
  whoAnnouncedTypes {
    id
    title
    icon
    colour
  }
}
`