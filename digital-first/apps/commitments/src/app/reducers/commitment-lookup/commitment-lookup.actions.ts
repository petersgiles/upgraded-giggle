import { Action } from '@ngrx/store'
import { DataResult, AnnouncementTypesResult, CriticalDatesResult,
    CommitmentTypesResult, LocationsResult, PartysResult, PortfoliosResult,
    WhoAnnouncedTypesResult, PackageTypesResult, ThemeTypesResult } from '../../models'

export enum CommitmentLookupsActionTypes {
    GetAllAnnouncementTypes = '[Lookups] Get All AnnouncementTypes',
    LoadAnnouncementTypes = '[Lookups] Load AnnouncementTypes',
    AnnouncementTypesActionFailure = '[Lookups] AnnouncementTypes Action Failure',

    GetAllCommitmentTypes = '[Lookups] Get All CommitmentTypes',
    LoadCommitmentTypes = '[Lookups] Load CommitmentTypes',
    CommitmentTypesActionFailure = '[Lookups] CommitmentTypes Action Failure',

    GetAllCriticalDates = '[Lookups] Get All CriticalDates',
    LoadCriticalDates = '[Lookups] Load CriticalDates',
    CriticalDatesActionFailure = '[Lookups] CriticalDates Action Failure',

    GetAllLocations = '[Lookups] Get All Locations',
    LoadLocations = '[Lookups] Load Locations',
    LocationsActionFailure = '[Lookups] Locations Action Failure',

    GetAllPartys = '[Lookups] Get All Partys',
    LoadPartys = '[Lookups] Load Partys',
    PartysActionFailure = '[Lookups] Partys Action Failure',

    GetAllPortfolios = '[Lookups] Get All Portfolios',
    LoadPortfolios = '[Lookups] Load Portfolios',
    PortfoliosActionFailure = '[Lookups] Portfolios Action Failure',

    GetAllPackageTypes = '[Lookups] Get All PackageTypes',
    LoadPackageTypes = '[Lookups] Load PackageTypes',
    PackageTypesActionFailure = '[Lookups] PackageTypes Action Failure',

    GetAllThemeTypes = '[Lookups] Get All ThemeTypes',
    LoadThemeTypes = '[Lookups] Load ThemeTypes',
    ThemeTypesActionFailure = '[Lookups] ThemeTypes Action Failure',

    GetAllWhoAnnouncedTypes = '[Lookups] Get All WhoAnnouncedTypes',
    LoadWhoAnnouncedTypes = '[Lookups] Load WhoAnnouncedTypes',
    WhoAnnouncedTypesActionFailure = '[Lookups] WhoAnnouncedTypes Action Failure',
}

// AnnouncementTypes

export class GetAllAnnouncementTypes implements Action {
    readonly type = CommitmentLookupsActionTypes.GetAllAnnouncementTypes
}

export class LoadAnnouncementTypes implements Action {
    readonly type = CommitmentLookupsActionTypes.LoadAnnouncementTypes
    constructor(public payload: DataResult<AnnouncementTypesResult>) { }
}

export class AnnouncementTypesActionFailure implements Action {
    readonly type = CommitmentLookupsActionTypes.AnnouncementTypesActionFailure
    constructor(public payload: any) {
    }
}

// PackageTypes

export class GetAllPackageTypes implements Action {
    readonly type = CommitmentLookupsActionTypes.GetAllPackageTypes
}

export class LoadPackageTypes implements Action {
    readonly type = CommitmentLookupsActionTypes.LoadPackageTypes
    constructor(public payload: DataResult<PackageTypesResult>) { }
}

export class PackageTypesActionFailure implements Action {
    readonly type = CommitmentLookupsActionTypes.PackageTypesActionFailure
    constructor(public payload: any) {
    }
}

// ThemeTypes

export class GetAllThemeTypes implements Action {
    readonly type = CommitmentLookupsActionTypes.GetAllThemeTypes
}

export class LoadThemeTypes implements Action {
    readonly type = CommitmentLookupsActionTypes.LoadThemeTypes
    constructor(public payload: DataResult<ThemeTypesResult>) { }
}

export class ThemeTypesActionFailure implements Action {
    readonly type = CommitmentLookupsActionTypes.ThemeTypesActionFailure
    constructor(public payload: any) {
    }
}

