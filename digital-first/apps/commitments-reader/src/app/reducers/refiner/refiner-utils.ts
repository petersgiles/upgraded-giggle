import { CRMenu } from './refiner.models'

export const REFINER_GROUP_MAP = [
  {
    group: 'commitmentTypes',
    title: 'Commitment Types'
  },
  {
    group: 'criticalDates',
    title: 'Critical Date'
  },
  {
    group: 'portfolioLookups',
    title: 'Portfolios'
  },
  {
    group: 'deckItemBriefSummaries',
    title: 'Theme'
  },
  {
    group: 'states',
    title: 'Electorates',
    enableSlide: true,
    children: {
      group: 'electorates',
      title: 'Electorate'
    }
  }
]

export const buildRefiner = (refiner: {
  commitmentTypes: []
  criticalDates: []
  portfolioLookups: []
  deckItemBriefSummaries: []
  electorates: []
}): CRMenu[] => {
  const result: CRMenu[] = REFINER_GROUP_MAP.reduce((acc: any, item: any) => {
    console.log(item)
    acc.push({
      id: item.id,
      title: item.title ? item.title : item.name,
      expanded: false,
      selected: false,
      group: item.group,
      enableSlide: item.enableSlide,
      children: refiner[item.group].map(p => ({
        id: p.id,
        title: p.title ? p.title : p.name,
        group: item.group,
        expanded: false,
        selected: false,
        children: item.children
          ? p[item.children.group].map(pc => ({
              id: pc.id,
              title: pc.title ? pc.title : pc.name,
              group: item.children.group,
              expanded: false,
              selected: false
            }))
          : []
      }))
    })

    return acc
  }, [])

  return result
}
