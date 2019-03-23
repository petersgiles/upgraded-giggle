import { Maybe } from './graphql';
import * as Apollo from 'apollo-angular'
import gql from 'graphql-tag'
import { Injectable } from '@angular/core';

export interface Commitment {
    id: string
    title: string
    description?: Maybe<string>
    cost?: Maybe<string>
    date?: Maybe<string>
    announcedby?: Maybe<string>
  }

export namespace AllCommitments {
    export type Variables = {}
  
    export type Query = {
      __typename?: 'Query'
  
      commitments: Maybe<(Maybe<Commitment>)[]>
    }

  }


@Injectable({
    providedIn: 'root'
  })
  export class AllCommitmentsGQL extends Apollo.Query<
  AllCommitments.Query,
  AllCommitments.Variables
  > {
    document: any = gql`
      query commitments {
        commitments(orderBy: { path: "title" }) {
          id
          title
        }
      }
    `
  }