import { Contact } from '../contact/contact.model'

export interface Comment {
  id: number
  parent: string
  commitment: string
  text: string
  author: Contact
  created: string
}