// CommitmentTypes

export class GetAllCommitmentTypes implements Action {
    readonly type = CommitmentLookupsActionTypes.GetAllCommitmentTypes
}

export class LoadCommitmentTypes implements Action {
    readonly type = CommitmentLookupsActionTypes.LoadCommitmentTypes
    constructor(public payload: DataResult<CommitmentTypesResult>) { }
}

export class CommitmentTypesActionFailure implements Action {
    readonly type = CommitmentLookupsActionTypes.CommitmentTypesActionFailure
    constructor(public payload: any) {
    }
}

// CriticalDates

export class GetAllCriticalDates implements Action {
    readonly type = CommitmentLookupsActionTypes.GetAllCriticalDates
}

export class LoadCriticalDates implements Action {
    readonly type = CommitmentLookupsActionTypes.LoadCriticalDates
    constructor(public payload: DataResult<CriticalDatesResult>) { }
}

export class CriticalDatesActionFailure implements Action {
    readonly type = CommitmentLookupsActionTypes.CriticalDatesActionFailure
    constructor(public payload: any) {
    }
}

// Locations

export class GetAllLocations implements Action {
    readonly type = CommitmentLookupsActionTypes.GetAllLocations
}

export class LoadLocations implements Action {
    readonly type = CommitmentLookupsActionTypes.LoadLocations
    constructor(public payload: DataResult<LocationsResult>) { }
}

export class LocationsActionFailure implements Action {
    readonly type = CommitmentLookupsActionTypes.LocationsActionFailure
    constructor(public payload: any) {
    }
}

// Partys

export class GetAllPartys implements Action {
    readonly type = CommitmentLookupsActionTypes.GetAllPartys
}

export class LoadPartys implements Action {
    readonly type = CommitmentLookupsActionTypes.LoadPartys
    constructor(public payload: DataResult<PartysResult>) { }
}

export class PartysActionFailure implements Action {
    readonly type = CommitmentLookupsActionTypes.PartysActionFailure
    constructor(public payload: any) {
    }
}

// Portfolios

export class GetAllPortfolios implements Action {
    readonly type = CommitmentLookupsActionTypes.GetAllPortfolios
}

export class LoadPortfolios implements Action {
    readonly type = CommitmentLookupsActionTypes.LoadPortfolios
    constructor(public payload: DataResult<PortfoliosResult>) { }
}

export class PortfoliosActionFailure implements Action {
    readonly type = CommitmentLookupsActionTypes.PortfoliosActionFailure
    constructor(public payload: any) {
    }
}

// WhoAnnouncedTypes

export class GetAllWhoAnnouncedTypes implements Action {
    readonly type = CommitmentLookupsActionTypes.GetAllWhoAnnouncedTypes
}

export class LoadWhoAnnouncedTypes implements Action {
    readonly type = CommitmentLookupsActionTypes.LoadWhoAnnouncedTypes
    constructor(public payload: DataResult<WhoAnnouncedTypesResult>) { }
}

export class WhoAnnouncedTypesActionFailure implements Action {
    readonly type = CommitmentLookupsActionTypes.WhoAnnouncedTypesActionFailure
    constructor(public payload: any) {
    }
}

export type CommitmentLookupsActions =
      LoadAnnouncementTypes
    | GetAllAnnouncementTypes
    | AnnouncementTypesActionFailure
    | GetAllCommitmentTypes
    | LoadCommitmentTypes
    | CommitmentTypesActionFailure
    | GetAllThemeTypes
    | LoadThemeTypes
    | ThemeTypesActionFailure
    | GetAllPackageTypes
    | LoadPackageTypes
    | PackageTypesActionFailure
    | GetAllCriticalDates
    | LoadCriticalDates
    | CriticalDatesActionFailure
    | GetAllLocations
    | LoadLocations
    | LocationsActionFailure
    | GetAllPartys
    | LoadPartys
    | PartysActionFailure
    | GetAllPortfolios
    | LoadPortfolios
    | PortfoliosActionFailure
    | GetAllWhoAnnouncedTypes
    | LoadWhoAnnouncedTypes
    | WhoAnnouncedTypesActionFailure