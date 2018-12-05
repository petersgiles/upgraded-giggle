import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { Observable } from 'rxjs'
import { callQuery, callMutate } from '../../../services/apollo/apollo-helpers'
import { DataResult, MapPointsResult } from '../../../models'
import { CommitmentOverviewMapDataService } from '../commitment-overview-map-data.service'
import { GET_MAPPOINTS } from './queries'

@Injectable({
    providedIn: 'root'
})
export class CommitmentOverviewMapDataApolloService implements CommitmentOverviewMapDataService {
    getMapPoints(filter: any): Observable<DataResult<MapPointsResult>> {
        return callQuery<MapPointsResult>(this.apollo, { query: GET_MAPPOINTS })
    }

    constructor(private apollo: Apollo) { }
}
