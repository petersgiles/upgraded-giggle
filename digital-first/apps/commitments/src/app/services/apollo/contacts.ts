import gql from 'graphql-tag'

export const GET_CONTACTS = gql`
{
  contacts {
    id
    title
    icon
    colour
  }
}
`