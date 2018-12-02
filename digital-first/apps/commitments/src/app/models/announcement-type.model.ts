export interface AnnouncementType {
  id: number
  title: string
  icon?: string
  colour?: string
}

export interface AnnouncementTypesResult {
  announcementTypes: AnnouncementType[]
}