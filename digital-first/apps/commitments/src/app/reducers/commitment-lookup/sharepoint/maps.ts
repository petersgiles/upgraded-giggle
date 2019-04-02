import { WhoAnnouncedType, AnnouncementType, CriticalDate, CommitmentType, Party, Portfolio, PackageType, ThemeType, Electorate, Status } from '../../../models'
import { fromLookup } from '@df/sharepoint'
import { MapPoint } from '@digital-first/df-map'
import { REFINER_GROUP_RELATED_PORTFOLIOS, REFINER_GROUP_PACKAGE_TYPE } from '../../commitment-overview'

export const mapWhoAnnouncedType = (announcementType): any => ({
    id: announcementType.ID,
    title: announcementType.Title,
    colour: announcementType.Colour,
    sortOrder: announcementType.SortOrder
})

export const mapWhoAnnouncedTypes = (whoAnnouncedTypes): WhoAnnouncedType[] => whoAnnouncedTypes.map(mapWhoAnnouncedType)

export const mapThemeType = (val): any => ({
    id: val.ID,
    title: val.Title,
    colour: val.Colour,
    sortOrder: val.SortOrder
})

export const mapThemeTypes = (vals): ThemeType[] => vals.map(mapThemeType)

export const mapPackageType = (val): any => ({
    id: val.ID,
    title: val.Title,
    colour: val.Colour,
    sortOrder: val.SortOrder
})

export const mapPackageTypes = (vals): PackageType[] => vals.map(mapPackageType)

export const mapStatus = (val): any => ({
    id: val.ID,
    title: val.Title,
    colour: val.colour,
    sortOrder: val.sortorder,
    icon: val.icon,
    active: val.active
})

export const mapStatuses = (vals): Status[] => {
    return vals.map(mapStatus);
}

export const mapAnnouncementType = (announcementType): any => ({
    id: announcementType.ID,
    title: announcementType.Title,
    colour: announcementType.Colour,
    sortOrder: announcementType.SortOrder
})

export const mapAnnouncementTypes = (announcementTypes): AnnouncementType[] => announcementTypes.map(mapAnnouncementType)

export const mapCriticalDate = (item): any => ({
    id: item.ID,
    title: item.Title,
    colour: item.Colour,
    sortOrder: item.SortOrder
})

export const mapCriticalDates = (list): CriticalDate[] => list.map(mapCriticalDate)

export const mapCommitmentType = (commitmentType): any => ({
    id: commitmentType.ID,
    title: commitmentType.Title,
    colour: commitmentType.Colour,
    sortOrder: commitmentType.SortOrder
})

export const mapCommitmentTypes = (commitmentTypes): CommitmentType[] => commitmentTypes.map(mapCommitmentType)

export const mapParty = (party): any => ({
    id: party.ID,
    title: party.Title,
    colour: party.Colour,
    sortOrder: party.SortOrder,
    icon: party.Icon
})

export const mapParties = (parties): Party[] => parties.map(mapParty)

export const mapPortfolio = (portfolio): any => ({
    id: portfolio.ID,
    title: portfolio.Title,
    colour: portfolio.Colour,
    sortOrder: portfolio.SortOrder,
    type: portfolio.AgencyType
})

export const mapPortfolios = (portfolios): Portfolio[] => portfolios.map(mapPortfolio)

export const mapLocation = (location): Electorate => ({
    id: location.ID,
    title: location.Title,
    group: location.State
})

export const mapLocations = (locations): Electorate[] =>
    locations.map(mapLocation)

export const mapCommitmentPortfolio = (commitmentPortfolio): Portfolio => ({
    id: commitmentPortfolio.ID,
    refinerGroup: REFINER_GROUP_RELATED_PORTFOLIOS.key,
    title: fromLookup(commitmentPortfolio.Portfolio).title,
    commitment: fromLookup(commitmentPortfolio.Commitment).title,
    portfolio: fromLookup(commitmentPortfolio.Portfolio).title
})

export const mapCommitmentPortfolios = (commitmentPortfolios): Portfolio[] =>
    commitmentPortfolios.map(mapCommitmentPortfolio)

export const mapCommitmentPackage = (commitmentPackage): PackageType => ({
    id: commitmentPackage.ID,
    refinerGroup: REFINER_GROUP_PACKAGE_TYPE.key,
    title: fromLookup(commitmentPackage.Package).title,
    commitment: fromLookup(commitmentPackage.Commitment).title,
    package: fromLookup(commitmentPackage.Package).title
})

export const mapCommitmentPackages = (commitmentPackages): PackageType[] =>
    commitmentPackages.map(mapCommitmentPackage)

export const mapCommitmentElectorate = (commitmentElectorate): any => ({
    id: commitmentElectorate.ID,
    commitment: fromLookup(commitmentElectorate.Commitment).title,
    electorate: fromLookup(commitmentElectorate.Electorate).title
})
export const mapCommitmentElectorates = (commitmentElectorates): any[] => commitmentElectorates.map(mapCommitmentElectorate)

export const mapCommitmentContact = (commitmentContacts): any => ({
    id: commitmentContacts.ID,
    commitment: fromLookup(commitmentContacts.Commitment).title,
    contact: fromLookup(commitmentContacts.Contact).title
})
export const mapCommitmentContacts = (commitmentContacts): any[] => commitmentContacts.map(mapCommitmentContact)

export const mapCommitmentMapPoint = (commitmentMapPoints): any => ({
    id: commitmentMapPoints.ID,
    commitment: fromLookup(commitmentMapPoints.Commitment).title,
    mapPoint: fromLookup(commitmentMapPoints.MapPoint).title
})
export const mapCommitmentMapPoints = (commitmentMapPoints): any[] => commitmentMapPoints.map(mapCommitmentMapPoint)

export const mapMapPoint = (location): any => ({
    id: location.ID,
    place_id: location.PlaceId,
    address: location.Title,
    latitude: location.Latitude,
    longitude: location.Longitude
})

export const mapMapPoints = (mapPoints): MapPoint[] =>
    mapPoints.map(mapMapPoint)

export const mapRelatedCommitment = (relatedTo): any => ({
    id: relatedTo.ID,
    commitment: fromLookup(relatedTo.Commitment).title,
    relatedTo: fromLookup(relatedTo.RelatedTo).title
})
export const mapRelatedCommitments = (relatedCommitments): any[] => relatedCommitments.map(mapRelatedCommitment)