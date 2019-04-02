type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type DeckItem = {
  id?: Maybe<Scalars['ID']>
  parent?: Maybe<Scalars['ID']>
  title?: Maybe<Scalars['String']>
  cardType?: Maybe<Scalars['String']>
  supportingText?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['String']>
  sortOrder?: Maybe<Scalars['String']>
  colour?: Maybe<Scalars['String']>
  titleClass?: Maybe<Scalars['String']>
  media?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['String']>
  actions?: Maybe<Array<Maybe<DeckItemAction>>>
}

export type DeckItemAction = {
  url?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type DeckItemInput = {
  id?: Maybe<Scalars['ID']>
  parent?: Maybe<Scalars['ID']>
  title?: Maybe<Scalars['String']>
  cardType?: Maybe<Scalars['String']>
  supportingText?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['String']>
  sortOrder?: Maybe<Scalars['String']>
  colour?: Maybe<Scalars['String']>
  titleClass?: Maybe<Scalars['String']>
  media?: Maybe<Scalars['String']>
  data?: Maybe<Scalars['String']>
}

export type Mutation = {
  upsertDeckItem?: Maybe<Response>
  deleteDeckItem?: Maybe<Response>
}

export type MutationUpsertDeckItemArgs = {
  item: DeckItemInput
}

export type MutationDeleteDeckItemArgs = {
  id: Scalars['ID']
}

export type Query = {
  deckItem?: Maybe<DeckItem>
  deckItems?: Maybe<Array<Maybe<DeckItem>>>
  action?: Maybe<DeckItemAction>
  actions?: Maybe<Array<Maybe<DeckItemAction>>>
}

export type QueryDeckItemArgs = {
  id: Scalars['ID']
}

export type QueryDeckItemsArgs = {
  parent?: Maybe<Scalars['ID']>
}

export type QueryActionArgs = {
  id: Scalars['ID']
}

export type QueryActionsArgs = {
  deckItem: Scalars['ID']
}

export type Response = {
  success?: Maybe<Scalars['Boolean']>
  error?: Maybe<Scalars['String']>
}

export type StoreMutationVariables = {
  item: DeckItemInput
}

export type StoreMutation = { __typename?: 'Mutation' } & {
  upsertDeckItem: Maybe<
    { __typename?: 'Response' } & Pick<Response, 'success' | 'error'>
  >
}

export type DeleteMutationVariables = {
  id: Scalars['ID']
}

export type DeleteMutation = { __typename?: 'Mutation' } & {
  deleteDeckItem: Maybe<
    { __typename?: 'Response' } & Pick<Response, 'success' | 'error'>
  >
}

export type GetDeckItemsQueryVariables = {
  id?: Maybe<Scalars['ID']>
}

export type GetDeckItemsQuery = { __typename?: 'Query' } & {
  deckItems: Maybe<
    Array<
      Maybe<
        { __typename?: 'DeckItem' } & Pick<
          DeckItem,
          | 'id'
          | 'parent'
          | 'title'
          | 'cardType'
          | 'supportingText'
          | 'size'
          | 'sortOrder'
          | 'colour'
          | 'titleClass'
          | 'media'
          | 'data'
        > & {
            actions: Maybe<
              Array<
                Maybe<
                  { __typename?: 'DeckItemAction' } & Pick<
                    DeckItemAction,
                    'url' | 'title'
                  >
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

export const StoreDocument = gql`
  mutation Store($item: DeckItemInput!) {
    upsertDeckItem(item: $item) {
      success
      error
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class StoreGQL extends Apollo.Mutation<
  StoreMutation,
  StoreMutationVariables
> {
  document = StoreDocument
}
export const DeleteDocument = gql`
  mutation Delete($id: ID!) {
    deleteDeckItem(id: $id) {
      success
      error
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class DeleteGQL extends Apollo.Mutation<
  DeleteMutation,
  DeleteMutationVariables
> {
  document = DeleteDocument
}
export const GetDeckItemsDocument = gql`
  query GetDeckItems($id: ID) {
    deckItems(parent: $id) {
      id
      parent
      title
      cardType
      supportingText
      size
      sortOrder
      colour
      titleClass
      media
      data
      actions {
        url
        title
      }
    }
  }
`

@Injectable({
  providedIn: 'root'
})
export class GetDeckItemsGQL extends Apollo.Query<
  GetDeckItemsQuery,
  GetDeckItemsQueryVariables
> {
  document = GetDeckItemsDocument
}
