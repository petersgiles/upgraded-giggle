type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Commitment = {
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
  party?: Maybe<Scalars['String']>
  criticalDate?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  portfolio?: Maybe<Scalars['String']>
  announcedby?: Maybe<Scalars['String']>
}

export type CommitmentInput = {
  id?: Maybe<Scalars['ID']>
  title: Scalars['String']
  party: Scalars['ID']
  criticalDate: Scalars['ID']
  type: Scalars['ID']
  portfolio: Scalars['ID']
}

export type CommitmentMapPointInput = {
  commitment?: Maybe<Scalars['ID']>
  mapPoint?: Maybe<Scalars['ID']>
}

export type CommitmentRefinementInput = {
  text?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Maybe<Scalars['ID']>>>
}

export type MapPoint = {
  place_id: Scalars['String']
  address: Scalars['String']
  latitude: Scalars['Float']
  longitude: Scalars['Float']
  commitments?: Maybe<Array<Maybe<Commitment>>>
}

export type MapPointInput = {
  place_id: Scalars['String']
  address: Scalars['String']
  latitude: Scalars['Float']
  longitude: Scalars['Float']
}

export type Mutation = {
  upsertMapPoint?: Maybe<Response>
  deleteMapPoint?: Maybe<Response>
  upsertCommitmentMapPoint?: Maybe<Response>
  deleteCommitmentMapPoint?: Maybe<Response>
  upsertCommitment?: Maybe<Response>
  deleteCommitment?: Maybe<Response>
  upsertTag?: Maybe<Response>
  deleteTag?: Maybe<Response>
}

export type MutationUpsertMapPointArgs = {
  item: MapPointInput
}

export type MutationDeleteMapPointArgs = {
  id: Scalars['ID']
}

export type MutationUpsertCommitmentMapPointArgs = {
  item: CommitmentMapPointInput
}

export type MutationDeleteCommitmentMapPointArgs = {
  item: CommitmentMapPointInput
}

export type MutationUpsertCommitmentArgs = {
  item: CommitmentInput
}

export type MutationDeleteCommitmentArgs = {
  id: Scalars['ID']
}

export type MutationUpsertTagArgs = {
  item: TagInput
}

export type MutationDeleteTagArgs = {
  id: Scalars['ID']
}

export type Query = {
  userProfile?: Maybe<UserProfile>
  commitment?: Maybe<Commitment>
  commitments?: Maybe<Array<Maybe<Commitment>>>
  mappoint?: Maybe<MapPoint>
  mappoints?: Maybe<Array<Maybe<MapPoint>>>
  tag?: Maybe<Tag>
  tags?: Maybe<Array<Maybe<Tag>>>
  refiners?: Maybe<Array<Maybe<Refiner>>>
}

export type QueryUserProfileArgs = {
  id?: Maybe<Scalars['ID']>
}

export type QueryCommitmentArgs = {
  id: Scalars['ID']
}

export type QueryCommitmentsArgs = {
  input?: Maybe<CommitmentRefinementInput>
}

export type QueryMappointArgs = {
  place_id: Scalars['String']
}

export type QueryMappointsArgs = {
  input?: Maybe<CommitmentRefinementInput>
}

export type QueryTagArgs = {
  id: Scalars['ID']
}

export type QueryTagsArgs = {
  parent?: Maybe<Scalars['ID']>
}

export type Refiner = {
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
  expanded?: Maybe<Scalars['Boolean']>
  selected?: Maybe<Scalars['Boolean']>
  groupId?: Maybe<Scalars['String']>
  children?: Maybe<Array<Maybe<Refiner>>>
}

export type Response = {
  success?: Maybe<Scalars['Boolean']>
  error?: Maybe<Scalars['String']>
}

export enum Role {
  Guest = 'GUEST',
  User = 'USER',
  Admin = 'ADMIN'
}

export type Tag = {
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  sortorder?: Maybe<Scalars['String']>
  colour?: Maybe<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  parent?: Maybe<Scalars['ID']>
}

export type TagInput = {
  id?: Maybe<Scalars['ID']>
  title: Scalars['String']
  description?: Maybe<Scalars['String']>
  sortorder?: Maybe<Scalars['String']>
  colour?: Maybe<Scalars['String']>
  icon?: Maybe<Scalars['String']>
  parent?: Maybe<Scalars['ID']>
}

