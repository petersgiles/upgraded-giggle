
import {
  GET_ALL_COMMITMENTS,
  GET_COMMITMENT,
  GET_CONTACTS,
  UPSERT_COMMITMENT,
  GET_MAP_POINTS,
  STORE_COMMITMENT_MAP_POINT,
  REMOVE_COMMITMENT_MAP_POINT,
  STORE_CONTACT,
  STORE_MAP_POINT,
  REMOVE_MAP_POINT,
  MAP_POINTS_BY_COMMITMENT,
  RELATED_LINKS_BY_COMMITMENT,
  STORE_RELATED_LINK,
  REMOVE_RELATED_LINK,
  RELATED_COMMITMENTS_BY_COMMITMENT,
  STORE_RELATED_COMMITMENT,
  REMOVE_RELATED_COMMITMENT,
  REMOVE_COMMITMENT_ELECTORATE,
  STORE_COMMITMENT_ELECTORATE
} from './apollo-queries'

import {
  CommitmentResult,
  CommitmentsResult,
  ContactsResult,
  DataResult,
  MapPointsResult,
  RelatedCommitmentsResult,
  RelatedLinksResult
} from '../../models'

import { Apollo } from 'apollo-angular'
import { AppDataService } from '../app-data.service'
import { Commitment } from '../../reducers/commitment'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
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

  addLinkToCommitment = (variables: { commitment: any, relatedTo: any }) => callMutate<any>(this.apollo,
    { mutation: STORE_RELATED_LINK, variables: { ...variables } },
    (result: any) => ({ commitment: result.data.storeRelatedLink })
  )

  removeLinkFromCommitment = (variables: { id: any }) => callMutate<any>(this.apollo,
    { mutation: REMOVE_RELATED_LINK, variables: { ...variables } },
    (result: any) => ({ commitment: result.data.deleteRelatedLink })
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
  filterCommitments = (filter?: any) => callQuery<CommitmentsResult>(this.apollo, { query: GET_ALL_COMMITMENTS, variables: filter })
  filterContacts = (filter?: any) => callQuery<ContactsResult>(this.apollo, { query: GET_CONTACTS, variables: filter })
   getMapPointsByCommitment = (commitment: any) =>
    callQuery<MapPointsResult>(this.apollo, { query: MAP_POINTS_BY_COMMITMENT, variables: { commitment: commitment } },
      (result: any): any => ({ data: { mapPoints: result.data.commitmentMapPoints } }))

  getRelatedCommitmentsByCommitment = (commitment: any) => callQuery<RelatedCommitmentsResult>(this.apollo, { query: RELATED_COMMITMENTS_BY_COMMITMENT, variables: { commitment: commitment } })
  getRelatedLinksByCommitment = (commitment: any) => callQuery<RelatedLinksResult>(this.apollo, { query: RELATED_LINKS_BY_COMMITMENT, variables: { commitment: commitment } })
}
