export const findInLookup = (object, lookupSet) => {
    if (object && object.id && lookupSet) {
        return lookupSet[object.id]
    }
    return null
}

export const findInLookupCommitmentPortfolio = (object, lookupSet, objectType) => {
    if (object && object.title && lookupSet) {
        let commitmentPortfolios = new Array()
        lookupSet.filter(obj => {
            if (obj.commitment === object.title && objectType === 'portfolio') {
                commitmentPortfolios.push(obj.portfolio)
            }
            else if (obj.commitment === object.title && objectType === 'package') {
                commitmentPortfolios.push(obj.package)
            }
            else if (obj.commitment === object.title && objectType === 'electorate') {
                commitmentPortfolios.push(obj.electorate)
            }
            else if (obj.commitment === object.title && objectType === 'contact') {
                commitmentPortfolios.push(obj.electorate)
            }
        })
        return commitmentPortfolios
    }
    return null
}

 class Contact{
    firstName: string
    name: string
    phone: string
    email: string

    toString(){
        return this.firstName + ' ' + this.name + ' - ' + this.phone + ' - ' + this.email
    }
}

export const findInLookupCommitmentContact = (object, lookupSet) => {
    if (object && object.title && lookupSet) {
        let commitmentPortfolios = new Array()
        let contacts = ''
        lookupSet.commitmentContacts.filter(commitmentContact => {
            if (commitmentContact.commitment === object.title) {
                lookupSet.allContacts.filter(contact => {
                    if (contact.name === commitmentContact.contact) {
                        let thisContact  = new Contact()
                        thisContact.name = contact.name
                        thisContact.firstName = contact.firstName
                        thisContact.phone = contact.phone
                        thisContact.email = contact.email
                        commitmentPortfolios.push(thisContact.toString())
                    }
                })

            }
        })
        return commitmentPortfolios
    }
    return null
}