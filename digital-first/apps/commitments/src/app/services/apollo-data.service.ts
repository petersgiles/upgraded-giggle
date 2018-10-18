import { Apollo } from 'apollo-angular'
import {
  Observable,
  of
} from 'rxjs'
import { Injectable } from '@angular/core'

import { GET_COMMITMENT, UPSERT_COMMITMENT, GET_ALL_COMMITMENTS, ADD_COMMENT, DELETE_COMMENT } from './apollo-queries'
import { DataResult, AnnouncementType, Party, Portfolio, Commitment } from '../models/commitment-models'
import { switchMap, concatMap, delay, tap, map } from 'rxjs/operators'
import * as moment from 'moment'

interface CommitmentResult {
    announcementTypes: AnnouncementType[],
    parties: Party[],
    portfolios: Portfolio[],
    commitment: Commitment,
    locations: Location[]
  }

  interface CommitmentsResult {
    announcementTypes: AnnouncementType[],
    parties: Party[],
    portfolios: Portfolio[],
    commitments: Commitment[],
    locations: Location[]
  }

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
      .pipe(switchMap((result: any) => of(result as DataResult<CommitmentResult>)))
  }

  upsertComment(comment: { commitment: any; parent: any; comment: any; author: any }): Observable<DataResult<CommitmentResult>> {
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
        concatMap((result: any) => this.getCommitment({id: result.data.addComment.commitment}))
      )
  }

  deleteComment(comment: { id: any, commitment: any }): any {

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
        switchMap(result => this.getCommitment({id: result.commitment}))
      )
  }

  getCommitment(criteria: { id: number; }): Observable<DataResult<CommitmentResult>> {

    // tslint:disable-next-line:no-console
    console.log(criteria)

    return this.apollo
      .query ({
        fetchPolicy: 'network-only',
        query: GET_COMMITMENT,
        variables: { 'id': criteria.id }
      }
      )
      .pipe(
        // tslint:disable-next-line:no-console
        tap((result: any) => console.log(result)),
        switchMap((result: any) => of(result as DataResult<CommitmentResult>)))
  }

  filterCommitments(filter?: { party?: string, type?: string, portfolio?: string }): Observable<DataResult<{}>> {
    return this.apollo
      .query({
        query: GET_ALL_COMMITMENTS,
      })
      .pipe(switchMap((result: any) => of(result as DataResult<{}>)))

  }
}
