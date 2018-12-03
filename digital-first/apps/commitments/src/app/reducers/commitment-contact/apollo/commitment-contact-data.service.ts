import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { callQuery, callMutate } from '../../../services/apollo/apollo-helpers'
import { DataResult, ContactsResult } from '../../../models'
import { REMOVE_COMMITMENT_CONTACT, STORE_COMMITMENT_CONTACT, GET_COMMITMENT_CONTACTS } from './queries'
import { CommitmentContactDataService } from '../commitment-contact-data.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommitmentContactDataApolloService implements CommitmentContactDataService {

  getContactsByCommitment = (commitment: any): Observable<DataResult<ContactsResult>> =>
    callQuery<ContactsResult>(this.apollo, { query: GET_COMMITMENT_CONTACTS, variables: { commitment: commitment } }
      , result => ({ data: { contacts: result.data.commitmentContacts } })
    )

  addContactToCommitment = (variables: { commitment: any, contact: any }): Observable<DataResult<{ commitment: number }>> =>
    callMutate<any>(this.apollo,
      { mutation: STORE_COMMITMENT_CONTACT, variables: { ...variables } },
      (result: any) => ({ data: { commitment: result.data.storeCommitmentContact.id } })
    )

  removeContactFromCommitment = (variables: { commitment: any, contact: any }): Observable<DataResult<{ commitment: number }>> =>
    callMutate<any>(this.apollo,
      { mutation: REMOVE_COMMITMENT_CONTACT, variables: { ...variables } },
      (result: any) => ({ data: { commitment: result.data.deleteCommitmentContact.id } })
    )

  constructor(private apollo: Apollo) { }
}
