export interface WhoAnnouncedType {
  id: number
  title: string
  icon?: string
  colour?: string
}

export interface WhoAnnouncedTypesResult {
  whoAnnouncedTypes: WhoAnnouncedType[]
}