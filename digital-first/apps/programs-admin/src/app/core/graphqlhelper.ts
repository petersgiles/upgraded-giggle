// recursively trim whitespace from an object
// and replace empty strings with null
export function trimWhiteSpaceAndReplaceEmptyStringsWithNull(objectToTrim) {
  if (!Array.isArray(objectToTrim) && typeof objectToTrim !== 'object') {
    return objectToTrim
  }
  return Object.keys(objectToTrim).reduce(
    (acc, key) => {
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
