import gql from 'graphql-tag'

export const GET_COMMITMENT = gql`
  query Commitment($id: ID!) {
  commitment(id: $id) {
    id
    title
    description
    cost
    contacts {
      id
      ccid
      phone
      name
      email
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
    announcementType {
      id
      title
      icon
      colour
    }
    portfolios {
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

export const UPSERT_COMMITMENT = gql`
mutation Commitment(
  $id: ID
  $title: String!
  $description: String!
  $party: ID
  $cost: String
  $location: ID
  $announcementType: ID
  $whoAnnouncedType: ID
  $commitmentType: ID
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
    cost: $cost
    location: $location
    announcementType: $announcementType
    whoAnnouncedType: $whoAnnouncedType
    commitmentType: $commitmentType
    date: $date
    announcedby: $announcedby
    portfolio: $portfolio
    contacts: $contacts
  ) {
    id
    title
    description
    cost
    contacts {
      id
      ccid
      phone
      name
      email
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
    announcementType {
      id
      title
      icon
      colour
    }
    portfolios {
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
      announcementType {
        id
      }
      portfolios {
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