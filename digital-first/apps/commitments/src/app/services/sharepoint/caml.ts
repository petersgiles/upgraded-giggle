
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

export const byIdsQuery = (criteria: []) => {

    const set = criteria.map(id => `<Eq><FieldRef Name='ID' /><Value Type='Number'>${id}</Value></Eq>`)

    const orDSet = set.reduce((acc, item) => {

        let last = acc.pop()

        if (last) {
            last = `<Or>${item}${last}</Or>`
        } else {
            last = item
        }

        acc.push(last)
        return acc
    }, [])[0]

    return `<View><Query><Where>${orDSet}</Where></Query></View>`
}

export const byMapPointPlaceIdQuery = (criteria: { placeId }) =>
    `<View>
        <Query>
            <Where>
                <Eq>
                    <FieldRef Name='PlaceId'/>
                    <Value Type='Text'>${criteria.placeId}</Value>
                </Eq>
            </Where>
        </Query>
    </View>`

export const byCommitmentIdQuery = (criteria: { id: any }) => `
  <View>
      <Query>
          <Where>
          <Eq>
              <FieldRef Name='Commitment' LookupId='True' />
              <Value Type='Lookup'>${criteria.id}</Value>
          </Eq>
          </Where>
      </Query>
  </View>`

export const byJoinTableQuery = (criteria: { fieldA: { name: string, id: string | number }, fieldB: { name: string, id: string | number} }) => `
  <View>
  <Query>
      <Where>
        <And>
            <Eq>
              <FieldRef Name='${criteria.fieldA.name}' LookupId='True'/>
              <Value Type='Lookup'>${criteria.fieldA.id}</Value>
            </Eq>
            <Eq>
              <FieldRef Name='${criteria.fieldB.name}' LookupId='True'/>
              <Value Type='Lookup'>${criteria.fieldB.id}</Value>
            </Eq>
        </And>
      </Where>
  </Query>
  </View>`