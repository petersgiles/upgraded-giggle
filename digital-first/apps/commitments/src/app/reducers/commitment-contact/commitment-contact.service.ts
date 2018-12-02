import {
    Observable, of,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '..'
import { ExpandPanel, CollapsePanel } from './commitment-contact.actions'

@Injectable({
    providedIn: 'root'
})
export class CommitmentContactService {

    constructor(private store: Store<fromRoot.State>) { }

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