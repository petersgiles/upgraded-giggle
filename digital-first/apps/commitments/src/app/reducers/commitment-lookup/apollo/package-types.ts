import gql from 'graphql-tag'

export const GET_PACKAGE_TYPES = gql`
{
  packageTypes {
    id
    title
    icon
    colour
  }
}
`