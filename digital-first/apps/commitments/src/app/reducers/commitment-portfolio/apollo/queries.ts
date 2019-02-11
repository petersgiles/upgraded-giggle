import gql from 'graphql-tag'

export const GET_COMMITMENT_PORTFOLIOS = gql`
query CommitmentPortfolios($commitment: ID!) {
  commitmentPortfolios(commitment: $commitment) {
    id
    title
  }
}
`

export const STORE_COMMITMENT_PORTFOLIO = gql`
mutation StoreCommitmentPortfolio($commitment: ID!, $portfolio: ID!) {
  storeCommitmentPortfolio(commitment: $commitment, portfolio: $portfolio) {
    id
    title
  }
}
`
export const REMOVE_COMMITMENT_PORTFOLIO = gql`
mutation DeleteCommitmentPortfolio($commitment: ID!, $portfolio: ID! ) {
  deleteCommitmentPortfolio(commitment: $commitment, portfolio: $portfolio) {
    id
    title
  }
}
`