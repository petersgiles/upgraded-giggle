import {
    Observable,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'

import * as fromRoot from '..'
import { MapPoint, DataTableConfig } from '@digital-first/df-components'
import { GetCommitmentOverviewMapPoints, GetCommitmentOverviewMapCommitments } from './commitment-overview-map.actions'
import { Commitment } from '../../reducers/commitment/commitment.model'
@Injectable({
    providedIn: 'root'
})
export class CommitmentOverviewMapService {

    constructor(private store: Store<fromRoot.State>) { }
    get Commitments(): Observable<DataTableConfig> {
        return this.store.pipe(select(fromRoot.getCommitmentOverviewMapCommitmentsTableData))
    }

    get MapPoints(): Observable<MapPoint[]> {
        return this.store.pipe(select(fromRoot.getCommitmentOverviewMapMapPoints))
    }

    getMapPoints(filter?: string): any {
        this.store.dispatch(new GetCommitmentOverviewMapPoints({ filter: filter }))
    }

    getOverviewMapCommitment(filter?: string): any {
        this.store.dispatch(new GetCommitmentOverviewMapCommitments({ filter: filter }))
    }

}