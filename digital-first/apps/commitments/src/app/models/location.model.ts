export interface Location {
  id: number
  title: string
  group?: string
}

export interface LocationsResult {
  locations: Location[]
}

export interface ElectoratesResult {
  electorates: Location[]
}
