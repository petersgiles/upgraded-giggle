import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'

import * as fromRoot from '..'
import { AnnouncementType } from '../../models/announcement-type.model'
import { CommitmentType } from '../../models/commitment-type.model'
import { CriticalDate } from '../../models/critical-date.model'
import { Party } from '../../models/party.model'
import { Portfolio } from '../../models/portfolio.model'
import { WhoAnnouncedType } from '../../models/who-announced-type.model'
import { Contact } from '../../models/contact.model'
import {
  GetAllCriticalDates,
  GetAllAnnouncementTypes,
  GetAllWhoAnnouncedTypes,
  GetAllCommitmentTypes,
  GetAllLocations,
  GetAllPartys,
  GetAllPortfolios,
  GetAllPackageTypes,
  GetAllStatuses,
  GetAllCommitmentPortfolios,
  GetAllCommitmentPackages,
  GetAllCommitmentElectorates,
  GetAllCommitmentContacts,
  GetAllCommitmentMapPoints,
  GetAllMapPoints,
  GetAllRelatedCommitments
} from './commitment-lookup.actions'

import { PackageType } from '../../models/package-type.model'
import { Electorate, RelatedCommitment } from '../../models'
import { Status } from '../../models/status.model'

@Injectable({
  providedIn: 'root'
})
export class CommitmentLookupService {
  constructor(private store: Store<fromRoot.State>) {}

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

  public getAllPackageTypes(filter?: any) {
    this.store.dispatch(new GetAllPackageTypes())
  }

  get PackageTypes(): Observable<PackageType[]> {
    return this.store.pipe(select(fromRoot.getAllPackageTypes))
  }

  public getAllStatuses(filter?: any) {
    this.store.dispatch(new GetAllStatuses())
  }

  get Statuses(): Observable<Status[]> {
    return this.store.pipe(select(fromRoot.getAllStatuses))
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

  get CostingAgencies(): Observable<Portfolio[]> {
    return this.store.pipe(select(fromRoot.getCostingAgencies))
  }

  public getAllWhoAnnouncedTypes(filter?: any) {
    this.store.dispatch(new GetAllWhoAnnouncedTypes())
  }

  get WhoAnnouncedTypes(): Observable<WhoAnnouncedType[]> {
    return this.store.pipe(select(fromRoot.getAllWhoAnnouncedTypes))
  }

  public getAllCommitmentPortfolios(filter?: any) {
    this.store.dispatch(new GetAllCommitmentPortfolios())
  }

  get CommitmentPortfolios(): Observable<Portfolio[]> {
    return this.store.pipe(select(fromRoot.getAllPortfolios))
  }

  public getAllCommitmentPackages(filter?: any) {
    this.store.dispatch(new GetAllCommitmentPackages())
  }

  get CommitmentPackages(): Observable<PackageType[]> {
    return this.store.pipe(select(fromRoot.getAllPackages))
  }

  public getAllCommitmentElectorates(filter?: any) {
    this.store.dispatch(new GetAllCommitmentElectorates())
  }

  get CommitmentElectorates(): Observable<Electorate[]> {
    return this.store.pipe(select(fromRoot.getAllPackages))
  }

  public getAllCommitmentContacts(filter?: any) {
    this.store.dispatch(new GetAllCommitmentContacts())
  }

  get CommitmentContacts(): Observable<Contact[]> {
    return this.store.pipe(select(fromRoot.getAllContacts))
  }

  public getAllCommitmentMapPoints(filter?: any) {
    this.store.dispatch(new GetAllCommitmentMapPoints())
  }

  public getAllMapPoints(filter?: any) {
    this.store.dispatch(new GetAllMapPoints())
  }

  get RelatedPortfolios(): Observable<Portfolio[]> {
    return this.store.pipe(select(fromRoot.getRelatedCommitmentPortfolios))
  }

  public getAllRelatedCommitments(filter?: any) {
    this.store.dispatch(new GetAllRelatedCommitments())
  }

  get CommitmentMapPoints(): Observable<Contact[]> {
    return this.store.pipe(select(fromRoot.getAllContacts))
  }
}
