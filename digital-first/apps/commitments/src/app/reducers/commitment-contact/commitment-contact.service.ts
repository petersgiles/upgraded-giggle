import {
    Observable, of,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '..'
import { ExpandPanel, CollapsePanel, AddContactToCommitment, RemoveContactFromCommitment } from './commitment-contact.actions'
import { DataTableConfig } from '@digital-first/df-datatable'
import { Contact } from '../../models/contact.model'

@Injectable({
    providedIn: 'root'
})
export class CommitmentContactService {

    constructor(private store: Store<fromRoot.State>) { }

    get UserOperation(): Observable<any> {
        return this.store.pipe(
            select(fromRoot.getCurrentUserOperations),
        )
    }

    addContactToCommitment(commitment: any, contact: any): any {
        this.store.dispatch(new AddContactToCommitment({ commitment, contact }))
    }

    removeContactFromCommitment(commitment: any, contact: any): any {
        this.store.dispatch(new RemoveContactFromCommitment({ commitment, contact }))
    }

    get CommitmentContactsTableData(): Observable<DataTableConfig> {
        return this.store.pipe(select(fromRoot.getCommitmentContactsTableData))
    }

    get Contacts(): Observable<Contact[]> {
        return this.store.pipe(select(fromRoot.getAllContacts))
    }

    get Expanded(): Observable<boolean> {
        return this.store.pipe(select(fromRoot.getCommitmentContactPanelExpanded))
    }

    expandPanel() {
        this.store.dispatch(new ExpandPanel())
    }

    collapsePanel() {
        this.store.dispatch(new CollapsePanel())
    }

}