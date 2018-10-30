import { Apollo } from 'apollo-angular'
import { Observable, of, throwError } from 'rxjs'
import { Injectable } from '@angular/core'
import { switchMap, tap, catchError } from 'rxjs/operators'
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
  CommitmentTypesResult,
  WhoAnnouncedTypesResult
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
  GET_CONTACTS,
  GET_WHO_ANNOUNCED_TYPES
} from './apollo-queries'
import { Commitment } from '../../reducers/commitment'

@Injectable({
  providedIn: 'root'
})
export class ApolloDataService implements AppDataService {

  constructor(private apollo: Apollo) { }

  storeCommitment(commitment: Commitment): Observable<DataResult<CommitmentResult>> {
    const variables = {
     ...commitment
    }

    return this.callMutate<CommitmentResult>(
      { mutation: UPSERT_COMMITMENT, variables: variables },
      (result: any) => ({ commitment: result.data.upsertCommitment.commitment }))

  }

  storeComment(comment: {
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
    return this.callMutate<any>({ mutation: ADD_COMMENT, variables: { ...variables } })

  }

  deleteComment = (comment: { id: any; commitment: any }) =>
    this.callMutate<{ commitment: number }>(
      { mutation: DELETE_COMMENT, variables: { ...comment } },
      (result: any) => ({ commitment: result.data.deleteComment.commitment }))

  getCommitment = (criteria: { id: number; }) => this.callQuery<CommitmentResult>({ query: GET_COMMITMENT, variables: criteria })

  filterWhoAnnouncedTypes = (filter?: any) => this.callQuery<WhoAnnouncedTypesResult>({ query: GET_WHO_ANNOUNCED_TYPES })
  filterAnnouncementTypes = (filter?: any) => this.callQuery<AnnouncementTypesResult>({ query: GET_ANNOUNCEMENT_TYPES })
  filterCommitments = (filter?: any) => this.callQuery<CommitmentsResult>({ query: GET_ALL_COMMITMENTS, variables: filter })
  filterPortfolios = (filter?: any) => this.callQuery<PortfoliosResult>({ query: GET_PORTFOLIOS, variables: filter })
  filterPartys = (filter?: any) => this.callQuery<PartysResult>({ query: GET_PARTIES, variables: filter })
  filterContacts = (filter?: any) => this.callQuery<ContactsResult>({ query: GET_CONTACTS, variables: filter })
  filterLocations = (filter?: any) => this.callQuery<LocationsResult>({ query: GET_LOCATIONS, variables: filter })
  filterCommitmentTypes = (filter?: any) => this.callQuery<CommitmentTypesResult>({ query: GET_COMMITMENT_TYPES, variables: filter })
  filterParties = (filter?: any) => this.callQuery<PartysResult>({ query: GET_PARTIES, variables: filter })
  getCommentsByCommitment = (commitment: number) => this.callQuery<CommentsResult>({ query: COMMENTS_BY_COMMITMENT, variables: { commitment: commitment } })

  callMutate<T>(options: {
    mutation: any,
    fetchPolicy?: 'no-cache' | 'network-only',
    variables?: any
  }, mapper?: any): Observable<DataResult<T>> {
    return this.apollo
      .mutate({
        ...options
      })
      .pipe(
        // tslint:disable-next-line:no-console
        tap((result: any) => console.log(result)),
        switchMap((result: any) => {
          if (mapper) {
            return of(mapper(result) as DataResult<T>)
          }
          return of(result as DataResult<T>)
        }),
        catchError(err => this.replyError<T>(err))
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
        switchMap((result: any) => of(result as DataResult<T>)),
        catchError(err => this.replyError<T>(err))
      )
  }

  replyError<T>(err): Observable<DataResult<T>> {
    const error: DataResult<T> = { data: null, error: err, loading: false }
    return of(error)
  }

}
