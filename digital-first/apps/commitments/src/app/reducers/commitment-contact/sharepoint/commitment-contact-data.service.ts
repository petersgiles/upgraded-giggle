import { Injectable } from '@angular/core'
import { SharepointJsomService, idFromLookup } from '@digital-first/df-sharepoint'
import { CommitmentContactDataService } from '../commitment-contact-data.service'
import { Observable, of } from 'rxjs'
import { DataResult, ContactsResult } from '../../../models'
import { concatMap, map, tap } from 'rxjs/operators'
import { byIdQuery, byJoinTableQuery, byCommitmentIdQuery, byIdsQuery } from '../../../services/sharepoint/caml'
import { mapCommitmentContacts, mapContacts } from '../../../services/sharepoint/contact'

@Injectable({
    providedIn: 'root'
})
export class CommitmentContactDataSharePointService implements CommitmentContactDataService {
    getContactsByCommitment(commitment: any): Observable<DataResult<ContactsResult>> {
        return this.sharepoint.getItems({
            listName: 'CommitmentContact',
            viewXml: byCommitmentIdQuery({ id: commitment })
        }).pipe(
            map(result => result.map(r => idFromLookup(r.Contact))),
            concatMap((contactids: []) => {

                const query = byIdsQuery(contactids)

                // tslint:disable-next-line:no-console
                console.log(commitment, contactids, query)

                return this.sharepoint.getItems({
                    listName: 'Contact',
                    viewXml: query
                }).pipe(
                    // tslint:disable-next-line:no-console
                    tap(r => console.log(r)),
                    concatMap((result: any) =>
                        of({
                            data: { contacts: mapContacts(result) },
                            loading: false
                        })))
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