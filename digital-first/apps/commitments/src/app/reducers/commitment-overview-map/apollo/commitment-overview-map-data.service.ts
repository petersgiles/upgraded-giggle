import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { Observable } from 'rxjs'
import { callQuery, callMutate } from '../../../services/apollo/apollo-helpers'
import { DataResult, MapPointsResult, CommitmentsResult } from '../../../models'
import { CommitmentOverviewMapDataService } from '../commitment-overview-map-data.service'
import { GET_MAPPOINTS, GET_MAPPOINT_COMMITMENTS } from './queries'
import { LoggerService } from '@digital-first/df-logging'

@Injectable({
    providedIn: 'root'
})
export class CommitmentOverviewMapDataApolloService implements CommitmentOverviewMapDataService {
    getMapPoints(filter: any): Observable<DataResult<MapPointsResult>> {
        return callQuery<MapPointsResult>(this.apollo, { query: GET_MAPPOINTS })
    }

    getCommitmentOverviewMapCommitments(filter: any): Observable<DataResult<CommitmentsResult>> {
        return callQuery<CommitmentsResult>(this.apollo, { query: GET_MAPPOINT_COMMITMENTS, variables: { mapPoint: filter.filter } },
            (result: any) => ({ data: { commitments: result.data.mapPointCommitments } }))
    }
    constructor(private apollo: Apollo, private logger: LoggerService) { }
}
