import {
    Observable, of,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import * as fromRoot from '..'
import { ExpandPanel, CollapsePanel, AddElectorateToCommitment, RemoveElectorateFromCommitment, AddMapPointToCommitment, RemoveMapPointFromCommitment } from './commitment-delivery-location.actions'
import { DataTableConfig, MapPoint } from '@digital-first/df-components'

@Injectable({
    providedIn: 'root'
})
export class DeliveryLocationService {

    public addElectorateToCommitment(commitment: string | number, electorate: string | number): any {
        this.store.dispatch(new AddElectorateToCommitment({ commitment, electorate }))
      }
      public removeElectorateFromCommitment(commitment: string | number, electorate: string | number): any {
        this.store.dispatch(new RemoveElectorateFromCommitment({ commitment, electorate }))
      }

      public addMapPointToCommitment(commitment: string | number, mapPoint: MapPoint): any {
        this.store.dispatch(new AddMapPointToCommitment({ commitment, mapPoint }))
      }
      public removeMapPointFromCommitment(commitment: string | number, mapPoint: MapPoint): any {
        this.store.dispatch(new RemoveMapPointFromCommitment({ commitment, mapPoint }))
      }

    constructor(private store: Store<fromRoot.State>) { }

    get UserOperation(): Observable<any> {
        return this.store.pipe(
            select(fromRoot.getCurrentUserOperations),
        )
    }

    addItemToCommitment(payload: {commitment: string | number, url: any}): any {
        // this.store.dispatch(new AddLinkToCommitment(payload))
    }

    removeItemFromCommitment(payload: {commitment: string | number, id: number}): any {
        // this.store.dispatch(new RemoveLinkFromCommitment(payload))
    }

    get TableData(): Observable<DataTableConfig> {
        return of() // this.store.pipe(select(fromRoot.getDeliveryLocationsTableData))
    }

    get Expanded(): Observable<boolean> {
        return this.store.pipe(select(fromRoot.getCommitmentDeliveryLocationsPanelExpanded))
    }

    expandPanel() {
        this.store.dispatch(new ExpandPanel())
    }

    collapsePanel() {
        this.store.dispatch(new CollapsePanel())
    }

}