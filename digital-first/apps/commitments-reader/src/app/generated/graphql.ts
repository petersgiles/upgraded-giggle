export type Maybe<T> = T | null

export interface CommitmentRefinementInput {
  text?: Maybe<string>

  tags?: Maybe<(Maybe<string>)[]>
}

export interface MapPointInput {
  place_id: string

  address: string

  latitude: number

  longitude: number
}

export interface CommitmentMapPointInput {
  commitment?: Maybe<string>

  mapPoint?: Maybe<string>
}

export interface CommitmentInput {
  id?: Maybe<string>

  title: string

  description?: Maybe<string>

  cost?: Maybe<string>

  date?: Maybe<string>

  announcedby?: Maybe<string>
}

export interface TagInput {
  id?: Maybe<string>

  title: string

  description?: Maybe<string>

  sortorder?: Maybe<string>

  colour?: Maybe<string>

  icon?: Maybe<string>

  parent?: Maybe<string>
}

export enum Role {
  Guest = 'GUEST',
  User = 'USER',
  Admin = 'ADMIN'
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Date = any

/** The `Upload` scalar type represents a file upload. */
export type Upload = any

// ====================================================
// Documents
// ====================================================

export namespace GetRefinerTags {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    refiners: Maybe<(Maybe<Refiners>)[]>
  }

  export type Refiners = {
    __typename?: 'Refiner'

    id: string

    title: Maybe<string>

    expanded: Maybe<boolean>

    selected: Maybe<boolean>

    groupId: Maybe<string>

    children: Maybe<(Maybe<Children>)[]>
  }

  export type Children = {
    __typename?: 'Refiner'

    id: string

    title: Maybe<string>

    expanded: Maybe<boolean>

    selected: Maybe<boolean>

    groupId: Maybe<string>

    children: Maybe<(Maybe<_Children>)[]>
  }

  export type _Children = {
    __typename?: 'Refiner'

    id: string

    title: Maybe<string>

    groupId: Maybe<string>

    expanded: Maybe<boolean>

    selected: Maybe<boolean>
  }
}

export namespace CommitmentsMapPointSearch {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    mappoints: Maybe<(Maybe<Mappoints>)[]>
  }

  export type Mappoints = {
    __typename?: 'MapPoint'

    place_id: string

    address: string

    latitude: number

    longitude: number
  }
}

export namespace CommitmentsSearch {
  export type Variables = {
    input: CommitmentRefinementInput
  }

  export type Query = {
    __typename?: 'Query'

    commitments: Maybe<(Maybe<Commitments>)[]>
  }

  export type Commitments = {
    __typename?: 'Commitment'

    id: string

    title: Maybe<string>

    description: Maybe<string>

    cost: Maybe<string>

    date: Maybe<string>

    announcedby: Maybe<string>

    party: Maybe<(Maybe<Party>)[]>

    criticalDate: Maybe<(Maybe<CriticalDate>)[]>

    whoAnnounced: Maybe<(Maybe<WhoAnnounced>)[]>

    announcement: Maybe<(Maybe<Announcement>)[]>

    commitment: Maybe<(Maybe<Commitment>)[]>

    portfolio: Maybe<(Maybe<Portfolio>)[]>

    electorates: Maybe<(Maybe<Electorates>)[]>
  }

  export type Party = {
    __typename?: 'Tag'

    id: string

    title: Maybe<string>
  }

  export type CriticalDate = {
    __typename?: 'Tag'

    id: string

    title: Maybe<string>
  }

  export type WhoAnnounced = {
    __typename?: 'Tag'

    id: string

    title: Maybe<string>
  }

  export type Announcement = {
    __typename?: 'Tag'

    id: string

    title: Maybe<string>
  }

  export type Commitment = {
    __typename?: 'Tag'

    id: string

    title: Maybe<string>
  }

  export type Portfolio = {
    __typename?: 'Tag'

    id: string

    title: Maybe<string>
  }

  export type Electorates = {
    __typename?: 'Tag'

    id: string

    title: Maybe<string>
  }
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from '@angular/core'
import * as Apollo from 'apollo-angular'

import gql from 'graphql-tag'

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: 'root'
})
export class GetRefinerTagsGQL extends Apollo.Query<
  GetRefinerTags.Query,
  GetRefinerTags.Variables
> {
  document: any = gql`
    query GetRefinerTags {
      refiners {
        id
        title
        expanded
        selected
        groupId
        children {
          id
          title
          expanded
          selected
          groupId
          children {
            id
            title
            groupId
            expanded
            selected
          }
        }
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class CommitmentsMapPointSearchGQL extends Apollo.Query<
  CommitmentsMapPointSearch.Query,
  CommitmentsMapPointSearch.Variables
> {
  document: any = gql`
    query CommitmentsMapPointSearch {
      mappoints {
        place_id
        address
        latitude
        longitude
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class CommitmentsSearchGQL extends Apollo.Query<
  CommitmentsSearch.Query,
  CommitmentsSearch.Variables
> {
  document: any = gql`
    query CommitmentsSearch($input: CommitmentRefinementInput!) {
      commitments(input: $input) {
        id
        title
        description
        cost
        date
        announcedby
        party {
          id
          title
        }
        criticalDate {
          id
          title
        }
        whoAnnounced {
          id
          title
        }
        announcement {
          id
          title
        }
        commitment {
          id
          title
        }
        portfolio {
          id
          title
        }
        electorates {
          id
          title
        }
      }
    }
  `
}

// ====================================================
// END: Apollo Angular template
// ====================================================
