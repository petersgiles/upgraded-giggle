export interface Electorate {
  id: number
  title: string
  group?: string
  commitment?: string
  electorate?: string
}

export interface LocationsResult {
  locations: Electorate[]
}

export interface CommitmentElectoratesResult {
  commitmentElectorates: Electorate[]
}
