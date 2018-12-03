import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { CommitmentContactDataService } from '../commitment-contact-data.service'
import { Observable } from 'rxjs'
import { DataResult, ContactsResult } from '../../../models'

@Injectable({
    providedIn: 'root'
})
export class CommitmentContactDataSharePointService implements CommitmentContactDataService {
    getContactsByCommitment(commitment: any): Observable<DataResult<ContactsResult>> {
        throw new Error('Method not implemented.')
    }
    addContactToCommitment(variables: { commitment: any; contact: any; }): Observable<DataResult<{ commitment: number }>> {
        throw new Error('Method not implemented.')
    }
    removeContactFromCommitment(variables: { id: any; }): Observable<DataResult<{ commitment: number }>> {
        throw new Error('Method not implemented.')
    }
    constructor(private sharepoint: SharepointJsomService) { }
}