import gql from 'graphql-tag'

export const GET_PARTIES = gql`
{
  parties {
    id
    title
    icon
    colour
  }
}
`