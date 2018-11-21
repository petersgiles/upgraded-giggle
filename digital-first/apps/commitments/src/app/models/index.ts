import { AnnouncementType } from '../reducers/announcement-type/announcement-type.model'
import { Party } from '../reducers/party/party.model'
import { Portfolio } from '../reducers/portfolio/portfolio.model'
import { Commitment } from '../reducers/commitment'
import { CommitmentType } from '../reducers/commitment-type/commitment-type.model'
import { Contact } from '../reducers/contact/contact.model'
import { Location } from '../reducers/location/location.model'
import { WhoAnnouncedType } from '../reducers/who-announced-type/who-announced-type.model'
import { MapPoint } from '../reducers/map-point/map-point.model'
import { CriticalDate } from '../reducers/critical-date/critical-date.model'

export interface ServiceData<T> {
  data: { [key: string]: T }
}

export interface DataResult<T> {
  data: T
  loading: any
  error?: any
  networkStatus?: number
  stale?: boolean
}

export interface AnnouncementTypesResult {
  announcementTypes: AnnouncementType[]
}

export interface CriticalDatesResult {
  criticalDates: CriticalDate[]
}

export interface WhoAnnouncedTypesResult {
  whoAnnouncedTypes: WhoAnnouncedType[]
}
export interface CommentsResult {
  comments
}
export interface CommitmentResult {
  commitment: Commitment
}

export interface CommitmentsResult {
  commitments: Commitment[]
}

export interface CommitmentTypesResult {
  commitmentTypes: CommitmentType[]
}

export interface ContactsResult {
  contacts: Contact[]
}

export interface LocationsResult {
  locations: Location[]
}
export interface ElectoratesResult {
  electorates: Location[]
}

export interface PartysResult {
  parties: Party[]
}
export interface PortfoliosResult {
  portfolios: Portfolio[]
}
export interface MapPointsResult {
  mapPoints: MapPoint[]
}