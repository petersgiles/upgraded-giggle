import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { Action } from '@ngrx/store'
import { switchMap, map, catchError } from 'rxjs/operators'

import {
    DataResult,
    AnnouncementTypesResult,
    CommitmentTypesResult,
    CriticalDatesResult,
    LocationsResult,
    PartysResult,
    PortfoliosResult,
    WhoAnnouncedTypesResult,
    PackageTypesResult,
    CommitmentPortfoliosResult,
    CommitmentPackageResult,
    CommitmentElectoratesResult,
    CommitmentContactsResult,
    CommitmentMapPointsResult,
    MapPointsResult,
    RelatedCommitmentsResult
} from '../../models'

import {
    CommitmentLookupsActionTypes,
    LoadAnnouncementTypes, AnnouncementTypesActionFailure,
    LoadCommitmentTypes, CommitmentTypesActionFailure,
    LoadCriticalDates, CriticalDatesActionFailure,
    LoadLocations, LocationsActionFailure,
    LoadPartys, PartysActionFailure,
    LoadWhoAnnouncedTypes, WhoAnnouncedTypesActionFailure,
    LoadPortfolios, PortfoliosActionFailure,
    LoadPackageTypes, PackageTypesActionFailure, LoadStatuses, StatusesActionFailure,
    LoadAllCommitmentPortfolios, LoadAllCommitmentPackages,
    LoadAllCommitmentElectorates, LoadAllCommitmentContacts, ContactActionFailure,
    LoadAllCommitmentMapPoints, MapPointActionFailure, LoadAllMapPoints, 
    LoadAllRelatedCommitments, RelatedCommitmentActionFailure
} from './commitment-lookup.actions'
import { CommitmentLookupDataService } from './commitment-lookup-data.service'
import { StatusesResult } from '../../models/status.model';

@Injectable()
export class CommitmentLookupEffects {

