import { Action } from '@ngrx/store'
import {
  DataResult,
  AnnouncementTypesResult,
  CriticalDatesResult,
  CommitmentTypesResult,
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
import { StatusesResult } from '../../models/status.model'
import { MapPoint } from '@digital-first/df-map'

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
  GetAllWhoAnnouncedTypes = '[Lookups] Get All WhoAnnouncedTypes',
  LoadWhoAnnouncedTypes = '[Lookups] Load WhoAnnouncedTypes',
  WhoAnnouncedTypesActionFailure = '[Lookups] WhoAnnouncedTypes Action Failure',
  GetAllStatuses = '[Lookups] Get All Statuses',
  LoadStatuses = '[Lookups] Load Statuses',
  StatusesActionFailure = '[Lookups] Portfolios Action Failure',
  GetAllCommitmentPortfolios = '[Lookups] Get All Commitment Portfolios',
  LoadAllCommitmentPortfolios = '[Lookups] Load Commitment Portfolios',
  GetAllCommitmentPackages = '[Lookups] Get All Commitment Packages',
  LoadAllCommitmentPackages = '[Lookups] Load Commitment Packages',
  GetAllCommitmentElectorates = '[Lookups] Get All Commitment Electorates',
  LoadAllCommitmentElectorates = '[Lookups] Load Commitment Electorates',
  GetAllCommitmentContacts = '[Lookups] Get All Commitment Contacts',
  LoadAllCommitmentContacts = '[Lookups] Load Commitment Contacts',
  ContactsActionFailure = '[Lookups] Contacts Action Failure',
  GetAllCommitmentMapPoints = '[Lookups] Get All Commitment Map Points',
  LoadAllCommitmentMapPoints = '[Lookups] Load Commitment Map Points',
  MapPointsActionFailure = '[Lookups] Map Points Action Failure',
  GetAllMapPoints = '[Lookups] Get All Map Points',
  LoadAllMapPoints = '[Lookups] Load Map Points',
  GetAllRelatedCommitments = '[Lookups] Get All Related Commitments',
  LoadAllRelatedCommitments = '[Lookups] Load Related Commitments',
  RelatedCommitmentActionFailure = '[Lookups] related Commitments Action Failure'
}

// AnnouncementTypes

export class GetAllAnnouncementTypes implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllAnnouncementTypes
}

export class LoadAnnouncementTypes implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadAnnouncementTypes
  constructor(public payload: DataResult<AnnouncementTypesResult>) {}
}

export class AnnouncementTypesActionFailure implements Action {
  readonly type = CommitmentLookupsActionTypes.AnnouncementTypesActionFailure
  constructor(public payload: any) {}
}

// PackageTypes

export class GetAllPackageTypes implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllPackageTypes
}

export class LoadPackageTypes implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadPackageTypes
  constructor(public payload: DataResult<PackageTypesResult>) {}
}

export class PackageTypesActionFailure implements Action {
  readonly type = CommitmentLookupsActionTypes.PackageTypesActionFailure
  constructor(public payload: any) {}
}

// Statuses
export class GetAllStatuses implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllStatuses
}

export class LoadStatuses implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadStatuses
  constructor(public payload: DataResult<StatusesResult>) {}
}

export class StatusesActionFailure implements Action {
  readonly type = CommitmentLookupsActionTypes.StatusesActionFailure
  constructor(public payload: any) {}
}

// CommitmentTypes

export class GetAllCommitmentTypes implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllCommitmentTypes
}

export class LoadCommitmentTypes implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadCommitmentTypes
  constructor(public payload: DataResult<CommitmentTypesResult>) {}
}

export class CommitmentTypesActionFailure implements Action {
  readonly type = CommitmentLookupsActionTypes.CommitmentTypesActionFailure
  constructor(public payload: any) {}
}

// CriticalDates

export class GetAllCriticalDates implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllCriticalDates
}

export class LoadCriticalDates implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadCriticalDates
  constructor(public payload: DataResult<CriticalDatesResult>) {}
}

export class CriticalDatesActionFailure implements Action {
  readonly type = CommitmentLookupsActionTypes.CriticalDatesActionFailure
  constructor(public payload: any) {}
}

// Locations

export class GetAllLocations implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllLocations
}

export class LoadLocations implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadLocations
  constructor(public payload: DataResult<LocationsResult>) {}
}

export class GetAllCommitmentElectorates implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllCommitmentElectorates
}

export class LoadAllCommitmentElectorates implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadAllCommitmentElectorates
  constructor(public payload: DataResult<CommitmentElectoratesResult>) {}
}

