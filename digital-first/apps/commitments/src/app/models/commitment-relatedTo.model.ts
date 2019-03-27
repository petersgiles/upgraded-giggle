export interface RelatedCommitment {
    id: string
    title: string
    commitment: number | string
    relatedTo: number | string
  }

export interface RelatedCommitmentsResult{
      relatedCommitments: RelatedCommitment[]
  }