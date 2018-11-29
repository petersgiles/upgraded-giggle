import {
    Observable,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'

import * as fromRoot from '..'
import { AnnouncementType } from '../../models/announcement-type.model'
import { CommitmentType } from '../../models/commitment-type.model'
import { CriticalDate } from '../../models/critical-date.model'
import { Location } from '../../models/location.model'
import { Party } from '../../models/party.model'
import { Portfolio } from '../../models/portfolio.model'
import { WhoAnnouncedType } from '../../models/who-announced-type.model'
import { GetAllCriticalDates, GetAllAnnouncementTypes, GetAllWhoAnnouncedTypes, GetAllCommitmentTypes, GetAllLocations, GetAllPartys, GetAllPortfolios } from './commitment-lookup.actions'

@Injectable({
    providedIn: 'root'
})
export class CommitmentLookupService {

    constructor(private store: Store<fromRoot.State>) { }

    public getAllAnnouncementTypes(filter?: any) {
        this.store.dispatch(new GetAllAnnouncementTypes())
    }

    get AnnouncementTypes(): Observable<AnnouncementType[]> {
        return this.store.pipe(select(fromRoot.getAllAnnouncementTypes))
    }

    public getAllCommitmentTypes(filter?: any) {
        this.store.dispatch(new GetAllCommitmentTypes())
    }

    get CommitmentTypes(): Observable<CommitmentType[]> {
        return this.store.pipe(select(fromRoot.getAllCommitmentTypes))
    }

    getAllCriticalDates(filter?: any) {
        this.store.dispatch(new GetAllCriticalDates())
    }

    get CriticalDates(): Observable<CriticalDate[]> {
        return this.store.pipe(select(fromRoot.getAllCriticalDates))
    }

    public getAllLocations(filter?: any) {
        this.store.dispatch(new GetAllLocations())
    }

    get Locations(): Observable<Location[]> {
        return this.store.pipe(select(fromRoot.getAllLocations))
    }

    public getAllPartys(filter?: any) {
        this.store.dispatch(new GetAllPartys())
    }

    get Parties(): Observable<Party[]> {
        return this.store.pipe(select(fromRoot.getAllParties))
    }

    public getAllPortfolios(filter?: any) {
        this.store.dispatch(new GetAllPortfolios())
    }

    get Portfolios(): Observable<Portfolio[]> {
        return this.store.pipe(select(fromRoot.getAllPortfolios))
    }

    public getAllWhoAnnouncedTypes(filter?: any) {
        this.store.dispatch(new GetAllWhoAnnouncedTypes())
    }

    get WhoAnnouncedTypes(): Observable<WhoAnnouncedType[]> {
        return this.store.pipe(select(fromRoot.getAllWhoAnnouncedTypes))
    }

}