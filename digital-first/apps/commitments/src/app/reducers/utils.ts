import { CommitmentContact } from '../models'

export const findInLookup = (object, lookupSet) => {
    if (object && object.id && lookupSet) {
        return lookupSet[object.id]
    }
    return null
}

export const findInLookupCommitmentAssocs = (object, lookupSet, key) => {
    if (object && object.title && lookupSet) {
        const commitmentAssocs = new Array()
        lookupSet.filter(obj => {
            if (obj.commitment === object.title) {
                commitmentAssocs.push(obj[key])
            }
        })
        return commitmentAssocs
    }
    return null
}

export const findInLookupCommitmentContact = (object, lookupSet) => {
    if (object && object.title && lookupSet) {
        const commitmentContacts = new Array()
        lookupSet.commitmentContacts.filter(commitmentContact => {
            if (commitmentContact.commitment === object.title) {
                lookupSet.allContacts.filter(contact => {
                    if (contact.name === commitmentContact.contact) {
                        const thisContact = new CommitmentContact()
                        thisContact.name = contact.name
                        thisContact.firstName = contact.firstName
                        thisContact.phone = contact.phone
                        thisContact.email = contact.email
                        commitmentContacts.push(thisContact.toString())
                    }
                })

            }
        })
        return commitmentContacts
    }
    return null
}

export const findInLookupCommitmentMapPoint = (object, lookupSet) => {
    if (object && object.title && lookupSet) {
        const commitmentMapPoints= new Array()
        lookupSet.commitmentMapPoints.filter(commitmentMapPoint => {
            if (commitmentMapPoint.commitment === object.title) {
                lookupSet.allMapPoints.filter(mapPoint => {
                    if (mapPoint.id.toString() === commitmentMapPoint.mapPoint) {
                        commitmentMapPoints.push(mapPoint.address)
                    }
                })

            }
        })
        return commitmentMapPoints
    }
    return null
}