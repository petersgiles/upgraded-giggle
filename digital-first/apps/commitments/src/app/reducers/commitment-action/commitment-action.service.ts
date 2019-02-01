import {
    Observable, of,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '..'
import { ExpandPanel, CollapsePanel, AddActionToCommitment,
    RemoveActionFromCommitment, SetCurrentCommitmentAction, ClearCurrentCommitmentAction } from './commitment-action.actions'
import { DataTableConfig } from '@digital-first/df-datatable'
import { CommitmentAction } from './commitment-action.model'

@Injectable({
    providedIn: 'root'
})
export class CommitmentActionService {

    constructor(private store: Store<fromRoot.State>) { }

    get UserOperation(): Observable<any> {
        return this.store.pipe(
            select(fromRoot.getCurrentUserOperations),
        )
    }

    addActionToCommitment(commitment: any, action: any): any {
        this.store.dispatch(new AddActionToCommitment({ commitment, action }))
    }

    removeActionFromCommitment(commitment: any, action: any): any {
        this.store.dispatch(new RemoveActionFromCommitment({ commitment, action }))
    }

    setCurrentCommitmentAction(commitment: number, action: any): any {
        this.store.dispatch(new ClearCurrentCommitmentAction())
        this.store.dispatch(new SetCurrentCommitmentAction({ commitment, action }))
      }

    get CommitmentActionsTableData(): Observable<DataTableConfig> {
        return this.store.pipe(select(fromRoot.getCommitmentActionsTableData))
    }

    get CurrentAction(): Observable<CommitmentAction> {
        return this.store.pipe(select(fromRoot.getCurrentCommitmentAction))
    }

    get Actions(): Observable<CommitmentAction[]> {
        return this.store.pipe(select(fromRoot.getAllCommitmentActions))
    }

    get Expanded(): Observable<boolean> {
        return this.store.pipe(select(fromRoot.getCommitmentActionPanelExpanded))
    }

    expandPanel() {
        this.store.dispatch(new ExpandPanel())
    }

    collapsePanel() {
        this.store.dispatch(new CollapsePanel())
    }

}