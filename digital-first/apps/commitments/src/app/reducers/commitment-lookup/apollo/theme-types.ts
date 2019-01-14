import gql from 'graphql-tag'

export const GET_THEME_TYPES = gql`
{
  themeTypes {
    id
    title
    icon
    colour
  }
}
`