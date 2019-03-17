import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@df/sharepoint'
import { CommitmentContactDataService } from '../commitment-contact-data.service'
import { Observable, of } from 'rxjs'
import { DataResult, ContactsResult } from '../../../models'
import { concatMap, map } from 'rxjs/operators'
import { byIdQuery, byJoinTableQuery, byCommitmentIdQuery, byIdsQuery } from '../../../services/sharepoint/caml'
import { mapCommitmentContacts } from './maps'
import { mapContacts } from '../../../services/sharepoint/contact'

@Injectable({
    providedIn: 'root'
})
export class CommitmentContactDataSharePointService implements CommitmentContactDataService {
    getContactsByCommitment(commitment: any): Observable<DataResult<ContactsResult>> {

        const viewXml = byCommitmentIdQuery({ id: commitment })

        return this.sharepoint.getItems({
            listName: 'CommitmentContact',
            viewXml: viewXml
        }).pipe(
            map(mapCommitmentContacts),
            concatMap((result: any) => {

                const ids = result.map(p => p.contact)
                const contactViewXml = byIdsQuery(ids)

                return this.sharepoint.getItems({
                    listName: 'Contact',
                    viewXml: contactViewXml
                }).pipe(
                    concatMap(mapPoints =>
                        of({
                            data: { contacts: mapContacts(mapPoints) },
                            loading: false
                        }))
                )
            })
        )
    }

    addContactToCommitment(variables: { commitment: number; contact: any; }): Observable<DataResult<{ commitment: number }>> {
        const spComment = {
            Title: `${variables.commitment} ${variables.contact}`,
            Commitment: variables.commitment,
            Contact: variables.contact
        }

        return this.sharepoint.storeItem({
            listName: 'CommitmentContact',
            data: spComment,
        }).pipe(
            concatMap(_ =>
                of({
                    loading: false,
                    data: {
                        commitment: variables.commitment
                    }
                }))
        )
    }

    removeContactFromCommitment(variables: { commitment: number; contact: any; }) {

        const viewXml = byJoinTableQuery({ fieldA: { name: 'Commitment', id: variables.commitment }, fieldB: { name: 'Contact', id: variables.contact } })

        return this.sharepoint.getItems({
            listName: 'CommitmentContact',
            viewXml: viewXml
        }).pipe(
            map(mapCommitmentContacts),
            map(result => result[0]),
            concatMap(result =>
                this.sharepoint.removeItem({
                    listName: 'CommitmentContact', id: result.id
                }).pipe(
                    concatMap(_ =>
                        of({
                            loading: false,
                            data: {
                                commitment: result.commitment
                            }
                        }))
                )
            )
        )
    }

    constructor(private sharepoint: SharepointJsomService) { }
}
