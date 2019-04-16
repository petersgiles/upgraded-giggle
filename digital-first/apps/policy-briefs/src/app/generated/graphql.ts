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

export type ActivatePackNavigationNodeInput = {
  id?: Maybe<Scalars['ID']>
  isActive?: Maybe<Scalars['Boolean']>
}

export type Brief = {
  id: Scalars['ID']
  title?: Maybe<Scalars['String']>
  reference?: Maybe<Scalars['String']>
  notify?: Maybe<Scalars['String']>
  policyDirection?: Maybe<Scalars['String']>
  created?: Maybe<Scalars['Date']>
  dueDate?: Maybe<Scalars['Date']>
  modified?: Maybe<Scalars['Date']>
  sortOrder?: Maybe<Scalars['Int']>
  securityClassification?: Maybe<SecurityClassification>
  dLM?: Maybe<Dlm>
  policy?: Maybe<Policy>
  subPolicy?: Maybe<SubPolicy>
  briefStatus?: Maybe<BriefStatus>
  briefDivision?: Maybe<BriefDivision>
  contactOfficer?: Maybe<SharePointUser>
  createdBy?: Maybe<SharePointUser>
  modifiedBy?: Maybe<SharePointUser>
}

export type BriefDivision = {
  id: Scalars['ID']
  title: Scalars['String']
}

export type BriefRefinementInput = {
  text?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Maybe<Scalars['ID']>>>
}

