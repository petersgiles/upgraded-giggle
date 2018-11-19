
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

export const byJoinTableQuery = (criteria: { fieldA: { name: string, id: string }, fieldB: { name: string, id: string } }) => `
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