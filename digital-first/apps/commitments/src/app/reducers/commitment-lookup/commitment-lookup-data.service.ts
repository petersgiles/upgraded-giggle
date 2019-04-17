import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@df/sharepoint'
import { Apollo } from 'apollo-angular'
import { SettingsService } from '../../services/settings.service'
import { Observable } from 'rxjs'
import { CommentsResult, DataResult } from '../../models'
import { CommitmentLookupDataSharePointService } from './sharepoint/commitment-lookup-data.service'
import { CommitmentLookupDataApolloService } from './apollo/commitment-lookup-data.service'

@Injectable({
    providedIn: 'root'
})
export abstract class CommitmentLookupDataService {
    abstract filterPackageTypes(filter?: any): any
    abstract filterWhoAnnouncedTypes(filter?: any): any
    abstract filterPortfolios(filter?: any): any
    abstract filterStatuses(filter?: any): any
    abstract filterPartys(filter?: any): any
    abstract filterLocations(filter?: any): any
    abstract filterCriticalDates(filter?: any): any
    abstract filterCommitmentTypes(filter?: any): any
    abstract filterAnnouncementTypes(filter?: any): any
    abstract filterCommitmentPortfolios(filter?: any): any
    abstract filterCommitmentPackages(filter?: any): any
    abstract filterCommitmentElectorates(filter?: any): any
    abstract filterCommitmentContacts(filter?: any): any
    abstract filterCommitmentMapPoints(filter?: any): any
    abstract filterMapPoints(filter?: any): any
    abstract filterRelatedCommitments(filter?: any): any
}

const lookupDataServiceFactory = (settings: SettingsService, sharepointlib: SharepointJsomService, apollo: Apollo) => {

    let source = null
    if (settings.datasource) {
        source = settings.datasource.type
    }

    switch (source) {
        case 'sharepoint':
            return new CommitmentLookupDataSharePointService(sharepointlib)
        default:
            return new CommitmentLookupDataApolloService(apollo)
    }

}

export let lookupDataServiceProvider = {
    provide: CommitmentLookupDataService,
    useFactory: lookupDataServiceFactory,
    deps: [SettingsService, SharepointJsomService, Apollo]
}
