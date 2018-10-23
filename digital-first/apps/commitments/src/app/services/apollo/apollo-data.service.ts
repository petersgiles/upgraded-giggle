import { Apollo } from 'apollo-angular'
import { Observable, of } from 'rxjs'
import { Injectable } from '@angular/core'
import { switchMap, tap } from 'rxjs/operators'
import * as moment from 'moment'

import { AppDataService } from '../app-data.service'

import {
  DataResult,
  CommitmentResult,
  CommitmentsResult,
  AnnouncementTypesResult,
  CommentsResult,
  PortfoliosResult,
  PartysResult,
  ContactsResult,
  LocationsResult,
  CommitmentTypesResult
} from '../../models'

import {
  GET_COMMITMENT,
  UPSERT_COMMITMENT,
  GET_ALL_COMMITMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  COMMENTS_BY_COMMITMENT,
  GET_ANNOUNCEMENT_TYPES,
  GET_PORTFOLIOS,
  GET_PARTIES,
  GET_LOCATIONS,
  GET_COMMITMENT_TYPES,
  GET_CONTACTS
} from './apollo-queries'

@Injectable({
  providedIn: 'root'
})
export class ApolloDataService implements AppDataService {

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
  }): Observable<DataResult<CommentsResult>> {
    const variables = {
      commitment: comment.commitment,
      parent: comment.parent,
      text: comment.comment,
      author: comment.author,
      created: moment()
    }
    return this.callMutate(ADD_COMMENT, variables)

  }

  deleteComment = (comment: { id: any; commitment: any }) => this.callMutate(DELETE_COMMENT, comment)

  getCommitment = (criteria: { id: number; }) => this.callQuery<CommitmentResult>(GET_COMMITMENT, criteria)

  filterAnnouncementTypes = (filter?: any) => this.callQuery<AnnouncementTypesResult>(GET_ANNOUNCEMENT_TYPES)
  filterCommitments = (filter?: any) => this.callQuery<CommitmentsResult>(GET_ALL_COMMITMENTS, filter)
  filterPortfolios = (filter?: any) => this.callQuery<PortfoliosResult>(GET_PORTFOLIOS, filter)
  filterPartys = (filter?: any) => this.callQuery<PartysResult>(GET_PARTIES, filter)
  filterContacts = (filter?: any) => this.callQuery<ContactsResult>(GET_CONTACTS, filter)
  filterLocations = (filter?: any) => this.callQuery<LocationsResult>(GET_LOCATIONS, filter)
  filterCommitmentTypes = (filter?: any) => this.callQuery<CommitmentTypesResult>(GET_COMMITMENT_TYPES, filter)
  filterParties = (filter?: any) => this.callQuery<PartysResult>(GET_PARTIES, filter)
  getCommentsByCommitment = (commitment: number) => this.callQuery<CommentsResult>(COMMENTS_BY_COMMITMENT, { commitment: commitment })

  callMutate<T>(query, variables?): Observable<DataResult<T>> {
    return this.apollo
    .mutate({
      mutation: query,
      variables: { ...variables }
    })
    .pipe(
        // tslint:disable-next-line:no-console
        tap((result: any) => console.log(result)),
        switchMap((result: any) => of(result as DataResult<T>))
    )
  }

  callQuery<T>(query, variables?): Observable<DataResult<T>> {
    return this.apollo
      .query({
        fetchPolicy: 'network-only',
        query: query,
        variables: { ...variables }
      })
      .pipe(
        // tslint:disable-next-line:no-console
        tap((result: any) => console.log(result)),
        switchMap((result: any) => of(result as DataResult<T>))
      )
  }
}
