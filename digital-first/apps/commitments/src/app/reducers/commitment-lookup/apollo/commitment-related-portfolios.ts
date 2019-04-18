import gql from 'graphql-tag'

export const GET_RELATED_PORTFOLIOS = gql`
{
  relatedPortfolios {
    id
    title
    commitment
    portfolio
    refinerGroup
  }
}
`