import { Commitment } from '../reducers/commitment'

import { CommitmentAction } from '../reducers/commitment-action/commitment-action.model'
import { RelatedLink } from '../reducers/related-link/related-link.model'
import { GroupPermission } from '../reducers/user/user.model'
import { MapPoint } from '@digital-first/df-map'

export { CommitmentType, CommitmentTypesResult } from './commitment-type.model'
export { Electorate, CommitmentElectoratesResult, LocationsResult } from './location.model'
export { WhoAnnouncedType, WhoAnnouncedTypesResult } from './who-announced-type.model'
export { CriticalDate, CriticalDatesResult } from './critical-date.model'
export { Party, PartysResult } from './party.model'
export { Portfolio, PortfoliosResult, CommitmentPortfoliosResult } from './portfolio.model'
export { AnnouncementType, AnnouncementTypesResult } from './announcement-type.model'
export { PackageType, PackageTypesResult, CommitmentPackageResult } from './package-type.model'
export { Status, StatusesResult } from './status.model'
export { Contact, ContactsResult, CommitmentContactsResult, CommitmentContact } from '../models/contact.model'
export { CommitmentMapPoint, CommitmentMapPointsResult } from '../models/commitment-map-points.model'
export { RelatedCommitment, RelatedCommitmentsResult } from '../models/commitment-relatedTo.model'

export interface ServiceData<T> {
  data: { [key: string]: T }
}

export interface DataResult<T> {
  data: T
  loading?: any
  error?: any
  networkStatus?: number
  stale?: boolean
}

export interface CommitmentActionsResult {
  commitmentActions: CommitmentAction[]
}

export interface RelatedLinksResult {
  commitmentRelatedLinks: RelatedLink[]
}

export interface GroupPermissionsResult {
  groupPermissions: GroupPermission[]
}

export interface CommentsResult {
  comments
}

export interface SubscriptionResult {
  commitmentSubscription
}
export interface CommitmentResult {
  commitment: Commitment
}

export interface CommitmentsResult {
  commitments: Commitment[]
}

export interface MapPointsResult {
  mapPoints: MapPoint[]
}