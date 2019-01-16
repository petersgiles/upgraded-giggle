import {
    Observable, of,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '..'
import { ExpandPanel, CollapsePanel, StoreRelatedCommitment, RemoveRelatedCommitment } from './related-commitment.actions'
import { DataTableConfig } from '@digital-first/df-components'

@Injectable({
    providedIn: 'root'
})
export class RelatedCommitmentService {

    get Commitments(): Observable<any> {
        return of([])
    }

    constructor(private store: Store<fromRoot.State>) { }

    addItemToCommitment(commitment: string | number, relatedTo: any): any {
        this.store.dispatch(new StoreRelatedCommitment(null))
    }

    removeItemFromCommitment(commitment: string | number, relatedTo: any): any {
        this.store.dispatch(new RemoveRelatedCommitment({ id: relatedTo }))
    }

    get TableData(): Observable<DataTableConfig> {
        return this.store.pipe(select(fromRoot.getRelatedCommitmentsTableData))
    }

    get Expanded(): Observable<boolean> {
        return this.store.pipe(select(fromRoot.getCommitmentRelatedCommitmentsPanelExpanded))
    }

    expandPanel() {
        this.store.dispatch(new ExpandPanel())
    }

    collapsePanel() {
        this.store.dispatch(new CollapsePanel())
    }

}