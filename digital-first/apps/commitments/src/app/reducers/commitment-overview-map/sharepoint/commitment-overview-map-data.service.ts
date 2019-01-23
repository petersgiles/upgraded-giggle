import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { Observable, of } from 'rxjs'
import { DataResult, MapPointsResult, CommitmentsResult } from '../../../models'
import { concatMap, tap, map } from 'rxjs/operators'
import { CommitmentOverviewMapDataService } from '../commitment-overview-map-data.service'
import { mapMapPoints, mapCommitmentMapPoints, mapMapPoint } from '../../../services/sharepoint/geo'
import { mapCommitments } from '../../../services/sharepoint/commitment'
import { byMapPointPlaceIdQuery, byIdsQuery, byIdQuery, byMapPointIdQuery } from '../../../services/sharepoint/caml'
import { LoggerService } from '@digital-first/df-logging'

@Injectable({
    providedIn: 'root'
})
export class CommitmentOverviewMapDataSharePointService implements CommitmentOverviewMapDataService {

    getMapPoints = (filter: any): Observable<DataResult<MapPointsResult>> =>
        this.sharepoint.getItems({
            listName: 'MapPoint'
        }).pipe(
            tap(r => this.logger.info(r)),
            concatMap((result: any) =>
                of({
                    data: { mapPoints: mapMapPoints(result) },
                    loading: false
                }))
        )

    getCommitmentOverviewMapCommitments = (mapPoint: any): Observable<DataResult<CommitmentsResult>> => {

        const mapPointViewXml = byMapPointPlaceIdQuery({ placeId: mapPoint.filter })

        this.logger.info('getCommitmentOverviewMapCommitments', mapPointViewXml, mapPoint)

        return this.sharepoint.getItems({
            listName: 'MapPoint',
            viewXml: mapPointViewXml
        }).pipe(
            this.logger.info(r => this.logger.info(r)),
            map(mapPointResult => mapPointResult[0]),
            map(mapMapPoint),
            concatMap((mapPointResult: any) => {

                const viewXml = byMapPointIdQuery(mapPointResult)
                this.logger.info('getCommitmentOverviewMapCommitments', viewXml, mapPointResult)
                return this.sharepoint.getItems({
                    listName: 'CommitmentMapPoint',
                    viewXml: viewXml
                }).pipe(
                    map(mapCommitmentMapPoints),
                    this.logger.info(r => this.logger.info(r)),
                    concatMap((result: any) => {

                        const ids = result.map(p => p.commitment)
                        const cViewXml = byIdsQuery(ids)

                        return this.sharepoint.getItems({
                            listName: 'Commitment',
                            viewXml: cViewXml
                        }).pipe(
                            this.logger.info(r => this.logger.info(r)),
                            concatMap(commitments =>
                                of({
                                    data: { commitments: mapCommitments(commitments) },
                                    loading: false
                                }))
                        )
                    })
                )
            })
        )

    }

    constructor(private sharepoint: SharepointJsomService, private logger: LoggerService) { }
}
