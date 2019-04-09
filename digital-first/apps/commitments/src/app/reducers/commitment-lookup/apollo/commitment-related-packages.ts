import gql from 'graphql-tag'

export const GET_RELATED_PACKAGES = gql`
{
  relatedPackages {
    id
    title
    commitment
    package
    refinerGroup
  }
}
`