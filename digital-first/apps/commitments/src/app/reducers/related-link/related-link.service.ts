import {
    Observable, of,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '..'
import { ExpandPanel, CollapsePanel, AddLinkToCommitment, RemoveLinkFromCommitment } from './related-link.actions'
import { DataTableConfig } from '@digital-first/df-datatable'

@Injectable({
    providedIn: 'root'
})
export class RelatedLinkService {

    constructor(private store: Store<fromRoot.State>) { }

    get UserOperation(): Observable<any> {
        return this.store.pipe(
            select(fromRoot.getCurrentUserOperations),
        )
    }

    addItemToCommitment(payload: {commitment: string | number, url: string, title: string}): any {
        this.store.dispatch(new AddLinkToCommitment(payload))
    }

    removeItemFromCommitment(payload: {commitment: string | number, id: number}): any {
        this.store.dispatch(new RemoveLinkFromCommitment(payload))
    }

    get TableData(): Observable<DataTableConfig> {
        return this.store.pipe(select(fromRoot.getRelatedLinksTableData))
    }

    get Expanded(): Observable<boolean> {
        return this.store.pipe(select(fromRoot.getCommitmentRelatedLinksPanelExpanded))
    }

    expandPanel() {
        this.store.dispatch(new ExpandPanel())
    }

    collapsePanel() {
        this.store.dispatch(new CollapsePanel())
    }

}