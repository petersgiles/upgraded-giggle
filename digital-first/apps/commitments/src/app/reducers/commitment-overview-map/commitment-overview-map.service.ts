import {
    Observable,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'

import * as fromRoot from '..'
import { MapPoint } from '@digital-first/df-map'
import { GetCommitmentOverviewMapPoints, GetCommitmentOverviewMapCommitments } from './commitment-overview-map.actions'
import { DataTableConfig } from '@digital-first/df-datatable'

@Injectable({
    providedIn: 'root'
})
export class CommitmentOverviewMapService {

    constructor(private store: Store<fromRoot.State>) { }

    get UserOperation(): Observable<any> {
        return this.store.pipe(
            select(fromRoot.getCurrentUserOperations),
        )
    }

    get Commitments(): Observable<DataTableConfig> {
        return this.store.pipe(select(fromRoot.getCommitmentOverviewMapCommitmentsTableData))
    }

    get MapPoints(): Observable<MapPoint[]> {
        return this.store.pipe(select(fromRoot.getCommitmentOverviewMapMapPoints))
    }

    get RefinedMapPoints(): Observable<MapPoint[]> {
        return this.store.pipe(select(fromRoot.getCommitmentOverviewCommitmentsMapPoints))
    }

    getMapPoints(filter?: string): any {
        this.store.dispatch(new GetCommitmentOverviewMapPoints({ filter: filter }))
    }

    getOverviewMapCommitment(filter?: string): any {
        this.store.dispatch(new GetCommitmentOverviewMapCommitments({ filter: filter }))
    }

}