import * as moment from 'moment'
import {
  ADD_COMMENT,
  COMMENTS_BY_COMMITMENT,
  DELETE_COMMENT,
  GET_ALL_COMMITMENTS,
  GET_ANNOUNCEMENT_TYPES,
  GET_COMMITMENT,
  GET_COMMITMENT_TYPES,
  GET_CONTACTS,
  GET_LOCATIONS,
  GET_PARTIES,
  GET_PORTFOLIOS,
  GET_WHO_ANNOUNCED_TYPES,
  UPSERT_COMMITMENT,
  GET_MAP_POINTS,
  STORE_COMMITMENT_MAP_POINT,
  REMOVE_COMMITMENT_MAP_POINT,
  REMOVE_COMMITMENT_ELECTORATE,
  STORE_COMMITMENT_ELECTORATE,
  STORE_CONTACT,
  STORE_MAP_POINT,
  REMOVE_MAP_POINT,
  MAP_POINTS_BY_COMMITMENT,
  GET_CRITICAL_DATES,
  RELATED_COMMITMENTS_BY_COMMITMENT,
  STORE_RELATED_COMMITMENT,
  REMOVE_RELATED_COMMITMENT
} from './apollo-queries'
import {
  AnnouncementTypesResult,
  CommentsResult,
  CommitmentResult,
  CommitmentsResult,
  CommitmentTypesResult,
  ContactsResult,
  DataResult,
  LocationsResult,
  PartysResult,
  PortfoliosResult,
  WhoAnnouncedTypesResult,
  MapPointsResult,
  ElectoratesResult,
  CriticalDatesResult,
  RelatedCommitmentsResult
} from '../../models'
import { Apollo } from 'apollo-angular'
import { AppDataService } from '../app-data.service'
import { catchError, switchMap, tap } from 'rxjs/operators'
import { Commitment } from '../../reducers/commitment'
import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { STORE_COMMITMENT_CONTACT, REMOVE_COMMITMENT_CONTACT } from './commitment-contacts'
import { AppUserProfile } from '@digital-first/df-layouts'
@Injectable({
  providedIn: 'root'
})
export class ApolloDataService implements AppDataService {

  getCurrentUser(): Observable<AppUserProfile> {

    const userprofile = {
      userid: 0,
      login: 'guest',
      isSiteAdmin: true,
      systemUserKey: 'guest',
      name: 'Guest User'
    }

    return of(
      userprofile
    )
  }

  constructor(private apollo: Apollo) { }

