export const sortBy = (key: string | number) => (a: { [x: string]: number; }, b: { [x: string]: number; }) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0)

export function toTree(data: any[], options?: {
  id: string,
  parentId: string,
  children: string,
  level: string,
  firstParentId?: string
}) {

  const defaults = {
    id: 'Id',
    parentId: 'Parent',
    children: 'Children',
    level: 'Level'
  }

  options = {
    ...defaults,
    ...options
  }

  const grouped = data.reduce((previousValue, currentValue, currentIndex, array, key = currentValue[options.parentId]) => {

    (previousValue[key] || (previousValue[key] = []))
      .push(currentValue)

    return previousValue
  }, {})

  const startArray = grouped[options.firstParentId]

  transform(startArray, grouped, options)

  return startArray
}

function transform(startArray: { [x: string]: any; }[], grouped: { [x: string]: any; }, options: { id: any; parentId?: string; children: any; level: any; firstParentId?: any; }, level = 0) {
  if (startArray) {
    startArray = startArray.sort(sortBy(options.id))
    level = level + 1
    for (let i = 0; i < startArray.length; i++) {
      startArray[i][options.level] = level
      if (grouped[startArray[i][options.id]]) {
        (startArray[i][options.children] = grouped[startArray[i][options.id]])
      }
      transform(startArray[i][options.children], grouped, options, level)

    }
  }
}
