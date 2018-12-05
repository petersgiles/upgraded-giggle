import {
    Observable,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'

import * as fromRoot from '..'
import { MapPoint } from '@digital-first/df-components'
import { GetCommitmentOverviewMapPoints } from './commitment-overview-map.actions'

@Injectable({
    providedIn: 'root'
})
export class CommitmentOverviewMapService {

    constructor(private store: Store<fromRoot.State>) { }

    get MapPoints(): Observable<MapPoint[]> {
        return this.store.pipe(select(fromRoot.getCommitmentOverviewMapMapPoints))
    }

    getMapPoints(filter?: string): any {
        this.store.dispatch(new GetCommitmentOverviewMapPoints({ filter: filter }))
    }

}