import gql from 'graphql-tag'

export const GET_CRITICAL_DATES = gql`
{
  criticalDates {
    id
    title
    icon
    colour
  }
}
`
