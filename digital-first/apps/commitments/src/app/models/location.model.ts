export interface Electorate {
  id: number
  title: string
  group?: string
}

export interface LocationsResult {
  locations: Electorate[]
}

export interface ElectoratesResult {
  electorates: Electorate[]
}
