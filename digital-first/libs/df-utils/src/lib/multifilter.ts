export const multiFilter = (arr: any[], filters: any, oRd = false) => {
  if (oRd) {
    return multiFilterOr(arr, filters)
  } else {
    return multiFilterAnd(arr, filters)
  }
}

export const multiFilterAnd = (arr: any[], filters: any) => {
  const filterKeys = Object.keys(filters)
  return arr.filter(eachObj =>
    filterKeys.every(eachKey => {
      if (!filters[eachKey].length) {
        return true // passing an empty filter means that filter is ignored.
      }
      return filters[eachKey].includes(eachObj[eachKey])
    })
  )
}

export const multiFilterOr = (arr: any[], filters: any) => {
  const filterKeys = Object.keys(filters)
  return arr.filter(eachObj =>
    filterKeys.some(eachKey => {
      if (!filters[eachKey].length) {
        return true // passing an empty filter means that filter is ignored.
      }
      return filters[eachKey].includes(eachObj[eachKey])
    })
  )
}
