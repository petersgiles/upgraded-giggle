export interface CommitmentLocation{
  id: number,
  state: string,
  title: string
}

export interface MapPoint{
  id: number,
  title: string
}

export interface Commitment {
  id: number,
  title: string,
  description: string,
  status: string,
  bookType: string,
  cost: string,
  costingRequired?: boolean,
  criticalDate?: string,
  date: string,
  politicalParty: string,
  announcedBy: string,
  //location: Electorate,
  electorates?: CommitmentLocation[],
  //whoAnnouncedType: WhoAnnouncedType
  announcementType?: string,
  commitmentType: string,
  mapPoints?: MapPoint[],
  portfolio?: string,
  //packageType: PackageType,
  //portfolios: Portfolio[],
  //packages: PackageType[],
 
  //contacts: Contact[],
  //relatedContacts: Commitment[]
  discussion?: Comment[]
}

interface ICommitment {
  id: number
  title: string
  description: string
  bookType: string
  cost: string
  date: string
  politicalParty: string
  announcedBy: string
  announcementType?: string
  criticalDate?: string
  portfolio?: string
}

export interface CommitmentRow {
  id: number
  title: string
  announcementType?: string
  criticalDate?: string
  portfolio?: string
}