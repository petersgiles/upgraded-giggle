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
import { Commitment } from '../../reducers/commitment'

@Injectable({
  providedIn: 'root'
})
export class ApolloDataService implements AppDataService {

  constructor(private apollo: Apollo) { }

  upsertCommitment(commitment: Commitment): Observable<DataResult<CommitmentResult>> {
    const variables = {
      id: commitment.id,
      title: commitment.title,
      description: commitment.description,
      party: commitment.party.id,
      cost: commitment.cost,
      location: commitment.location.id,
      announcementType: commitment.announcementType.id,
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
      author: 'Domenica20',
      created: moment()
    }
    return this.callMutate(ADD_COMMENT, variables)

  }

  deleteComment = (comment: { id: any; commitment: any }) => this.callMutate(DELETE_COMMENT, comment)

  getCommitment = (criteria: { id: number; }) => this.callQuery<CommitmentResult>({ query: GET_COMMITMENT, variables: criteria })

  filterAnnouncementTypes = (filter?: any) => this.callQuery<AnnouncementTypesResult>({ query: GET_ANNOUNCEMENT_TYPES })
  filterCommitments = (filter?: any) => this.callQuery<CommitmentsResult>({ query: GET_ALL_COMMITMENTS, variables: filter })
  filterPortfolios = (filter?: any) => this.callQuery<PortfoliosResult>({ query: GET_PORTFOLIOS, variables: filter })
  filterPartys = (filter?: any) => this.callQuery<PartysResult>({ query: GET_PARTIES, variables: filter })
  filterContacts = (filter?: any) => this.callQuery<ContactsResult>({ query: GET_CONTACTS, variables: filter })
  filterLocations = (filter?: any) => this.callQuery<LocationsResult>({ query: GET_LOCATIONS, variables: filter })
  filterCommitmentTypes = (filter?: any) => this.callQuery<CommitmentTypesResult>({ query: GET_COMMITMENT_TYPES, variables: filter })
  filterParties = (filter?: any) => this.callQuery<PartysResult>({ query: GET_PARTIES, variables: filter })
  getCommentsByCommitment = (commitment: number) => this.callQuery<CommentsResult>({ query: COMMENTS_BY_COMMITMENT, variables: { commitment: commitment } })

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

  callQuery<T>(options: {
    query: any,
    fetchPolicy?: 'no-cache' | 'network-only',
    variables?: any
  }): Observable<DataResult<T>> {

    return this.apollo
      .query({
        ...options
      })
      .pipe(
        // tslint:disable-next-line:no-console
        tap((result: any) => console.log(result)),
        switchMap((result: any) => of(result as DataResult<T>))
      )
  }
}
