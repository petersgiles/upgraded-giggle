import { Portfolio } from './portfolio.model'

export interface Contact {
  id: number
  name: string
  jobTitle: string
  firstName: string
  email?: string
  phone?: string
  ccid?: string
  portfolio?: Portfolio,
  party?: string,
  commitment?: string
}


export interface ContactsResult {
    contacts: Contact[]
}
  
export interface CommitmentContactsResult {
    commitmentContacts: Contact[]
}

 