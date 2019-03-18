import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@df/sharepoint'
import { Observable, of, forkJoin } from 'rxjs'
import { DataResult, MapPointsResult, CommitmentsResult } from '../../../models'
import { concatMap, tap, map } from 'rxjs/operators'
import { CommitmentOverviewMapDataService } from '../commitment-overview-map-data.service'

import { mapCommitments } from '../../../services/sharepoint/commitment'
import {
  byMapPointPlaceIdQuery,
  byIdsQuery,
  byMapPointIdQuery
} from '../../../services/sharepoint/caml'
import {
  mapMapPoints,
  mapMapPoint,
  mapCommitmentMapPoints
} from '../../commitment-delivery-location/sharepoint/maps'

import { LoggerService } from '@digital-first/df-logging'
import { CommitmentMapPointsResult } from '../../../models/commitment-map-points.model'
import { arrayToHash } from '@digital-first/df-utils'

@Injectable({
  providedIn: 'root'
})
export class CommitmentOverviewMapDataSharePointService
  implements CommitmentOverviewMapDataService {
  getCommitmentOverviewCommitmentMapPoints(
    filter: any
  ): Observable<DataResult<CommitmentMapPointsResult>> {
    return forkJoin([
      this.sharepoint.getItems({
        listName: 'CommitmentMapPoint'
      }),
      this.sharepoint.getItems({
        listName: 'MapPoint'
      }),
      this.sharepoint.getItems({
        listName: 'Commitment'
      })
    ]).pipe(
      concatMap(([spCommitmentMapPoints, spMapPoints, spCommitment]) => {
        const commitmentMapPoints = mapCommitmentMapPoints(
          spCommitmentMapPoints
        )
        const mapPoints = arrayToHash(mapMapPoints(spMapPoints))
        const commitments = arrayToHash(mapCommitments(spCommitment))

        const commps = (commitmentMapPoints || []).map((cmp: any) => ({
          mapPoint: {
            ...mapPoints[cmp.mapPoint]
          },
          commitment: {
            ...commitments[cmp.commitment]
          }
        }))

        return of({
          data: { commitmentMapPoints: commps },
          loading: false
        })
      })
    )
  }

  getMapPoints = (filter: any): Observable<DataResult<MapPointsResult>> =>
    this.sharepoint
      .getItems({
        listName: 'MapPoint'
      })
      .pipe(
        concatMap((result: any) =>
          of({
            data: { mapPoints: mapMapPoints(result) },
            loading: false
          })
        )
      )

  getCommitmentOverviewMapCommitments = (
    mapPoint: any
  ): Observable<DataResult<CommitmentsResult>> => {
    const mapPointViewXml = byMapPointPlaceIdQuery({
      placeId: mapPoint.filter
    })

    return this.sharepoint
      .getItems({
        listName: 'MapPoint',
        viewXml: mapPointViewXml
      })
      .pipe(
        map(mapPointResult => mapPointResult[0]),
        map(mapMapPoint),
        concatMap((mapPointResult: any) => {
          const viewXml = byMapPointIdQuery(mapPointResult)

          return this.sharepoint
            .getItems({
              listName: 'CommitmentMapPoint',
              viewXml: viewXml
            })
            .pipe(
              map(mapCommitmentMapPoints),

              concatMap((result: any) => {
                const ids = result.map(p => p.commitment)
                const cViewXml = byIdsQuery(ids)

                return this.sharepoint
                  .getItems({
                    listName: 'Commitment',
                    viewXml: cViewXml
                  })
                  .pipe(
                    concatMap(commitments =>
                      of({
                        data: { commitments: mapCommitments(commitments) },
                        loading: false
                      })
                    )
                  )
              })
            )
        })
      )
  }

  constructor(
    private sharepoint: SharepointJsomService,
    private logger: LoggerService
  ) {}
}
