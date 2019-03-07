export type Maybe<T> = T | null

export interface DeckItemInput {
  id?: Maybe<string>

  parent?: Maybe<string>

  title?: Maybe<string>
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

/** The `Upload` scalar type represents a file upload promise that resolves an object containing `stream`, `filename`, `mimetype` and `encoding`. */
export type Upload = any

// ====================================================
// Documents
// ====================================================

export namespace Store {
  export type Variables = {
    item: DeckItemInput
  }

  export type Mutation = {
    __typename?: 'Mutation'

    upsertDeckItem: Maybe<UpsertDeckItem>
  }

  export type UpsertDeckItem = {
    __typename?: 'Response'

    success: Maybe<boolean>

    error: Maybe<string>
  }
}

export namespace Delete {
  export type Variables = {
    id: string
  }

  export type Mutation = {
    __typename?: 'Mutation'

    deleteDeckItem: Maybe<DeleteDeckItem>
  }

  export type DeleteDeckItem = {
    __typename?: 'Response'

    success: Maybe<boolean>

    error: Maybe<string>
  }
}

export namespace GetDeckItems {
  export type Variables = {
    id?: Maybe<string>
  }

  export type Query = {
    __typename?: 'Query'

    deckItems: Maybe<(Maybe<DeckItems>)[]>
  }

  export type DeckItems = {
    __typename?: 'DeckItem'

    id: Maybe<string>

    title: Maybe<string>

    parent: Maybe<string>
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
export class StoreGQL extends Apollo.Mutation<Store.Mutation, Store.Variables> {
  document: any = gql`
    mutation Store($item: DeckItemInput!) {
      upsertDeckItem(item: $item) {
        success
        error
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class DeleteGQL extends Apollo.Mutation<
  Delete.Mutation,
  Delete.Variables
> {
  document: any = gql`
    mutation Delete($id: ID!) {
      deleteDeckItem(id: $id) {
        success
        error
      }
    }
  `
}
@Injectable({
  providedIn: 'root'
})
export class GetDeckItemsGQL extends Apollo.Query<
  GetDeckItems.Query,
  GetDeckItems.Variables
> {
  document: any = gql`
    query GetDeckItems($id: ID) {
      deckItems(parent: $id) {
        id
        title
        parent
      }
    }
  `
}

// ====================================================
// END: Apollo Angular template
// ====================================================
