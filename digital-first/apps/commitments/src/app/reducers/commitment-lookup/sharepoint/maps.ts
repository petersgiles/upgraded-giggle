import { WhoAnnouncedType, AnnouncementType, CriticalDate, CommitmentType, Party, Portfolio, Location, PackageType, ThemeType } from '../../../models'

export const mapWhoAnnouncedType = (announcementType): any => ({
    id: announcementType.ID,
    title: announcementType.Title,
    colour: announcementType.Colour,
    sortOrder: announcementType.SortOrder
})

export const mapWhoAnnouncedTypes = (whoAnnouncedTypes): WhoAnnouncedType[] => whoAnnouncedTypes.map(mapWhoAnnouncedType)

export const themeType = (val): any => ({
    id: val.ID,
    title: val.Title,
    colour: val.Colour,
    sortOrder: val.SortOrder
})

export const themeTypes = (vals): ThemeType[] => vals.map(themeType)

export const packageType = (val): any => ({
    id: val.ID,
    title: val.Title,
    colour: val.Colour,
    sortOrder: val.SortOrder
})

export const packageTypes = (vals): PackageType[] => vals.map(packageType)

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
    sortOrder: party.SortOrder
})

export const mapParties = (parties): Party[] => parties.map(mapParty)

export const mapPortfolio = (portfolio): any => ({
    id: portfolio.ID,
    title: portfolio.Title,
    colour: portfolio.Colour,
    sortOrder: portfolio.SortOrder
})

export const mapPortfolios = (portfolios): Portfolio[] => portfolios.map(mapPortfolio)

export const mapLocation = (location): Location => ({
    id: location.ID,
    title: location.Title,
    group: location.State
})

export const mapLocations = (locations): Location[] =>
    locations.map(mapLocation)