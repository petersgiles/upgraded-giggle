import {
    Observable,
} from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'

import * as fromRoot from '..'
import { AnnouncementType } from '../../models/announcement-type.model'
import { CommitmentType } from '../../models/commitment-type.model'
import { CriticalDate } from '../../models/critical-date.model'
import { Party } from '../../models/party.model'
import { Portfolio } from '../../models/portfolio.model'
import { WhoAnnouncedType } from '../../models/who-announced-type.model'
import {
    GetAllCriticalDates, GetAllAnnouncementTypes,
    GetAllWhoAnnouncedTypes, GetAllCommitmentTypes,
    GetAllLocations, GetAllPartys, GetAllPortfolios,
    GetAllThemeTypes, GetAllPackageTypes } from './commitment-lookup.actions'

import { ThemeType } from '../../models/theme-type.model'
import { PackageType } from '../../models/package-type.model'
import { Electorate } from '../../models'

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

    public getAllThemeTypes(filter?: any) {
        this.store.dispatch(new GetAllThemeTypes())
    }

    get ThemeTypes(): Observable<ThemeType[]> {
        return this.store.pipe(select(fromRoot.getAllThemeTypes))
    }

    public getAllPackageTypes(filter?: any) {
        this.store.dispatch(new GetAllPackageTypes())
    }

    get PackageTypes(): Observable<PackageType[]> {
        return this.store.pipe(select(fromRoot.getAllPackageTypes))
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

    get Locations(): Observable<Electorate[]> {
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

    public getAllThemes(filter?: any) {
        this.store.dispatch(new GetAllPortfolios())
    }

    get Themes(): Observable<Portfolio[]> {
        return this.store.pipe(select(fromRoot.getAllPortfolios))
    }

    get CostingPortfolios(): Observable<Portfolio[]> {
        return this.store.pipe(select(fromRoot.getCostingPortfolios))
    }

    public getAllWhoAnnouncedTypes(filter?: any) {
        this.store.dispatch(new GetAllWhoAnnouncedTypes())
    }

    get WhoAnnouncedTypes(): Observable<WhoAnnouncedType[]> {
        return this.store.pipe(select(fromRoot.getAllWhoAnnouncedTypes))
    }

}
