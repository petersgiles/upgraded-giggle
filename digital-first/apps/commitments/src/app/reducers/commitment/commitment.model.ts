import { Party } from '../../models/party.model'
import { AnnouncementType } from '../../models/announcement-type.model'
import { Portfolio } from '../../models/portfolio.model'
import { Comment } from '../commitment-discussion/comment.model'
import { Electorate } from '../../models/location.model'
import { CommitmentType } from '../../models/commitment-type.model'
import { WhoAnnouncedType } from '../../models/who-announced-type.model'
import { Contact } from '../../models/contact.model'
import { CriticalDate } from '../../models/critical-date.model'
import { PackageType } from '../../models/package-type.model'
import { MapPoint } from '@digital-first/df-map'
import { Status } from '../../models';

export interface Commitment {
  id: number
  title: string,
  party: Party,
  description: string,
  status: Status,
  cost: string,
  costingRequired: boolean,
  location: Electorate,
  electorates: Electorate[],
  whoAnnouncedType: WhoAnnouncedType
  announcementType: AnnouncementType,
  commitmentType: CommitmentType,
  date: any,
  announcedby: string,
  portfolio: Portfolio,
  criticalDate: CriticalDate,
  packageType: PackageType,
  portfolios: Portfolio[],
  packages: PackageType[],
  mapPoints: MapPoint[],
  contacts: Contact[],
  relatedContacts: Commitment[]
  discussion?: Comment[]
}
