import { Contact } from '../../reducers/contact/contact.model'
import { fromLookup, idFromLookup, fromUser } from '@digital-first/df-sharepoint'

export const mapCommitmentContact = (commitmentContact): any => ({
    id: commitmentContact.ID,
    commitment: idFromLookup(commitmentContact.Commitment),
    contact: idFromLookup(commitmentContact.Contact)
})
export const mapCommitmentContacts = (commitmentContacts): any[] => commitmentContacts.map(mapCommitmentContact)

export const mapContact = (contact): Contact => ({
    id: contact.ID,
    name: contact.Title,
    email: contact.Email,
    phone: contact.Phone

})

export const mapContacts = (contacts): Contact[] => contacts.map(mapContact)