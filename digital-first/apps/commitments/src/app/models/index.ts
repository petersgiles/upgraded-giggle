import { Commitment } from '../reducers/commitment'

import { Contact } from '../reducers/contact/contact.model'
import { MapPoint } from '../reducers/map-point/map-point.model'
import { RelatedCommitment } from '../reducers/related-commitment/related-commitment.model'

export { CommitmentType, CommitmentTypesResult } from './commitment-type.model'
export { Location, LocationsResult } from './location.model'
export { WhoAnnouncedType, WhoAnnouncedTypesResult } from './who-announced-type.model'
export { CriticalDate, CriticalDatesResult } from './critical-date.model'
export { Party, PartysResult } from './party.model'
export { Portfolio, PortfoliosResult } from './portfolio.model'
export { AnnouncementType, AnnouncementTypesResult } from './announcement-type.model'
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

export interface RelatedCommitmentsResult {
  commitmentRelatedCommitments: RelatedCommitment[]
}

export interface WhoAnnouncedTypesResult {
  whoAnnouncedTypes: WhoAnnouncedType[]
}

export interface CommentsResult {
  comments
}

export interface SubscriptionResult {
  subscription
}
export interface CommitmentResult {
  commitment: Commitment
}

export interface CommitmentsResult {
  commitments: Commitment[]
}

export interface ContactsResult {
  contacts: Contact[]
}

export interface MapPointsResult {
  mapPoints: MapPoint[]
}
