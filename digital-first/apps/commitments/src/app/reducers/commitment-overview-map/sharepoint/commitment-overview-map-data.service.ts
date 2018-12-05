import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { Observable, of } from 'rxjs'
import { DataResult, MapPointsResult } from '../../../models'
import { concatMap, tap, map } from 'rxjs/operators'
import { CommitmentOverviewMapDataService } from '../commitment-overview-map-data.service'
import { mapMapPoints } from '../../../services/sharepoint/geo'

@Injectable({
    providedIn: 'root'
})
export class CommitmentOverviewMapDataSharePointService implements CommitmentOverviewMapDataService {

    getMapPoints = (filter: any): Observable<DataResult<MapPointsResult>> =>
        this.sharepoint.getItems({
            listName: 'MapPoint'
        }).pipe(
            // tslint:disable-next-line:no-console
            tap(r => console.log(r)),
            concatMap((result: any) =>
                of({
                    data: { mapPoints: mapMapPoints(result) },
                    loading: false
                }))
        )

    constructor(private sharepoint: SharepointJsomService) { }
}