    @Effect()
    getAllAnnouncementTypes$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllAnnouncementTypes),
            switchMap((filter: any): Observable<Action> => this.service.filterAnnouncementTypes(filter)
                .pipe(
                    map((result: DataResult<AnnouncementTypesResult>) => new LoadAnnouncementTypes(result)),
                    catchError(error => of(new AnnouncementTypesActionFailure(error)))
                )
            ))

    @Effect()
    getAllPackageTypes$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllPackageTypes),
            switchMap((filter: any): Observable<Action> => this.service.filterPackageTypes(filter)
                .pipe(
                    map((result: DataResult<PackageTypesResult>) => new LoadPackageTypes(result)),
                    catchError(error => of(new PackageTypesActionFailure(error)))
                )
            ))

    @Effect()
    getAllCommitmentTypes$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllCommitmentTypes),
            switchMap((filter: any): Observable<Action> => this.service.filterCommitmentTypes(filter)
                .pipe(
                    map((result: DataResult<CommitmentTypesResult>) => new LoadCommitmentTypes(result)),
                    catchError(error => of(new CommitmentTypesActionFailure(error)))
                )
            ))

    @Effect()
    getAllCriticalDates$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllCriticalDates),
            switchMap((filter: any): Observable<Action> => this.service.filterCriticalDates(filter)
                .pipe(
                    map((result: DataResult<CriticalDatesResult>) => new LoadCriticalDates(result)),
                    catchError(error => of(new CriticalDatesActionFailure(error)))
                )
            ))

    @Effect()
    getAllLocations$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllLocations),
            switchMap((filter: any): Observable<Action> => this.service.filterLocations(filter)
                .pipe(
                    map((result: DataResult<LocationsResult>) => new LoadLocations(result)),
                    catchError(error => of(new LocationsActionFailure(error)))
                )
            ))

    @Effect()
    getAllPartys$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllPartys),
            switchMap((filter: any): Observable<Action> => this.service.filterPartys(filter)
                .pipe(
                    map((result: DataResult<PartysResult>) => new LoadPartys(result)),
                    catchError(error => of(new PartysActionFailure(error)))
                )
            ))

    @Effect()
    getAllPortfolios$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllPortfolios),
            switchMap((filter: any): Observable<Action> => this.service.filterPortfolios(filter)
                .pipe(
                    map((result: DataResult<PortfoliosResult>) => new LoadPortfolios(result)),
                    catchError(error => of(new PortfoliosActionFailure(error)))
                )
            ))

    @Effect()
    getAllStatuses$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllStatuses),
            switchMap((filter: any): Observable<Action> => this.service.filterStatuses(filter)
                .pipe(
                    map((result: DataResult<StatusesResult>) => new LoadStatuses(result)),
                    catchError(error => of(new StatusesActionFailure(error)))
                )
            ))

    @Effect()
    getAllWhoAnnouncedTypes$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllWhoAnnouncedTypes),
            switchMap((filter: any): Observable<Action> => this.service.filterWhoAnnouncedTypes(filter)
                .pipe(
                    map((result: DataResult<WhoAnnouncedTypesResult>) => new LoadWhoAnnouncedTypes(result)),
                    catchError(error => of(new WhoAnnouncedTypesActionFailure(error)))
                )
            ))

    @Effect()
    getAllCommitmentPortfolios$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllCommitmentPortfolios),
            switchMap((filter: any): Observable<Action> => this.service.filterCommitmentPortfolios(filter)
                .pipe(
                    map((result: DataResult<CommitmentPortfoliosResult>) => new LoadAllCommitmentPortfolios(result)),
                    catchError(error => of(new PortfoliosActionFailure(error)))
                )
            ))

    @Effect()
    getAllCommitmentPackages$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllCommitmentPackages),
            switchMap((filter: any): Observable<Action> => this.service.filterCommitmentPackages(filter)
                .pipe(
                    map((result: DataResult<CommitmentPackageResult>) => new LoadAllCommitmentPackages(result)),
                    catchError(error => of(new PackageTypesActionFailure(error)))
                )
            ))

    @Effect()
    getAllCommitmentElectorates$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllCommitmentElectorates),
            switchMap((filter: any): Observable<Action> => this.service.filterCommitmentElectorates(filter)
                .pipe(
                    map((result: DataResult<CommitmentElectoratesResult>) => new LoadAllCommitmentElectorates(result)),
                    catchError(error => of(new LocationsActionFailure(error)))
                )
            ))

    @Effect()
    getAllCommitmentContacts$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllCommitmentContacts),
            switchMap((filter: any): Observable<Action> => this.service.filterCommitmentContacts(filter)
                .pipe(
                    map((result: DataResult<CommitmentContactsResult>) => new LoadAllCommitmentContacts(result)),
                    catchError(error => of(new ContactActionFailure(error)))
                )
            ))

    @Effect()
    getAllCommitmentMapPoints$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllCommitmentMapPoints),
            switchMap((filter: any): Observable<Action> => this.service.filterCommitmentMapPoints(filter)
                .pipe(
                    map((result: DataResult<CommitmentMapPointsResult>) => new LoadAllCommitmentMapPoints(result)),
                    catchError(error => of(new MapPointActionFailure(error)))
                )
            ))

    @Effect()
    getAllMapPoints$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllMapPoints),
            switchMap((filter: any): Observable<Action> => this.service.filterMapPoints(filter)
                .pipe(
                    map((result: DataResult<MapPointsResult>) => new LoadAllMapPoints(result)),
                    catchError(error => of(new MapPointActionFailure(error)))
                )
            ))

            @Effect()
            getAllrelatedCommitments$: Observable<Action> = this.actions$
                .pipe(
                    ofType(CommitmentLookupsActionTypes.GetAllRelatedCommitments),
                    switchMap((filter: any): Observable<Action> => this.service.filterRelatedCommitments(filter)
                        .pipe(
                            map((result: DataResult<RelatedCommitmentsResult>) => new LoadAllRelatedCommitments(result)),
                            catchError(error => of(new RelatedCommitmentActionFailure(error)))
                        )
                    ))

    constructor(private actions$: Actions, private service: CommitmentLookupDataService) { }
}
