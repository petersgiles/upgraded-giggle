export interface CommitmentType {
  id: number
  title: string
  icon?: string
  colour?: string
}

export interface CommitmentTypesResult {
  commitmentTypes: CommitmentType[]
}