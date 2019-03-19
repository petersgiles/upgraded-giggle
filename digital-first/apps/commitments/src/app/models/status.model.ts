export interface Status {
  id: number
  title?: string
  caption?: string
  icon?: string
  colour?: string
}

export interface StatusesResult {
  statuses: Status[]
}

export interface CommitmentStatusesResult {
  commitmentStatus: Status[]
}
