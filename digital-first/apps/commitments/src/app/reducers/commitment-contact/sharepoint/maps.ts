import { idFromLookup } from '@df/sharepoint'

export const mapCommitmentContact = (commitmentContact): any => ({
    id: commitmentContact.ID,
    commitment: idFromLookup(commitmentContact.Commitment),
    contact: idFromLookup(commitmentContact.Contact)
})
export const mapCommitmentContacts = (commitmentContacts): any[] => commitmentContacts.map(mapCommitmentContact)
