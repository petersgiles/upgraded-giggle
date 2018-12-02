import gql from 'graphql-tag'

export const GET_PORTFOLIOS = gql`
{
  portfolios {
    id
    title
    icon
    colour
  }
}
`