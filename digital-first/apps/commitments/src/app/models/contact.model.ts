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

export class CommitmentContact implements Contact{
  id
  name
  firstName
  jobTitle
  phone
  email

  toString() {
      return this.firstName + ' ' + this.name + ' - ' + this.phone + ' - ' + this.email
  }
}

export interface ContactsResult {
    contacts: Contact[]
}
  
export interface CommitmentContactsResult {
    commitmentContacts: Contact[]
}

 