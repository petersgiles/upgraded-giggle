import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@df/sharepoint'
import { Apollo } from 'apollo-angular'
import { SettingsService } from '../../services/settings.service'
import { Observable } from 'rxjs'
import { DataResult, MapPointsResult, CommitmentsResult } from '../../models'

import { CommitmentOverviewMapDataApolloService } from './apollo/commitment-overview-map-data.service'
import { CommitmentOverviewMapDataSharePointService } from './sharepoint/commitment-overview-map-data.service'
import { LoggerService } from '@digital-first/df-logging'
import { CommitmentMapPointsResult } from '../../models/commitment-map-points.model'

@Injectable({
    providedIn: 'root'
})
export abstract class CommitmentOverviewMapDataService {
    abstract getCommitmentOverviewCommitmentMapPoints(filter: any): Observable<DataResult<CommitmentMapPointsResult>>
    abstract getCommitmentOverviewMapCommitments(filter: any): Observable<DataResult<CommitmentsResult>>
    abstract getMapPoints(filter: any): Observable<DataResult<MapPointsResult>>
}

const commitmentOverviewMapDataServiceFactory = (settings: SettingsService, sharepointlib: SharepointJsomService, apollo: Apollo, logger: LoggerService) => {

    let source = null
    if (settings.datasource) {
        source = settings.datasource.type
    }

    switch (source) {
        case 'sharepoint':
            return new CommitmentOverviewMapDataSharePointService(sharepointlib, logger)
        default:
            return new CommitmentOverviewMapDataApolloService(apollo, logger)
    }

}

export let commitmentOverviewMapDataServiceProvider = {
    provide: CommitmentOverviewMapDataService,
    useFactory: commitmentOverviewMapDataServiceFactory,
    deps: [SettingsService, SharepointJsomService, Apollo, LoggerService]
}
