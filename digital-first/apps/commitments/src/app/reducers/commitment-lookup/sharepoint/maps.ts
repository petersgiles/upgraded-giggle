import { WhoAnnouncedType, AnnouncementType, CriticalDate, CommitmentType, Party, Portfolio, Theme, PackageType, ThemeType, Electorate } from '../../../models'

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
    sortOrder: portfolio.SortOrder,
    type: portfolio.AgencyType
})

export const mapPortfolios = (portfolios): Portfolio[] => portfolios.map(mapPortfolio)


export const mapPackage = (packageType): any => ({
  id: packageType.ID,
  title: packageType.Title,
  colour: packageType.Colour,
  sortOrder: packageType.SortOrder
})

export const mapPackages = (packageType):PackageType[] => packageType.map(mapPackage)

export const mapTheme = (themeType): any => ({
  id: themeType.ID,
  title: themeType.Title,
  colour: themeType.Colour,
  sortOrder: themeType.SortOrder
})

export const mapThemes = (themes): ThemeType[] => themes.map(mapTheme)

export const mapLocation = (location): Electorate => ({
    id: location.ID,
    title: location.Title,
    group: location.State
})

export const mapLocations = (locations): Electorate[] =>
    locations.map(mapLocation)
