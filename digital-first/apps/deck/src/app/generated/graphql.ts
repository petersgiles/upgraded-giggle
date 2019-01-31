export interface DeckCardInput {
  id?: string | null;

  thumbnail?: string | null;

  title: string;

  subTitle?: string | null;

  supportingText?: string | null;

  parentId?: string | null;

  order: number;

  presentation?: DeckCardPresentationInput | null;

  buttons?: (DeckCardActionButtonInput | null)[] | null;

  icons?: (DeckCardActionIconInput | null)[] | null;
}

export interface DeckCardPresentationInput {
  description: string;
}

export interface DeckCardActionButtonInput {
  text: string;

  action?: DeckCardActionInput | null;
}

export interface DeckCardActionInput {
  description: string;

  action: string;
}

export interface DeckCardActionIconInput {
  text: string;

  action?: DeckCardActionInput | null;
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

/** The `Upload` scalar type represents a file upload promise that resolves anobject containing `stream`, `filename`, `mimetype` and `encoding`. */
export type Upload = any;

// ====================================================
// Documents
// ====================================================

export namespace StoreCard {
  export type Variables = {
    card?: DeckCardInput | null;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    storeCard: StoreCard | null;
  };

  export type StoreCard = {
    __typename?: 'StoreDeckCardMutationResponse';

    code: string;

    success: boolean;

    message: string;

    card: Card | null;
  };

  export type Card = {
    __typename?: 'DeckCard';

    id: string;

    title: string;

    order: number;

    presentation: Presentation | null;
  };

  export type Presentation = {
    __typename?: 'DeckCardPresentation';

    description: string;
  };
}

export namespace RemoveCard {
  export type Variables = {
    id: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    removeCard: RemoveCard | null;
  };

  export type RemoveCard = {
    __typename?: 'RemoveDeckCardMutationResponse';

    code: string;

    success: boolean;

    message: string;
  };
}

export namespace GetCard {
  export type Variables = {
    id?: string | null;
  };

  export type Query = {
    __typename?: 'Query';

    cards: (Cards | null)[] | null;
  };

  export type Cards = {
    __typename?: 'DeckCard';

    id: string;

    title: string;

    parentId: string | null;

    order: number;

    presentation: Presentation | null;
  };

  export type Presentation = {
    __typename?: 'DeckCardPresentation';

    description: string;
  };
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';

import gql from 'graphql-tag';

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: 'root'
})
export class StoreCardGQL extends Apollo.Mutation<
  StoreCard.Mutation,
  StoreCard.Variables
> {
  document: any = gql`
    mutation StoreCard($card: DeckCardInput) {
      storeCard(card: $card) {
        code
        success
        message
        card {
          id
          title
          order
          presentation {
            description
          }
        }
      }
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class RemoveCardGQL extends Apollo.Mutation<
  RemoveCard.Mutation,
  RemoveCard.Variables
> {
  document: any = gql`
    mutation RemoveCard($id: ID!) {
      removeCard(id: $id) {
        code
        success
        message
      }
    }
  `;
}
@Injectable({
  providedIn: 'root'
})
export class GetCardGQL extends Apollo.Query<GetCard.Query, GetCard.Variables> {
  document: any = gql`
    query GetCard($id: ID) {
      cards(parentId: $id) {
        id
        title
        parentId
        order
        presentation {
          description
        }
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
