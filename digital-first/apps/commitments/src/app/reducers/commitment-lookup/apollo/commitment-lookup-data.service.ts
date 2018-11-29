import { Injectable } from '@angular/core'

import { Apollo } from 'apollo-angular'
import { callQuery } from '../../../services/apollo/apollo-helpers'
import {
    WhoAnnouncedTypesResult,
    AnnouncementTypesResult, CriticalDatesResult,
    PortfoliosResult, PartysResult, LocationsResult,
    CommitmentTypesResult
} from '../../../models'
import { CommitmentLookupDataService } from '../commitment-lookup-data.service'
import {
    GET_WHO_ANNOUNCED_TYPES,
    GET_ANNOUNCEMENT_TYPES,
    GET_CRITICAL_DATES,
    GET_PORTFOLIOS,
    GET_PARTIES,
    GET_LOCATIONS,
    GET_COMMITMENT_TYPES
} from './queries'

@Injectable({
    providedIn: 'root'
})
export class CommitmentLookupDataApolloService implements CommitmentLookupDataService {

    filterWhoAnnouncedTypes = (filter?: any) => callQuery<WhoAnnouncedTypesResult>(this.apollo, { query: GET_WHO_ANNOUNCED_TYPES, variables: filter })
    filterAnnouncementTypes = (filter?: any) => callQuery<AnnouncementTypesResult>(this.apollo, { query: GET_ANNOUNCEMENT_TYPES, variables: filter })
    filterCriticalDates = (filter?: any) => callQuery<CriticalDatesResult>(this.apollo, { query: GET_CRITICAL_DATES, variables: filter })
    filterPortfolios = (filter?: any) => callQuery<PortfoliosResult>(this.apollo, { query: GET_PORTFOLIOS, variables: filter })
    filterPartys = (filter?: any) => callQuery<PartysResult>(this.apollo, { query: GET_PARTIES, variables: filter })
    filterLocations = (filter?: any) => callQuery<LocationsResult>(this.apollo, { query: GET_LOCATIONS, variables: filter })
    filterCommitmentTypes = (filter?: any) => callQuery<CommitmentTypesResult>(this.apollo, { query: GET_COMMITMENT_TYPES, variables: filter })

    constructor(private apollo: Apollo) { }
}
