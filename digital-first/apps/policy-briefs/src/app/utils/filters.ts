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
