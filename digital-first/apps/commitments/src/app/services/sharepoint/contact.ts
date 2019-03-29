import { Contact } from '../../models/contact.model'
import { fromLookup, idFromLookup, fromUser } from '@df/sharepoint'

export const mapCommitmentContact = (commitmentContact): any => ({
    id: commitmentContact.ID,
    commitment: idFromLookup(commitmentContact.Commitment),
    contact: idFromLookup(commitmentContact.Contact)
})
export const mapCommitmentContacts = (commitmentContacts): any[] => commitmentContacts.map(mapCommitmentContact)

export const mapContact = (item): Contact => ({
    id: item.ID,
    name: item.Title,
    jobTitle: item.JobTitle,
    firstName: item.FirstName,
    email: item.Email,
    phone: item.WorkPhone,
    portfolio: fromLookup(item.Portfolio),
})

export const mapContacts = (contacts): Contact[] => contacts.map(mapContact)