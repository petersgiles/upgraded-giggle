import { Portfolio } from '../../models/portfolio.model'

export interface Contact {
  id: number
  name: string
  jobTitle: string
  firstName: string
  email?: string
  phone?: string
  ccid?: string
  portfolio?: Portfolio,
  party?: string
}
