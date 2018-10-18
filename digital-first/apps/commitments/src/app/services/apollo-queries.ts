import gql from 'graphql-tag'

export const GET_COMMITMENT = gql`
query Commitment($id: Int!) {
  commitment(id: $id) {
    id
    title
    description
    cost
    location {
      id
      title
      state
      area
    }
    date
    announcedby
    party {
      id
      title
      icon
      colour
    }
    type {
      id
      title
      icon
      colour
    }
    portfolio {
      id
      title
      icon
      colour
    }
    contacts
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
  parties {
    id
    title
    icon
    colour
  }
  announcementTypes {
    id
    title
    icon
    colour
  }
  locations {
    id
    title
  }
  portfolios {
    id
    title
    icon
    colour
  }
}
`

export const UPSERT_COMMITMENT = gql`
mutation Commitment(
      $id: Int!,
      $title: String!,
      $description: String!,
      $party: ID
      $cost: String
      $location: ID,
      $type: ID,
      $date: String,
      $announcedby: String,
      $portfolio: ID,
  		$contacts: String
    ) {
  upsertCommitment(
    id: $id
    title: $title
    description: $description
    party: $party
    cost: $cost
    location: $location
    type: $type
    date: $date
    announcedby: $announcedby
    portfolio: $portfolio,
    contacts: $contacts
  ) {
    id
    title
    description
    cost
    location {
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
    type {
      id
      title
      icon
      colour
    }
    portfolio {
      id
      title
      icon
      colour
    }
    contacts
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
    description
    cost
    location {
      id
      title
      state
      area
    }
    date
    announcedby
    party {
      id
      title
      icon
      colour
    }
    type {
      id
      title
      icon
      colour
    }
    portfolio {
      id
      title
      icon
      colour
    }
    contacts
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
  parties {
    id
    title
    icon
    colour
  }
  locations {
    id
    title
  }
  announcementTypes {
    id
    title
    icon
    colour
  }
  portfolios {
    id
    title
    icon
    colour
  }
}
`

export const ADD_COMMENT = gql`
mutation AddComment(
  $commitment: Int!
  $parent: String
  $text: String!
  $author: String!
  $created: String!
) {
  addComment(
    commitment: $commitment
    parent: $parent
    text: $text
    author: $author
    created: $created
  ) {
    id
    commitment
  }
}

`

export const DELETE_COMMENT = gql`
mutation DeleteComment(
  $id: String!
  $commitment: Int!
) {
  deleteComment(
  	id: $id
    commitment: $commitment
  ) {
    id
    commitment
  }
}

`