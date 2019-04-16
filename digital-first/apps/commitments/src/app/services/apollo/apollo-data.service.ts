
import {
  GET_ALL_COMMITMENTS,
  GET_COMMITMENT,
  GET_CONTACTS,
  UPSERT_COMMITMENT,
  STORE_CONTACT,
  SET_COSTING_REQUIRED
} from './apollo-queries'

import {
  CommitmentResult,
  CommitmentsResult,
  ContactsResult,
  DataResult,
  GroupPermissionsResult,
} from '../../models'

import { Apollo } from 'apollo-angular'
import { AppDataService, ROLE_VISITORS, ROLE_MEMBERS } from '../app-data.service'
import { Commitment } from '../../reducers/commitment'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { AppUserProfile } from '@digital-first/df-layouts'
import { callQuery, callMutate } from './apollo-helpers'
import { GET_GROUP_PERMISSIONS } from './group-permissions'

@Injectable({
  providedIn: 'root'
})
export class ApolloDataService implements AppDataService {
  getCommitment = (criteria: { id: any; }) => callQuery<CommitmentResult>(this.apollo, { query: GET_COMMITMENT, variables: criteria })

  getCurrentUser(): Observable<AppUserProfile> {

    const userprofile = {
      userid: 0,
      login: 'guest',
      isSiteAdmin: true,
      systemUserKey: 'guest',
      name: 'Guest User',
      roles: [ROLE_VISITORS, ROLE_MEMBERS]
    }

    return of(
      userprofile
    )
  }

  getCurrentUserOperations = (filter?: any) => callQuery<GroupPermissionsResult>(this.apollo, { query: GET_GROUP_PERMISSIONS })

  constructor(private apollo: Apollo) { }

  storeCommitment(commitment: Commitment): Observable<DataResult<CommitmentResult>> {
    const variables = {
      ...commitment
    }

    return callMutate<CommitmentResult>(this.apollo,
      { mutation: UPSERT_COMMITMENT, variables: variables },
      (result: any) => ({ data: { commitment: result.data.upsertCommitment } }))

  }

  setCostingRequired(payload: {commitment: number, costingRequired: boolean}): Observable<DataResult<CommitmentResult>> {
    const variables = {
        id: payload.commitment,
        costingRequired: payload.costingRequired
    }

    return callMutate<CommitmentResult>(this.apollo,
      { mutation: SET_COSTING_REQUIRED, variables: variables },
      (result: any) => ({ data: { commitment: result.data.setCostingRequired.id } }))

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

      filterCommitments = (filter?: any) => callQuery<CommitmentsResult>(this.apollo, { query: GET_ALL_COMMITMENTS, variables: filter })
      filterContacts = (filter?: any) => callQuery<ContactsResult>(this.apollo, { query: GET_CONTACTS, variables: filter })
}
