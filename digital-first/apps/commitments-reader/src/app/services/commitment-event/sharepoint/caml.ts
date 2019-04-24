
export const byCommitmentIdsQuery = (criteria: []): string => {
  if (criteria.length === 0) {
    return null
  }

  const set = criteria.map(
    id =>
      `<Eq><FieldRef Name='CommitmentId' /><Value Type='Number'>${id}</Value></Eq>`
  )

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

export const byEventIdQuery = (criteria: any): string => {
  if (criteria.length === 0) {
    return null
  } else {
    return `<View>
          <Query>
              <Where>
              <Eq>
                  <FieldRef Name='ID' />
                  <Value Type='Number'>${criteria.id}</Value>
              </Eq>
              </Where>
          </Query>
      </View>`
  }
}