  storeCommitment(commitment: Commitment): Observable<DataResult<CommitmentResult>> {
    const variables = {
      ...commitment
    }

    return this.callMutate<CommitmentResult>(
      { mutation: UPSERT_COMMITMENT, variables: variables },
      (result: any) => ({ data: { commitment: result.data.upsertCommitment } }))

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

  storeContact(contact: {
    name: string,
    username: string,
    email: string,
    phone: string,
    portfolio: string,
    party: string
  }): Observable<DataResult<ContactsResult>> {
    const variables = { ...contact }
    return this.callMutate<any>({ mutation: STORE_CONTACT, variables: variables })
  }

  deleteComment = (variables: { id: any; commitment: any }) =>
    this.callMutate<{ commitment: number }>(
      { mutation: DELETE_COMMENT, variables: { ...variables } },
      (result: any) => ({ commitment: result.data.deleteComment.commitment }))

  addContactToCommitment = (variables: { commitment: any, contact: any }) =>
    this.callMutate<any>(
      { mutation: STORE_COMMITMENT_CONTACT, variables: { ...variables } },
      (result: any) => ({ commitment: result.data.storeCommitmentContact })
    )

  removeContactFromCommitment = (variables: { id: any }) =>
    this.callMutate<any>(
      { mutation: REMOVE_COMMITMENT_CONTACT, variables: { ...variables } },
      (result: any) => ({ commitment: result.data.deleteCommitmentContact })
    )

  storeMapPoint = (mapPoint: any) =>
    this.callMutate<any>(
      { mutation: STORE_MAP_POINT, variables: { ...mapPoint } },
      (result: any) => ({ commitment: result.data.storeMapPoint })
    )

  removeMapPoint = (placeId: any) =>
    this.callMutate<any>(
      { mutation: REMOVE_MAP_POINT, variables: { place_id: placeId } },
      (result: any) => ({ commitment: result.data.removeMapPoint })
    )

  addMapPointToCommitment = (variables: { commitment: any, mapPoint: any }) => this.callMutate<any>(
    { mutation: STORE_COMMITMENT_MAP_POINT, variables: { commitment: variables.commitment, mapPoint: variables.mapPoint.place_id } },
    (result: any) => ({ commitment: result.data.storeCommitmentMapPoint })
  )

  removeMapPointFromCommitment = (variables: { commitment: any, mapPoint: any }) =>
    this.callMutate<any>(
      { mutation: REMOVE_COMMITMENT_MAP_POINT, variables: { ...variables } },
      (result: any) => ({ commitment: result.data.deleteCommitmentMapPoint })
    )

  addCommitmentToCommitment = (variables: { commitment: any, relatedTo: any }) => this.callMutate<any>(
    { mutation: STORE_RELATED_COMMITMENT, variables: { ...variables } },
    (result: any) => ({ commitment: result.data.storeRelatedCommitment })
  )

  removeCommitmentFromCommitment = (variables: { commitment: any, relatedTo: any }) => this.callMutate<any>(
    { mutation: REMOVE_RELATED_COMMITMENT, variables: { ...variables } },
    (result: any) => ({ commitment: result.data.deleteRelatedCommitment })
  )

  removeElectorateFromCommitment = (variables: { commitment: any, electorate: any }) =>
    this.callMutate<any>(
      { mutation: REMOVE_COMMITMENT_ELECTORATE, variables: { ...variables } },
      (result: any) => ({ commitment: result.data.deleteCommitmentElectorate })
    )

  addElectorateToCommitment = (variables: { commitment: any, electorate: any }) =>
    this.callMutate<any>(
      { mutation: STORE_COMMITMENT_ELECTORATE, variables: { ...variables } },
      (result: any) => ({ commitment: result.data.storeCommitmentElectorate })
    )

  getCommitment = (criteria: { id: any; }) => this.callQuery<CommitmentResult>({ query: GET_COMMITMENT, variables: criteria })

  filterMapPoints = (filter?: any) => this.callQuery<MapPointsResult>({ query: GET_MAP_POINTS })

  filterWhoAnnouncedTypes = (filter?: any) => this.callQuery<WhoAnnouncedTypesResult>({ query: GET_WHO_ANNOUNCED_TYPES, variables: filter })
  filterAnnouncementTypes = (filter?: any) => this.callQuery<AnnouncementTypesResult>({ query: GET_ANNOUNCEMENT_TYPES, variables: filter })
  filterCriticalDates = (filter?: any) => this.callQuery<CriticalDatesResult>({ query: GET_CRITICAL_DATES, variables: filter })
  filterCommitments = (filter?: any) => this.callQuery<CommitmentsResult>({ query: GET_ALL_COMMITMENTS, variables: filter })
  filterPortfolios = (filter?: any) => this.callQuery<PortfoliosResult>({ query: GET_PORTFOLIOS, variables: filter })
  filterPartys = (filter?: any) => this.callQuery<PartysResult>({ query: GET_PARTIES, variables: filter })
  filterContacts = (filter?: any) => this.callQuery<ContactsResult>({ query: GET_CONTACTS, variables: filter })
  filterLocations = (filter?: any) => this.callQuery<LocationsResult>({ query: GET_LOCATIONS, variables: filter })
  filterCommitmentTypes = (filter?: any) => this.callQuery<CommitmentTypesResult>({ query: GET_COMMITMENT_TYPES, variables: filter })
  filterParties = (filter?: any) => this.callQuery<PartysResult>({ query: GET_PARTIES, variables: filter })
  getCommentsByCommitment = (commitment: any) => this.callQuery<CommentsResult>({ query: COMMENTS_BY_COMMITMENT, variables: { commitment: commitment } })
  getMapPointsByCommitment = (commitment: any) =>
    this.callQuery<MapPointsResult>({ query: MAP_POINTS_BY_COMMITMENT, variables: { commitment: commitment } },
      (result: any): any => ({ data: { mapPoints: result.data.commitmentMapPoints } }))

  getRelatedCommitmentsByCommitment = (commitment: any) => this.callQuery<RelatedCommitmentsResult>({ query: RELATED_COMMITMENTS_BY_COMMITMENT, variables: { commitment: commitment } })

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
  }, mapper?: any): Observable<DataResult<T>> {

    return this.apollo
      .query({
        ...options
      })
      .pipe(
        switchMap((result: any) => {
          if (mapper) {
            return of(mapper(result) as DataResult<T>)
          }
          return of(result as DataResult<T>)
        }),
        catchError(err => this.replyError<T>(err))
      )
  }

  replyError<T>(err): Observable<DataResult<T>> {
    const error: DataResult<T> = { data: null, error: err, loading: false }
    return of(error)
  }
}
