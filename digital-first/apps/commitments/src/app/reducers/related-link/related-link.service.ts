import {
    Observable, of,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '..'
import { ExpandPanel, CollapsePanel, StoreRelatedLink, RemoveRelatedLink } from './related-link.actions'
import { DataTableConfig } from '@digital-first/df-components'

@Injectable({
    providedIn: 'root'
})
export class RelatedLinkService {

    constructor(private store: Store<fromRoot.State>) { }

    addItemToCommitment(commitment: string | number, relatedTo: any): any {
        this.store.dispatch(new StoreRelatedLink(null))
    }

    removeItemFromCommitment(commitment: string | number, id: number): any {
        this.store.dispatch(new RemoveRelatedLink({ id }))
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