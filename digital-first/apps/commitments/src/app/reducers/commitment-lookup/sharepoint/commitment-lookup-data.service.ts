import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { Observable, of } from 'rxjs'
import { CommentsResult, DataResult } from '../../../models'
import { concatMap, tap, map } from 'rxjs/operators'
import { byCommitmentIdQuery } from '../../../services/sharepoint/caml'
import { CommitmentLookupDataService } from '../commitment-lookup-data.service'

@Injectable({
    providedIn: 'root'
})
export class CommitmentLookupDataSharePointService implements CommitmentLookupDataService {
    filterWhoAnnouncedTypes(filter: any) {
        throw new Error('Method not implemented.')
    }
    filterPortfolios(filter: any) {
        throw new Error('Method not implemented.')
    }
    filterPartys(filter: any) {
        throw new Error('Method not implemented.')
    }
    filterLocations(filter: any) {
        throw new Error('Method not implemented.')
    }
    filterCriticalDates(filter: any) {
        throw new Error('Method not implemented.')
    }
    filterCommitmentTypes(filter: any) {
        throw new Error('Method not implemented.')
    }
    filterAnnouncementTypes(filter: any) {
        throw new Error('Method not implemented.')
    }

    constructor(private sharepoint: SharepointJsomService) { }
}