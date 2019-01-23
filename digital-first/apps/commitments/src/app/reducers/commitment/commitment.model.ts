import { Party } from '../../models/party.model'
import { AnnouncementType } from '../../models/announcement-type.model'
import { Portfolio } from '../../models/portfolio.model'
import { Comment } from '../commitment-discussion/comment.model'
import { Location } from '../../models/location.model'
import { CommitmentType } from '../../models/commitment-type.model'
import { WhoAnnouncedType } from '../../models/who-announced-type.model'
import { Contact } from '../contact/contact.model'
import { CriticalDate } from '../../models/critical-date.model'
import { PackageType } from '../../models/package-type.model'
import { ThemeType } from '../../models/theme-type.model'
import { MapPoint } from '@digital-first/df-components'

export interface Commitment {
  id: number
  title: string,
  party: Party,
  description: string,
  cost: string,
  location: Location,
  electorates: Location[],
  whoAnnouncedType: WhoAnnouncedType
  announcementType: AnnouncementType,
  commitmentType: CommitmentType,
  date: any,
  announcedby: string,
  portfolio: Portfolio,
  criticalDate: CriticalDate,
  packageType: PackageType,
  themeType: ThemeType,
  portfolios: Portfolio[],
  mapPoints: MapPoint[],
  contacts: Contact[],
  relatedContacts: Commitment[]
  discussion?: Comment[]
}