export type BriefStatus = {
  id: Scalars['ID']
  title: Scalars['String']
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Dlm = {
  id: Scalars['ID']
  title: Scalars['String']
}

export type Mutation = {
  toggleExpandPackNavigationNode?: Maybe<Scalars['Boolean']>
  activatePackNavigationNode?: Maybe<Scalars['Boolean']>
}

export type MutationToggleExpandPackNavigationNodeArgs = {
  input: TogglePackNavigationNodeInput
}

export type MutationActivatePackNavigationNodeArgs = {
  input: ActivatePackNavigationNodeInput
}

export type NavigatorTreeNode = {
  isActive?: Maybe<Scalars['Boolean']>
  isExpanded?: Maybe<Scalars['Boolean']>
  id: Scalars['ID']
  caption?: Maybe<Scalars['String']>
  meta?: Maybe<Scalars['String']>
  parent?: Maybe<Scalars['String']>
  colour?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  children?: Maybe<Array<Maybe<NavigatorTreeNode>>>
}

export type Policy = {
  id: Scalars['ID']
  title: Scalars['String']
  subPolicies?: Maybe<Array<Maybe<SubPolicy>>>
}

export type Query = {
  brief?: Maybe<Brief>
  briefs?: Maybe<Array<Maybe<Brief>>>
  policies?: Maybe<Array<Maybe<Policy>>>
  navigatorTree?: Maybe<Array<Maybe<NavigatorTreeNode>>>
}

export type QueryBriefArgs = {
  id: Scalars['ID']
}

export type QueryBriefsArgs = {
  input?: Maybe<BriefRefinementInput>
}

export type QueryNavigatorTreeArgs = {
  id?: Maybe<Scalars['ID']>
}

export enum Role {
  Guest = 'GUEST',
  User = 'USER',
  Admin = 'ADMIN'
}

export type SecurityClassification = {
  id: Scalars['ID']
  title: Scalars['String']
}

export type SharePointUser = {
  account?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  eMail?: Maybe<Scalars['String']>
  mobileNumber?: Maybe<Scalars['String']>
  aboutMe?: Maybe<Scalars['String']>
  picture?: Maybe<Scalars['String']>
  department?: Maybe<Scalars['String']>
  jobTitle?: Maybe<Scalars['String']>
  sIPAddress?: Maybe<Scalars['String']>
}

export type SubPolicy = {
  id: Scalars['ID']
  title: Scalars['String']
  policy?: Maybe<Policy>
  briefs?: Maybe<Array<Maybe<Brief>>>
}

export type TogglePackNavigationNodeInput = {
  id?: Maybe<Scalars['ID']>
  isExpanded?: Maybe<Scalars['Boolean']>
}

export type GetBriefByIdQueryVariables = {
  id: Scalars['ID']
}

export type GetBriefByIdQuery = { __typename?: 'Query' } & {
  brief: Maybe<
    { __typename?: 'Brief' } & Pick<
      Brief,
      | 'id'
      | 'title'
      | 'reference'
      | 'created'
      | 'dueDate'
      | 'modified'
      | 'notify'
      | 'policyDirection'
      | 'sortOrder'
    > & {
        briefStatus: Maybe<
          { __typename?: 'BriefStatus' } & Pick<BriefStatus, 'id' | 'title'>
        >
        securityClassification: Maybe<
          { __typename?: 'SecurityClassification' } & Pick<
            SecurityClassification,
            'id' | 'title'
          >
        >
        briefDivision: Maybe<
          { __typename?: 'BriefDivision' } & Pick<BriefDivision, 'id' | 'title'>
        >
        contactOfficer: Maybe<
          { __typename?: 'SharePointUser' } & Pick<SharePointUser, 'name'>
        >
        dLM: Maybe<{ __typename?: 'DLM' } & Pick<Dlm, 'id' | 'title'>>
        policy: Maybe<{ __typename?: 'Policy' } & Pick<Policy, 'id' | 'title'>>
        subPolicy: Maybe<
          { __typename?: 'SubPolicy' } & Pick<SubPolicy, 'id' | 'title'>
        >
        createdBy: Maybe<
          { __typename?: 'SharePointUser' } & Pick<
            SharePointUser,
            'name' | 'eMail'
          >
        >
        modifiedBy: Maybe<
          { __typename?: 'SharePointUser' } & Pick<
            SharePointUser,
            'name' | 'eMail'
          >
        >
      }
  >
}

export type GetPackNavigationQueryVariables = {
  id?: Maybe<Scalars['ID']>
}

export type GetPackNavigationQuery = { __typename?: 'Query' } & {
  navigatorTree: Maybe<
    Array<
      Maybe<
        { __typename?: 'NavigatorTreeNode' } & Pick<
          NavigatorTreeNode,
          | 'id'
          | 'caption'
          | 'parent'
          | 'colour'
          | 'order'
          | 'isActive'
          | 'isExpanded'
        >
      >
    >
  >
}

export type ToggleExpandPackNavigationNodeMutationVariables = {
  input: TogglePackNavigationNodeInput
}

export type ToggleExpandPackNavigationNodeMutation = {
  __typename?: 'Mutation'
} & Pick<Mutation, 'toggleExpandPackNavigationNode'>

export type ActivatePackNavigationNodeMutationVariables = {
  input: ActivatePackNavigationNodeInput
}

export type ActivatePackNavigationNodeMutation = {
  __typename?: 'Mutation'
} & Pick<Mutation, 'activatePackNavigationNode'>

import gql from 'graphql-tag'
import { Injectable } from '@angular/core'
import * as Apollo from 'apollo-angular'

export const GetBriefByIdDocument = gql`
  query GetBriefById($id: ID!) {
    brief(id: $id) {
      id
      title
      reference
      briefStatus {
        id
        title
      }
      securityClassification {
        id
        title
      }
      briefDivision {
        id
        title
      }
      contactOfficer {
        name
      }
      created
      dLM {
        id
        title
      }
      dueDate
      modified
      notify
      policy {
        id
        title
      }
      policyDirection
      sortOrder
      subPolicy {
        id
        title
      }
      createdBy {
        name
        eMail
      }
      modifiedBy {
        name
        eMail
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class GetBriefByIdGQL extends Apollo.Query<
  GetBriefByIdQuery,
  GetBriefByIdQueryVariables
> {
  document = GetBriefByIdDocument
}
export const GetPackNavigationDocument = gql`
  query GetPackNavigation($id: ID) {
    navigatorTree(id: $id) {
      id
      caption
      parent
      colour
      order
      isActive @client
      isExpanded @client
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class GetPackNavigationGQL extends Apollo.Query<
  GetPackNavigationQuery,
  GetPackNavigationQueryVariables
> {
  document = GetPackNavigationDocument
  client = 'packNavigation'
}
export const ToggleExpandPackNavigationNodeDocument = gql`
  mutation ToggleExpandPackNavigationNode(
    $input: TogglePackNavigationNodeInput!
  ) {
    toggleExpandPackNavigationNode(input: $input) @client
  }
`

@Injectable({
  providedIn: 'root'
})
export class ToggleExpandPackNavigationNodeGQL extends Apollo.Mutation<
  ToggleExpandPackNavigationNodeMutation,
  ToggleExpandPackNavigationNodeMutationVariables
> {
  document = ToggleExpandPackNavigationNodeDocument
}
export const ActivatePackNavigationNodeDocument = gql`
  mutation ActivatePackNavigationNode(
    $input: ActivatePackNavigationNodeInput!
  ) {
    activatePackNavigationNode(input: $input) @client
  }
`

@Injectable({
  providedIn: 'root'
})
export class ActivatePackNavigationNodeGQL extends Apollo.Mutation<
  ActivatePackNavigationNodeMutation,
  ActivatePackNavigationNodeMutationVariables
> {
  document = ActivatePackNavigationNodeDocument
}
