import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { Apollo } from 'apollo-angular'
import { SettingsService } from '../../services/settings.service'
import { Observable } from 'rxjs'
import {  DataResult, DeliveryLocationsResult } from '../../models'
import { DeliveryLocationDataSharePointService } from './sharepoint/commitment-delivery-location-data.service'
import { DeliveryLocationDataApolloService } from './apollo/commitment-delivery-location-data.service'
import { MapPoint } from '@digital-first/df-components'

@Injectable({
  providedIn: 'root'
})
export abstract class DeliveryLocationDataService {
  abstract getElectoratesByCommitment(commitment: any): Observable<any>
  abstract getMapPointsByCommitment(commitment: any): Observable<any>
  abstract addElectorateToCommitment(payload: any): Observable<DataResult<{ commitment: number }>>
  abstract removeElectorateFromCommitment(payload: any): Observable<DataResult<{ commitment: number }>>
  abstract addMapPointToCommitment(payload: { commitment: string | number; mapPoint: MapPoint; }): Observable<any>
  abstract removeMapPointFromCommitment(payload: any): Observable<any>
  abstract storeMapPoint(mapPoint: MapPoint): Observable<DataResult<{ commitment: number }>>

}

const deliveryLocationsDataServiceFactory = (settings: SettingsService, sharepointlib: SharepointJsomService, apollo: Apollo) => {

  let source = null
  if (settings.datasource) {
    source = settings.datasource.type
  }

  switch (source) {
    case 'sharepoint':
      return new DeliveryLocationDataSharePointService(sharepointlib)
    default:
      return new DeliveryLocationDataApolloService(apollo)
  }

}

export let deliveryLocationsDataServiceProvider = {
  provide: DeliveryLocationDataService,
  useFactory: deliveryLocationsDataServiceFactory,
  deps: [SettingsService, SharepointJsomService, Apollo]
}