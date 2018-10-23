import { Apollo } from 'apollo-angular'
import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'

import {
  GET_COMMITMENT,
  UPSERT_COMMITMENT,
  GET_ALL_COMMITMENTS,
} from './commitments'

import {
  ADD_COMMENT,
  DELETE_COMMENT,
  COMMENTS_BY_COMMITMENT
} from './comments'

import {
  DataResult,
  CommitmentResult,
  CommitmentsResult,
  AnnouncementTypesResult,
  CommentsResult
} from '../../models'

import { switchMap, concatMap, tap, map } from 'rxjs/operators'
import * as moment from 'moment'
import { GET_ANNOUNCEMENT_TYPES } from './announcement-types'

@Injectable({
  providedIn: 'root'
})
export class ApolloDataService {
  constructor(private apollo: Apollo) { }

  upsertCommitment(commitment: any): Observable<DataResult<CommitmentResult>> {
    const variables = {
      id: commitment.id,
      title: commitment.title,
      description: commitment.description,
      party: commitment.party.id,
      cost: commitment.cost,
      location: commitment.location.id,
      type: commitment.type.id,
      date: commitment.date,
      announcedby: commitment.announcedby,
      portfolio: commitment.portfolio.id,
      contacts: commitment.contacts
    }

    return this.apollo
      .mutate({
        mutation: UPSERT_COMMITMENT,
        variables: { ...variables }
      })
      .pipe(
        switchMap((result: any) => of(result as DataResult<CommitmentResult>))
      )
  }

  upsertComment(comment: {
    commitment: any;
    parent: any;
    comment: any;
    author: any;
  }): Observable<DataResult<CommitmentResult>> {
    const variables = {
      commitment: comment.commitment,
      parent: comment.parent,
      text: comment.comment,
      author: comment.author,
      created: moment()
    }

    return this.apollo
      .mutate({
        mutation: ADD_COMMENT,
        variables: { ...variables }
      })
      .pipe(
        concatMap((result: any) =>
          this.getCommitment({ id: result.data.addComment.commitment })
        )
      )
  }

  deleteComment(comment: { id: any; commitment: any }): any {
    // tslint:disable-next-line:no-console
    console.log(comment)
    const variables = {
      id: comment.id,
      commitment: comment.commitment
    }

    return this.apollo
      .mutate({
        mutation: DELETE_COMMENT,
        variables: { ...variables }
      })
      .pipe(
        // tslint:disable-next-line:no-console
        tap(result => console.log(result)),
        map(result => result.data.deleteComment),
        // tslint:disable-next-line:no-console
        tap(result => console.log(result)),
        switchMap(result => this.getCommitment({ id: result.commitment }))
      )
  }

  getCommitment(criteria: {
    id: number;
  }): Observable<DataResult<CommitmentResult>> {
    // tslint:disable-next-line:no-console
    console.log(criteria)

    return this.apollo
      .query({
        fetchPolicy: 'network-only',
        query: GET_COMMITMENT,
        variables: { id: criteria.id }
      })
      .pipe(
        // tslint:disable-next-line:no-console
        tap((result: any) => console.log(result)),
        switchMap((result: any) => of(result as DataResult<CommitmentResult>))
      )
  }

  filterCommitments(filter?: {
    party?: string;
    type?: string;
    portfolio?: string;
  }): Observable<DataResult<CommitmentsResult>> {
    return this.apollo
      .query({
        fetchPolicy: 'network-only',
        query: GET_ALL_COMMITMENTS
      })
      .pipe(
        // tslint:disable-next-line:no-console
        tap((result: any) => console.log(result)),
        switchMap((result: any) => of(result as DataResult<CommitmentsResult>))
      )
  }

  filterAnnouncementTypes(filter?: any): Observable<DataResult<AnnouncementTypesResult>> {
    return this.apollo
      .query({
        fetchPolicy: 'network-only',
        query: GET_ANNOUNCEMENT_TYPES
      })
      .pipe(
        // tslint:disable-next-line:no-console
        tap((result: any) => console.log(result)),
        switchMap((result: any) => of(result as DataResult<AnnouncementTypesResult>))
      )
  }

  getCommentsByCommitment(commitment: number): Observable<DataResult<CommentsResult>> {
    return this.apollo
    .query({
      fetchPolicy: 'network-only',
      query: COMMENTS_BY_COMMITMENT,
      variables: { commitment: commitment }
    })
    .pipe(
      // tslint:disable-next-line:no-console
      tap((result: any) => console.log(result)),
      switchMap((result: any) => of(result as DataResult<CommentsResult>))
    )
  }
}