export type UserProfile = {
  id: Scalars['ID']
  name: Scalars['String']
  email: Scalars['String']
  roles?: Maybe<Array<Maybe<Role>>>
}
export type PlannerCommitmentsQueryVariables = {
  input: CommitmentRefinementInput
}

export type PlannerCommitmentsQuery = { __typename?: 'Query' } & {
  commitments: Maybe<
    Array<Maybe<{ __typename?: 'Commitment' } & CommitmentPartsFragment>>
  >
}

export type CommitmentsMapPointSearchQueryVariables = {
  input: CommitmentRefinementInput
}

export type CommitmentsMapPointSearchQuery = { __typename?: 'Query' } & {
  mappoints: Maybe<
    Array<
      Maybe<
        { __typename?: 'MapPoint' } & Pick<
          MapPoint,
          'place_id' | 'address' | 'latitude' | 'longitude'
        >
      >
    >
  >
}

export type CommitmentsSearchQueryVariables = {
  input: CommitmentRefinementInput
}

export type CommitmentsSearchQuery = { __typename?: 'Query' } & {
  commitments: Maybe<
    Array<Maybe<{ __typename?: 'Commitment' } & CommitmentPartsFragment>>
  >
}

export type CommitmentPartsFragment = { __typename?: 'Commitment' } & Pick<
  Commitment,
  | 'id'
  | 'title'
  | 'party'
  | 'type'
  | 'criticalDate'
  | 'portfolio'
  | 'announcedby'
>

export type GetRefinerTagsQueryVariables = {}

export type GetRefinerTagsQuery = { __typename?: 'Query' } & {
  refiners: Maybe<
    Array<
      Maybe<
        { __typename?: 'Refiner' } & Pick<
          Refiner,
          'id' | 'title' | 'expanded' | 'selected' | 'groupId'
        > & {
            children: Maybe<
              Array<
                Maybe<
                  { __typename?: 'Refiner' } & Pick<
                    Refiner,
                    'id' | 'title' | 'expanded' | 'selected' | 'groupId'
                  > & {
                      children: Maybe<
                        Array<
                          Maybe<
                            { __typename?: 'Refiner' } & Pick<
                              Refiner,
                              | 'id'
                              | 'title'
                              | 'groupId'
                              | 'expanded'
                              | 'selected'
                            >
                          >
                        >
                      >
                    }
                >
              >
            >
          }
      >
    >
  >
}

import gql from 'graphql-tag'
import { Injectable } from '@angular/core'
import * as Apollo from 'apollo-angular'
export const CommitmentPartsFragmentDoc = gql`
  fragment CommitmentParts on Commitment {
    id
    title
    party
    type
    criticalDate
    portfolio
    announcedby
  }
`
export const PlannerCommitmentsDocument = gql`
  query PlannerCommitments($input: CommitmentRefinementInput!) {
    commitments(input: $input) {
      ...CommitmentParts
    }
  }
  ${CommitmentPartsFragmentDoc}
`

@Injectable({
  providedIn: 'root'
})
export class PlannerCommitmentsGQL extends Apollo.Query<
  PlannerCommitmentsQuery,
  PlannerCommitmentsQueryVariables
> {
  document = PlannerCommitmentsDocument
}
export const CommitmentsMapPointSearchDocument = gql`
  query CommitmentsMapPointSearch($input: CommitmentRefinementInput!) {
    mappoints(input: $input) {
      place_id
      address
      latitude
      longitude
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class CommitmentsMapPointSearchGQL extends Apollo.Query<
  CommitmentsMapPointSearchQuery,
  CommitmentsMapPointSearchQueryVariables
> {
  document = CommitmentsMapPointSearchDocument
}
export const CommitmentsSearchDocument = gql`
  query CommitmentsSearch($input: CommitmentRefinementInput!) {
    commitments(input: $input) {
      ...CommitmentParts
    }
  }
  ${CommitmentPartsFragmentDoc}
`

@Injectable({
  providedIn: 'root'
})
export class CommitmentsSearchGQL extends Apollo.Query<
  CommitmentsSearchQuery,
  CommitmentsSearchQueryVariables
> {
  document = CommitmentsSearchDocument
}
export const GetRefinerTagsDocument = gql`
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

@Injectable({
  providedIn: 'root'
})
export class GetRefinerTagsGQL extends Apollo.Query<
  GetRefinerTagsQuery,
  GetRefinerTagsQueryVariables
> {
  document = GetRefinerTagsDocument
}
