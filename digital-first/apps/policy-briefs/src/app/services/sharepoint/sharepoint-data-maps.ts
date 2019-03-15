import { fromLookup, idFromLookup } from '@digital-first/df-sharepoint'

import { Contact } from '../../reducers/contact/contact.model'

export const byIdQuery = (criteria: { id }) =>
  `<View>
        <Query>
            <Where>
            <Eq>
                <FieldRef Name='ID' />
                <Value Type='Number'>${criteria.id}</Value>
            </Eq>
            </Where>
        </Query>
    </View>`

export const byLookupIdQuery = (criteria: { lookupField: string, id: any }) => `
    <View>
        <Query>
            <Where>
            <Eq>
                <FieldRef Name='${criteria.lookupField}' LookupId='True' />
                <Value Type='Lookup'>${criteria.id}</Value>
            </Eq>
            </Where>
        </Query>
    </View>`

export const mapContact = (contact): Contact => ({
  id: contact.ID,
  name: contact.Title,
  email: contact.Email,
  phone: contact.Phone
})

export const mapContacts = (contacts): Contact[] => contacts.map(mapContact)