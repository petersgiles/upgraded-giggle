import { Contact } from '../contact/contact.model'

export interface Subscription {
  id: number
  parent: string
  subscription: string
  text: string
  author: Contact
  created: string
}
