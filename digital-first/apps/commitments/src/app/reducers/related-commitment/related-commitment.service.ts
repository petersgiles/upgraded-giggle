import {
    Observable, of,
} from 'rxjs'
import { concatMap, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '..'
import { ExpandPanel, CollapsePanel } from './related-commitment.actions'
import { DataTableConfig } from '@digital-first/df-datatable'
import { Commitment } from '../commitment'
import { AddCommitmentToCommitment, RemoveCommitmentFromCommitment } from '../related-commitment/related-commitment.actions'

@Injectable({
    providedIn: 'root'
})
export class RelatedCommitmentService {

    get UserOperation(): Observable<any> {
        return this.store.pipe(
            select(fromRoot.getCurrentUserOperations),
            // tslint:disable-next-line:no-console
            tap(result => console.log(result))
        )
    }

    get Commitments(): Observable<Commitment[]> {
        return this.store.pipe(select(fromRoot.getAllCommitments))
    }

    constructor(private store: Store<fromRoot.State>) { }

    addItemToCommitment(payload: {commitment: string | number, relatedTo: any}): any {
        this.store.dispatch(new AddCommitmentToCommitment(payload))
    }

    removeItemFromCommitment(payload: {commitment: string | number, relatedTo: number}): any {
        this.store.dispatch(new RemoveCommitmentFromCommitment(payload))
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