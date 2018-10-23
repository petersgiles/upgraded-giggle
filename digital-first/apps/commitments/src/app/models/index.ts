import { AnnouncementType } from '../reducers/announcement-type/announcement-type.model'
import { Party } from '../reducers/party/party.model'
import { Portfolio } from '../reducers/portfolio/portfolio.model'
import { Commitment } from '../reducers/commitment'

export interface ServiceData<T> {
  data: { [key: string]: T }
}

export interface DataResult<T> {
  data: T
  loading: any
  error?: any
}

export interface AnnouncementTypesResult {
  announcementTypes: AnnouncementType[]
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
  commitmentTypes
}

export interface ContactsResult {
  contacts
}

export interface LocationsResult {
  locations
}
export interface PartysResult {
  parties
}
export interface PortfoliosResult {
  portfolios
}
