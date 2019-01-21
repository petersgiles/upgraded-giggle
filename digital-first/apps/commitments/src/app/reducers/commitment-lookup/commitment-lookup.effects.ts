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
    ThemeTypesResult,
    PackageTypesResult
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
    LoadThemeTypes, ThemeTypesActionFailure,
    LoadPackageTypes, PackageTypesActionFailure,
  } from './commitment-lookup.actions'
import { CommitmentLookupDataService } from './commitment-lookup-data.service'

@Injectable()
export class CommitmentLookupEffects {

    @Effect()
    getAllAnnouncementTypes$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllAnnouncementTypes),
            switchMap((filter: any) => this.service.filterAnnouncementTypes(filter)
                .pipe(
                    map((result: DataResult<AnnouncementTypesResult>) => new LoadAnnouncementTypes(result)),
                    catchError(error => of(new AnnouncementTypesActionFailure(error)))
                )
            ))

    @Effect()
    getAllThemeTypes$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllThemeTypes),
            switchMap((filter: any) => this.service.filterThemeTypes(filter)
                .pipe(
                    map((result: DataResult<ThemeTypesResult>) => new LoadThemeTypes(result)),
                    catchError(error => of(new ThemeTypesActionFailure(error)))
                )
            ))
    @Effect()
    getAllPackageTypes$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllPackageTypes),
            switchMap((filter: any) => this.service.filterPackageTypes(filter)
                .pipe(
                    map((result: DataResult<PackageTypesResult>) => new LoadPackageTypes(result)),
                    catchError(error => of(new PackageTypesActionFailure(error)))
                )
            ))

    @Effect()
    getAllCommitmentTypes$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllCommitmentTypes),
            switchMap((filter: any) => this.service.filterCommitmentTypes(filter)
                .pipe(
                    map((result: DataResult<CommitmentTypesResult>) => new LoadCommitmentTypes(result)),
                    catchError(error => of(new CommitmentTypesActionFailure(error)))
                )
            ))

    @Effect()
    getAllCriticalDates$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllCriticalDates),
            switchMap((filter: any) => this.service.filterCriticalDates(filter)
                .pipe(
                    map((result: DataResult<CriticalDatesResult>) => new LoadCriticalDates(result)),
                    catchError(error => of(new CriticalDatesActionFailure(error)))
                )
            ))

    @Effect()
    getAllLocations$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllLocations),
            switchMap((filter: any) => this.service.filterLocations(filter)
                .pipe(
                    map((result: DataResult<LocationsResult>) => new LoadLocations(result)),
                    catchError(error => of(new LocationsActionFailure(error)))
                )
            ))

    @Effect()
    getAllPartys$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllPartys),
            switchMap((filter: any) => this.service.filterPartys(filter)
                .pipe(
                    map((result: DataResult<PartysResult>) => new LoadPartys(result)),
                    catchError(error => of(new PartysActionFailure(error)))
                )
            ))

    @Effect()
    getAllPortfolios$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllPortfolios),
            switchMap((filter: any) => this.service.filterPortfolios(filter)
                .pipe(
                    map((result: DataResult<PortfoliosResult>) => new LoadPortfolios(result)),
                    catchError(error => of(new PortfoliosActionFailure(error)))
                )
            ))

    @Effect()
    getAllWhoAnnouncedTypes$: Observable<Action> = this.actions$
        .pipe(
            ofType(CommitmentLookupsActionTypes.GetAllWhoAnnouncedTypes),
            switchMap((filter: any) => this.service.filterWhoAnnouncedTypes(filter)
                .pipe(
                    map((result: DataResult<WhoAnnouncedTypesResult>) => new LoadWhoAnnouncedTypes(result)),
                    catchError(error => of(new WhoAnnouncedTypesActionFailure(error)))
                )
            ))

    constructor(private actions$: Actions, private service: CommitmentLookupDataService) { }
}
