import gql from 'graphql-tag'

export const GET_CONTACTS = gql`
{
  contacts {
    id
    phone
    name
    email
    portfolio {
      id
      title
    }
  }
}
`

export const STORE_CONTACT = gql`
  mutation StoreContact(
    $name: String
    $username: String
    $email: String
    $phone: String
    $portfolio: ID
    $party: ID
  ) {
    storeContact(
      name: $name
      username: $username
      email: $email
      phone: $phone
      portfolio: $portfolio
      party: $party
    ) {
      id
      name
      username
      email
      phone
      portfolio {
        id
        title
      }
      party {
        id
        title
      }
    }
  }
`
