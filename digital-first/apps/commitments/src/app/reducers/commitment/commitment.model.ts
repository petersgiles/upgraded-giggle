import { Party } from '../party/party.model'
import { AnnouncementType } from '../announcement-type/announcement-type.model'
import { Portfolio } from '../portfolio/portfolio.model'
import { Comment } from '../comment/comment.model'
import { Location } from '../location/location.model'
import { CommitmentType } from '../commitment-type/commitment-type.model'
import { WhoAnnouncedType } from '../who-announced-type/who-announced-type.model'
import { Contact } from '../contact/contact.model'

export interface Commitment {
  id: number
  title: string,
  party: Party,
  description: string,
  cost: string,
  location: Location,
  whoAnnouncedType: WhoAnnouncedType
  announcementType: AnnouncementType,
  commitmentType: CommitmentType,
  date: any,
  announcedby: string,
  portfolio: Portfolio,
  contacts: Contact[],
  discussion?: Comment[]
}
