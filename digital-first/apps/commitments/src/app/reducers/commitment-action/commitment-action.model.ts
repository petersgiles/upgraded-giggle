export class CommitmentAction {
  id: number
  commitment: number
  title: string
  description: string
  costing: string
  portfolio?: {
    id: any
    title: any
  }
  revenueType: string
}
