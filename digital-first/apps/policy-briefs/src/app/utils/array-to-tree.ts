export const sortBy = (key: string | number) => (a, b) =>
  a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0
  
export function toTree(
  data: any[],
  opts?: {
    id: string
    parentId: string
    children: string
    level: string
    firstParentId?: any,
    sortBy?: string
  }
) {
  const defaults = {
    id: "Id",
    parentId: "Parent",
    children: "Children",
    level: "Level",
    firstParentId: null,
    sortBy: "id"
  }

  const options = {
    ...defaults,
    ...opts
  }

  const grouped = data.reduce(
    (
      previousValue,
      currentValue,
      currentIndex,
      array,
      key = currentValue[options.parentId]
    ) => {
      ;(previousValue[key] || (previousValue[key] = [])).push(currentValue)

      return previousValue
    },
    {}
  )

  const startArray = grouped[options.firstParentId]

  transform(startArray, grouped, options)

  return startArray
}

function transform(startArray, grouped, options, lvl = 0) {
  if (startArray) {
    const sortedArray = startArray.sort(sortBy(options[options.sortBy]))
    const level = lvl + 1
    for (const item of sortedArray) {
        item[options.level] = level
      if (grouped[item[options.id]]) {
        item[options.children] = grouped[item[options.id]]
      }
      transform(item[options.children], grouped, options, level)
    }
  }
}
