// recursively trim whitespace from an object
// and replace empty strings with null
export function trimWhiteSpaceAndReplaceEmptyStringsWithNull(objectToTrim) {
  if (!Array.isArray(objectToTrim) && typeof objectToTrim !== 'object') {
    return objectToTrim
  }
  return Object.keys(objectToTrim).reduce(
    (acc, key) => {
      if (objectToTrim[key] === null) {
        acc[key] = objectToTrim[key]
        return acc
      }
      acc[key] =
        typeof objectToTrim[key] === 'string'
          ? objectToTrim[key] && objectToTrim[key].trim().length > 0
            ? objectToTrim[key].trim()
            : null
          : trimWhiteSpaceAndReplaceEmptyStringsWithNull(objectToTrim[key])
      return acc
    },
    Array.isArray(objectToTrim) ? [] : {}
  )
}

export const multiFilter = (arr: any[], filters: any) => {
  const filterKeys = Object.keys(filters)

  return arr.filter(eachObj =>
    filterKeys.some(eachKey => {
      if (!filters[eachKey].length) {
        return true // passing an empty filter means that filter is ignored.
      }
      return eachObj[eachKey].toLowerCase().includes(filters[eachKey])
    })
  )
}
