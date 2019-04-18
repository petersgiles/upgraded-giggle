import gql from 'graphql-tag'

export const GET_COMMITMENT = gql`
  query Commitment($id: ID!) {
  commitment(id: $id) {
    id
    title
    description
    status
    {
      id
      title
    }
    cost
    costingRequired
    portfolio {
        id
        title
      }
    contacts {
      id
      ccid
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
    electorates {
      id
      title
    }
    date
    announcedby
    party {
      id
      title
      icon
      colour
    }
    commitmentType {
      id
      title
      icon
      colour
    }
    whoAnnouncedType {
      id
      title
      icon
      colour
    }
    criticalDate {
      id
      title
      icon
      colour
    }
    announcementType {
      id
      title
      icon
      colour
    }
    packageType {
      id
      title
      icon
      colour
    }
    mapPoints {
      place_id
      latitude
      longitude
      address
    }
    comments {
      id
      commitment
      text
      created
      parent
      author {
        username
        name
        email
        phone
      }
    }
  }
}
`

export const UPSERT_COMMITMENT = gql`
mutation Commitment(
  $id: ID
  $title: String!
  $description: String!
  $party: ID
  $status: String
  $cost: String
  $costingRequired: Boolean
  $location: ID
  $announcementType: ID
  $criticalDate: ID
  $whoAnnouncedType: ID
  $commitmentType: ID
  $packageType: ID
  $date: String
  $announcedby: String
  $portfolio: ID
  $contacts: String
) {
  upsertCommitment(
    id: $id
    title: $title
    description: $description
    party: $party
    status: $status
    cost: $cost
    costingRequired: $costingRequired
    location: $location
    announcementType: $announcementType
    criticalDate: $criticalDate
    whoAnnouncedType: $whoAnnouncedType
    commitmentType: $commitmentType
    packageType: $packageType
    date: $date
    announcedby: $announcedby
    portfolio: $portfolio
    contacts: $contacts
  ) {
    id
    title
    description
    cost
    costingRequired
    contacts {
      id
      ccid
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
    electorates {
      id
      title
    }
    date
    announcedby
    party {
      id
      title
      icon
      colour
    }
    commitmentType {
      id
      title
      icon
      colour
    }
    whoAnnouncedType {
      id
      title
      icon
      colour
    }
    criticalDate {
      id
      title
      icon
      colour
    }
    announcementType {
      id
      title
      icon
      colour
    }
    packageType {
      id
      title
      icon
      colour
    }
    portfolio {
        id
        title
      }
    mapPoints {
      place_id
      latitude
      longitude
      address
    }
    comments {
      id
      commitment
      text
      created
      parent
      author {
        username
        name
        email
        phone
      }
    }
  }
}
`
export const GET_ALL_COMMITMENTS = gql`
{
  commitments {
    id
    title
    costingRequired
    status
    {
      id
    }
    electorates {
      id
    }
    date
    announcedby
    party {
      id
    }
    commitmentType {
      id
    }
    criticalDate {
      id
    }
    announcementType {
      id
    }
    packageType {
      id
    }
    portfolio {
      id
    }
    whoAnnouncedType {
      id
    }
    contacts {
      id
    }
    mapPoints {
      place_id
    }
  }
}
`

export const SET_COSTING_REQUIRED = gql`
 mutation SetCostingRequired(
    $id: ID!, 
    $costingRequired: Boolean!
    ){
    setCostingRequired(
    id: $id
    costingRequired: $costingRequired
  ){
    id
  }
  }
`
