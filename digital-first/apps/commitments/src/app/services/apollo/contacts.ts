import gql from 'graphql-tag'

export const GET_CONTACTS = gql`
{
  contacts {
    id
    name
    username
    email
    jobTitle
    firstName
    phone
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
  $jobTitle: String
  $firstName: String
  $username: String
  $email: String
  $phone: String
  $portfolio: ID
  $party: ID
) {
  storeContact(
    name: $name
    username: $username
    jobTitle: $jobTitle
    firstName: $firstName
    email: $email
    phone: $phone
    portfolio: $portfolio
    party: $party
  ) {
    id
    name
    username
    email
    jobTitle
    firstName
    phone
    portfolio {
      id
      title
    }
  }
}
`
