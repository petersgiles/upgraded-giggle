import gql from 'graphql-tag'

export const GET_COMMITMENT_TYPES = gql`
{
  commitmentTypes {
    id
    title
    icon
    colour
  }
}
`