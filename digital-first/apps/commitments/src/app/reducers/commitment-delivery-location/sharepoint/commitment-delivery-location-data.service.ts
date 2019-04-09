import { Injectable } from '@angular/core'
import {
  SharepointJsomService
} from '@df/sharepoint'
import { DeliveryLocationDataService } from '../commitment-delivery-location-data.service'
import { Observable, of } from 'rxjs'
import {
  DataResult,
  MapPointsResult
} from '../../../models'
import { concatMap, map, tap } from 'rxjs/operators'
import {
  byCommitmentIdQuery,
  byJoinTableQuery,
  byIdsQuery,
  byMapPointPlaceIdQuery
} from '../../../services/sharepoint/caml'
import {
  mapCommitmentMapPoints,
  mapMapPoints/*,
  mapCommitmentElectorates,
  mapElectorates*/
} from './maps'
import {
  mapCommitmentElectorates,
} from '../../commitment-lookup/sharepoint/maps'
import { MapPoint } from '@digital-first/df-map'
import { CommitmentElectoratesResult } from '../../../models/location.model'

@Injectable({
  providedIn: 'root'
})
export class DeliveryLocationDataSharePointService
  implements DeliveryLocationDataService {

  getElectoratesByCommitment(commitment: any): Observable<DataResult<CommitmentElectoratesResult>> {
      return this.sharepoint.getItems({
        listName: 'CommitmentElectorate',
        viewXml: byCommitmentIdQuery({ id: commitment })
      }).pipe(
        map(mapCommitmentElectorates),

        concatMap((commitmentElectorates: any) => {
          const ids = commitmentElectorates.map(ce => ce.electorateId)

          if (!ids.length) {
            return of({
              data: { commitmentElectorates: [] },
              loading: false
            })
          }

          const viewXml = byIdsQuery(ids)

          return this.sharepoint
            .getItems({
              listName: 'Electorate',
              viewXml: viewXml
            })
            .pipe(
              concatMap(electorates =>
                of({
                  data: { commitmentElectorates: mapCommitmentElectorates(electorates) },
                  loading: false
                })
              )
            )
        })
      )
  }

  getMapPointsByCommitment(
    commitment: number
  ): Observable<DataResult<MapPointsResult>> {
    const viewXml = byCommitmentIdQuery({ id: commitment })

    return this.sharepoint
      .getItems({
        listName: 'CommitmentMapPoint',
        viewXml: viewXml
      })
      .pipe(
        map(mapCommitmentMapPoints),

        concatMap((commitmentMapPoints: any) => {
          const mpIds = commitmentMapPoints.map(mp => mp.mapPoint)

          if (!mpIds.length) {
            return of({
              data: { mapPoints: [] },
              loading: false
            })
          }

          const mapPointViewXml = byIdsQuery(mpIds)

          return this.sharepoint
            .getItems({
              listName: 'MapPoint',
              viewXml: mapPointViewXml
            })
            .pipe(
              concatMap(mapPoints =>
                of({
                  data: { mapPoints: mapMapPoints(mapPoints) },
                  loading: false
                })
              )
            )
        })
      )
  }

  filterMapPoints(payload?: any): Observable<DataResult<MapPointsResult>> {
    return this.sharepoint.getItems({ listName: 'MapPoint' }).pipe(
      concatMap((result: any) =>
        of({
          data: { mapPoints: mapMapPoints(result) },
          loading: false,
          error: null
        })
      )
    )
  }

  storeMapPoint(mapPoint: MapPoint): Observable<any> {
    const LISTNAME = 'MapPoint'

    const spMapPoint = {
      Title: mapPoint.address,
      Latitude: mapPoint.latitude,
      Longitude: mapPoint.longitude,
      PlaceId: mapPoint.place_id
    }

    const viewXml = byMapPointPlaceIdQuery({ placeId: spMapPoint.PlaceId })

    return this.sharepoint
      .getItems({
        listName: LISTNAME,
        viewXml: viewXml
      })
      .pipe(
        concatMap(found => {
          if (found && found.length) {
            return of(found)
          }

          return this.sharepoint
            .storeItem({
              listName: 'MapPoint',
              data: spMapPoint
            })
            .pipe(
              concatMap(_ =>
                this.sharepoint.getItems({
                  listName: LISTNAME,
                  viewXml: byMapPointPlaceIdQuery({
                    placeId: spMapPoint.PlaceId
                  })
                })
              )
            )
        })
      )
  }

  removeMapPoint(placeId: any) {
    return this.sharepoint.removeItem({
      listName: 'MapPoint',
      id: placeId
    })
  }

  addMapPointToCommitment(payload: { commitment: any; mapPoint: any }) {
    const viewXml = byMapPointPlaceIdQuery({
      placeId: payload.mapPoint.place_id
    })

    return this.sharepoint
      .getItems({
        listName: 'MapPoint',
        viewXml: viewXml
      })
      .pipe(
        map(found => found[0]),
        concatMap((found: any) => {
          const spMapPoint = {
            Title: `${payload.commitment} ${found.ID}`,
            Commitment: payload.commitment,
            MapPoint: found.ID
          }

          return this.sharepoint
            .storeItem({
              listName: 'CommitmentMapPoint',
              data: spMapPoint
            })
            .pipe(
              concatMap(_ => of({ commitment: { id: payload.commitment } }))
            )
        })
      )
  }

  removeMapPointFromCommitment(payload: { commitment: any; mapPoint: any }) {
    const LISTNAME = 'CommitmentMapPoint'
    const MAPOINT_LISTNAME = 'MapPoint'

    const mapPointViewXml = byMapPointPlaceIdQuery({
      placeId: payload.mapPoint
    })

    return this.sharepoint
      .getItems({
        listName: MAPOINT_LISTNAME,
        viewXml: mapPointViewXml
      })
      .pipe(
        map(result => result[0]),
        concatMap((result: any) => {
          const viewXml = byJoinTableQuery({
            fieldA: { name: 'Commitment', id: payload.commitment },
            fieldB: { name: 'MapPoint', id: result.ID }
          })

          return this.sharepoint
            .getItems({
              listName: LISTNAME,
              viewXml: viewXml
            })
            .pipe(
              map(mapCommitmentMapPoints),
              map(mapCommitmentPointsResult => mapCommitmentPointsResult[0]),
              concatMap(mapCommitmentPointsResult =>
                this.sharepoint
                  .removeItem({
                    listName: LISTNAME,
                    id: mapCommitmentPointsResult.id
                  })
                  .pipe(
                    concatMap(_ =>
                      of({ commitment: { id: payload.commitment } })
                    )
                  )
              )
            )
        })
      )
  }

  removeElectorateFromCommitment(payload: any): Observable<any> {
    const LISTNAME = 'CommitmentElectorate'

    return this.sharepoint
      .getItems({
        listName: LISTNAME,
        viewXml: byJoinTableQuery({
          fieldA: { name: 'Commitment', id: payload.commitment },
          fieldB: { name: 'Electorate', id: payload.electorate }
        })
      })
      .pipe(
        map(mapCommitmentElectorates),
        map(result => result[0]),
        concatMap(result =>
          this.sharepoint
            .removeItem({
              listName: LISTNAME,
              id: result.id
            })
            .pipe(concatMap(_ => of({ commitment: { id: result.commitment } })))
        )
      )
  }

  addElectorateToCommitment(payload: any): Observable<any> {
    const spMapPoint = {
      Title: `${payload.commitment} ${payload.electorate}`,
      Commitment: payload.commitment,
      Electorate: payload.electorate
    }

    return this.sharepoint
      .storeItem({
        listName: 'CommitmentElectorate',
        data: spMapPoint
      })
      .pipe(concatMap(_ => of({ commitment: { id: payload.commitment } })))
  }

  constructor(private sharepoint: SharepointJsomService) {}
}
