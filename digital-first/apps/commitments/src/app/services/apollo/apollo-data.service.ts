
import {
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
import { callQuery, callMutate } from './apollo-helpers'
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

    return callMutate<CommitmentResult>(this.apollo,
      { mutation: UPSERT_COMMITMENT, variables: variables },
      (result: any) => ({ data: { commitment: result.data.upsertCommitment } }))

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
    return callMutate<any>(this.apollo, { mutation: STORE_CONTACT, variables: variables })
  }

  addContactToCommitment = (variables: { commitment: any, contact: any }) =>
    callMutate<any>(this.apollo,
      { mutation: STORE_COMMITMENT_CONTACT, variables: { ...variables } },
      (result: any) => ({ commitment: result.data.storeCommitmentContact })
    )

  removeContactFromCommitment = (variables: { id: any }) =>
    callMutate<any>(this.apollo,
      { mutation: REMOVE_COMMITMENT_CONTACT, variables: { ...variables } },
      (result: any) => ({ commitment: result.data.deleteCommitmentContact })
    )

  storeMapPoint = (mapPoint: any) =>
    callMutate<any>(this.apollo,
      { mutation: STORE_MAP_POINT, variables: { ...mapPoint } },
      (result: any) => ({ commitment: result.data.storeMapPoint })
    )

  removeMapPoint = (placeId: any) =>
    callMutate<any>(this.apollo,
      { mutation: REMOVE_MAP_POINT, variables: { place_id: placeId } },
      (result: any) => ({ commitment: result.data.removeMapPoint })
    )

  addMapPointToCommitment = (variables: { commitment: any, mapPoint: any }) => callMutate<any>(this.apollo,
    { mutation: STORE_COMMITMENT_MAP_POINT, variables: { commitment: variables.commitment, mapPoint: variables.mapPoint.place_id } },
    (result: any) => ({ commitment: result.data.storeCommitmentMapPoint })
  )

  removeMapPointFromCommitment = (variables: { commitment: any, mapPoint: any }) =>
    callMutate<any>(this.apollo,
      { mutation: REMOVE_COMMITMENT_MAP_POINT, variables: { ...variables } },
      (result: any) => ({ commitment: result.data.deleteCommitmentMapPoint })
    )

  addCommitmentToCommitment = (variables: { commitment: any, relatedTo: any }) => callMutate<any>(this.apollo,
    { mutation: STORE_RELATED_COMMITMENT, variables: { ...variables } },
    (result: any) => ({ commitment: result.data.storeRelatedCommitment })
  )

  removeCommitmentFromCommitment = (variables: { commitment: any, relatedTo: any }) => callMutate<any>(this.apollo,
    { mutation: REMOVE_RELATED_COMMITMENT, variables: { ...variables } },
    (result: any) => ({ commitment: result.data.deleteRelatedCommitment })
  )

  removeElectorateFromCommitment = (variables: { commitment: any, electorate: any }) =>
    callMutate<any>(this.apollo,
      { mutation: REMOVE_COMMITMENT_ELECTORATE, variables: { ...variables } },
      (result: any) => ({ commitment: result.data.deleteCommitmentElectorate })
    )

  addElectorateToCommitment = (variables: { commitment: any, electorate: any }) =>
    callMutate<any>(this.apollo,
      { mutation: STORE_COMMITMENT_ELECTORATE, variables: { ...variables } },
      (result: any) => ({ commitment: result.data.storeCommitmentElectorate })
    )

  getCommitment = (criteria: { id: any; }) => callQuery<CommitmentResult>(this.apollo, { query: GET_COMMITMENT, variables: criteria })

  filterMapPoints = (filter?: any) => callQuery<MapPointsResult>(this.apollo, { query: GET_MAP_POINTS })

  filterWhoAnnouncedTypes = (filter?: any) => callQuery<WhoAnnouncedTypesResult>(this.apollo, { query: GET_WHO_ANNOUNCED_TYPES, variables: filter })
  filterAnnouncementTypes = (filter?: any) => callQuery<AnnouncementTypesResult>(this.apollo, { query: GET_ANNOUNCEMENT_TYPES, variables: filter })
  filterCriticalDates = (filter?: any) => callQuery<CriticalDatesResult>(this.apollo, { query: GET_CRITICAL_DATES, variables: filter })
  filterCommitments = (filter?: any) => callQuery<CommitmentsResult>(this.apollo, { query: GET_ALL_COMMITMENTS, variables: filter })
  filterPortfolios = (filter?: any) => callQuery<PortfoliosResult>(this.apollo, { query: GET_PORTFOLIOS, variables: filter })
  filterPartys = (filter?: any) => callQuery<PartysResult>(this.apollo, { query: GET_PARTIES, variables: filter })
  filterContacts = (filter?: any) => callQuery<ContactsResult>(this.apollo, { query: GET_CONTACTS, variables: filter })
  filterLocations = (filter?: any) => callQuery<LocationsResult>(this.apollo, { query: GET_LOCATIONS, variables: filter })
  filterCommitmentTypes = (filter?: any) => callQuery<CommitmentTypesResult>(this.apollo, { query: GET_COMMITMENT_TYPES, variables: filter })
  filterParties = (filter?: any) => callQuery<PartysResult>(this.apollo, { query: GET_PARTIES, variables: filter })
  getMapPointsByCommitment = (commitment: any) =>
    callQuery<MapPointsResult>(this.apollo, { query: MAP_POINTS_BY_COMMITMENT, variables: { commitment: commitment } },
      (result: any): any => ({ data: { mapPoints: result.data.commitmentMapPoints } }))

  getRelatedCommitmentsByCommitment = (commitment: any) => callQuery<RelatedCommitmentsResult>(this.apollo, { query: RELATED_COMMITMENTS_BY_COMMITMENT, variables: { commitment: commitment } })
}
