import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { callQuery, callMutate } from '../../../services/apollo/apollo-helpers'
import { DataResult, MapPointsResult, CommitmentResult } from '../../../models'
import { DeliveryLocationDataService } from '../commitment-delivery-location-data.service'
import { Observable } from 'rxjs'
import { MapPoint } from '@digital-first/df-components'
import {
  STORE_MAP_POINT,
  REMOVE_MAP_POINT,
  STORE_COMMITMENT_MAP_POINT,
  REMOVE_COMMITMENT_MAP_POINT,
  GET_MAP_POINTS,
  MAP_POINTS_BY_COMMITMENT,
  REMOVE_COMMITMENT_ELECTORATE,
  STORE_COMMITMENT_ELECTORATE,
  ELECTORATES_BY_COMMITMENT
} from './queries'
import { GET_COMMITMENT } from '../../../services/apollo/commitments'
import { ElectoratesResult } from '../../../models/location.model'

@Injectable({
  providedIn: 'root'
})
export class DeliveryLocationDataApolloService
  implements DeliveryLocationDataService {
  storeMapPoint = (mapPoint: any) =>
    callMutate<any>(
      this.apollo,
      { mutation: STORE_MAP_POINT, variables: { ...mapPoint } },
      (result: any) => ({ commitment: result.data.storeMapPoint })
    )

  removeMapPoint = (placeId: any) =>
    callMutate<any>(
      this.apollo,
      { mutation: REMOVE_MAP_POINT, variables: { place_id: placeId } },
      (result: any) => ({ commitment: result.data.removeMapPoint })
    )

  addMapPointToCommitment = (variables: { commitment: any; mapPoint: any }) =>
    callMutate<any>(
      this.apollo,
      {
        mutation: STORE_COMMITMENT_MAP_POINT,
        variables: {
          commitment: variables.commitment,
          mapPoint: variables.mapPoint.place_id
        }
      },
      (result: any) => ({ commitment: result.data.storeCommitmentMapPoint })
    )

  removeMapPointFromCommitment = (variables: {
    commitment: any;
    mapPoint: any;
  }) =>
    callMutate<any>(
      this.apollo,
      { mutation: REMOVE_COMMITMENT_MAP_POINT, variables: { ...variables } },
      (result: any) => ({ commitment: result.data.deleteCommitmentMapPoint })
    )

  removeElectorateFromCommitment = (variables: {
    commitment: any;
    electorate: any;
  }) =>
    callMutate<any>(
      this.apollo,
      { mutation: REMOVE_COMMITMENT_ELECTORATE, variables: { ...variables } },
      (result: any) => ({ commitment: result.data.deleteCommitmentElectorate })
    )

  addElectorateToCommitment = (variables: {
    commitment: any;
    electorate: any;
  }) =>
    callMutate<any>(
      this.apollo,
      { mutation: STORE_COMMITMENT_ELECTORATE, variables: { ...variables } },
      (result: any) => ({ commitment: result.data.storeCommitmentElectorate })
    )

  filterMapPoints = (filter?: any) =>
    callQuery<MapPointsResult>(this.apollo, { query: GET_MAP_POINTS })

  getMapPointsByCommitment = (commitment: any) =>
    callQuery<MapPointsResult>(
      this.apollo,
      {
        query: MAP_POINTS_BY_COMMITMENT,
        variables: { commitment: commitment }
      },
      (result: any): any => ({
        data: { mapPoints: result.data.commitmentMapPoints }
      })
    )

  getElectoratesByCommitment = (commitment: any) =>
    callQuery<ElectoratesResult>(
      this.apollo,
      {
        query: ELECTORATES_BY_COMMITMENT,
        variables: { commitment: commitment }
      },
      (result: any): any => ({
        data: { electorates: result.data.commitmentElectorates }
      })
    )

  // addItemToCommitment = (variables: { commitment: any, relatedTo: any }) => callMutate<any>(this.apollo,
  //   { mutation: STORE_DELIVERY_LOCATION, variables: { ...variables } },
  //   (result: any) => ({ commitment: result.data.storeDeliveryLocation })
  // )

  // removeItemFromCommitment = (variables: { id: any }) => callMutate<any>(this.apollo,
  //   { mutation: REMOVE_DELIVERY_LOCATION, variables: { ...variables } },
  //   (result: any) => ({ commitment: result.data.deleteDeliveryLocation })
  // )

  // getItemsByCommitment = (commitment: any) => callQuery<DeliveryLocationsResult>(this.apollo, { query: DELIVERY_LOCATIONS_BY_COMMITMENT, variables: { commitment: commitment } })

  constructor(private apollo: Apollo) {}
}