export class LocationsActionFailure implements Action {
  readonly type = CommitmentLookupsActionTypes.LocationsActionFailure
  constructor(public payload: any) {}
}

// Partys

export class GetAllPartys implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllPartys
}

export class LoadPartys implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadPartys
  constructor(public payload: DataResult<PartysResult>) {}
}

export class PartysActionFailure implements Action {
  readonly type = CommitmentLookupsActionTypes.PartysActionFailure
  constructor(public payload: any) {}
}

// Portfolios

export class GetAllPortfolios implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllPortfolios
}

export class LoadPortfolios implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadPortfolios
  constructor(public payload: DataResult<PortfoliosResult>) {}
}

export class GetAllCommitmentPortfolios implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllCommitmentPortfolios
}

export class LoadAllCommitmentPortfolios implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadAllCommitmentPortfolios
  constructor(public payload: DataResult<CommitmentPortfoliosResult>) {}
}

export class PortfoliosActionFailure implements Action {
  readonly type = CommitmentLookupsActionTypes.PortfoliosActionFailure
  constructor(public payload: any) {}
}

// Commitment Packages
export class GetAllCommitmentPackages implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllCommitmentPackages
}

export class LoadAllCommitmentPackages implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadAllCommitmentPackages
  constructor(public payload: DataResult<CommitmentPackageResult>) {}
}

export class PackageActionFailure implements Action {
  readonly type = CommitmentLookupsActionTypes.PackageTypesActionFailure
  constructor(public payload: any) {}
}

// Commitment Contacts
export class GetAllCommitmentContacts implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllCommitmentContacts
}

export class LoadAllCommitmentContacts implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadAllCommitmentContacts
  constructor(public payload: DataResult<CommitmentContactsResult>) {}
}

export class ContactActionFailure implements Action {
  readonly type = CommitmentLookupsActionTypes.ContactsActionFailure
  constructor(public payload: any) {}
}

// Commitment MapPoints
export class GetAllCommitmentMapPoints implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllCommitmentMapPoints
}

export class LoadAllCommitmentMapPoints implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadAllCommitmentMapPoints
  constructor(public payload: DataResult<CommitmentMapPointsResult>) {}
}

export class GetAllMapPoints implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllMapPoints
}

export class LoadAllMapPoints implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadAllMapPoints
  constructor(public payload: DataResult<MapPointsResult>) {}
}

export class MapPointActionFailure implements Action {
  readonly type = CommitmentLookupsActionTypes.MapPointsActionFailure
  constructor(public payload: any) {}
}

// WhoAnnouncedTypes

export class GetAllWhoAnnouncedTypes implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllWhoAnnouncedTypes
}

export class LoadWhoAnnouncedTypes implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadWhoAnnouncedTypes
  constructor(public payload: DataResult<WhoAnnouncedTypesResult>) {}
}

export class WhoAnnouncedTypesActionFailure implements Action {
  readonly type = CommitmentLookupsActionTypes.WhoAnnouncedTypesActionFailure
  constructor(public payload: any) {}
}

// Related Commitments

export class GetAllRelatedCommitments implements Action {
  readonly type = CommitmentLookupsActionTypes.GetAllRelatedCommitments
}

export class LoadAllRelatedCommitments implements Action {
  readonly type = CommitmentLookupsActionTypes.LoadAllRelatedCommitments
  constructor(public payload: DataResult<RelatedCommitmentsResult>) {}
}

export class RelatedCommitmentActionFailure implements Action {
  readonly type = CommitmentLookupsActionTypes.RelatedCommitmentActionFailure
  constructor(public payload: any) {}
}

export type CommitmentLookupsActions =
  | LoadAnnouncementTypes
  | GetAllAnnouncementTypes
  | AnnouncementTypesActionFailure
  | GetAllCommitmentTypes
  | LoadCommitmentTypes
  | CommitmentTypesActionFailure
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
  | GetAllStatuses
  | LoadStatuses
  | StatusesActionFailure
  | GetAllCommitmentPortfolios
  | LoadAllCommitmentPortfolios
  | GetAllCommitmentPackages
  | LoadAllCommitmentPackages
  | GetAllCommitmentElectorates
  | LoadAllCommitmentElectorates
  | GetAllCommitmentContacts
  | LoadAllCommitmentContacts
  | ContactActionFailure
  | GetAllCommitmentMapPoints
  | LoadAllCommitmentMapPoints
  | MapPointActionFailure
  | GetAllMapPoints
  | LoadAllMapPoints
  | RelatedCommitmentActionFailure
  | GetAllRelatedCommitments
  | LoadAllRelatedCommitments
