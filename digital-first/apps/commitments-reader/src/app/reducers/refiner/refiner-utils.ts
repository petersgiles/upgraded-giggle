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
  }
]

export const buildRefiner = (refiner: {
  commitmentTypes: []
  criticalDates: []
  portfolioLookups: []
}): CRMenu[] => {
  const result: CRMenu[] = REFINER_GROUP_MAP.reduce((acc: any, item: any) => {
    acc.push({
      id: item.id,
      title: item.title,
      expanded: false,
      selected: false,
      group: item.group,
      children: refiner[item.group].map(p => ({
        id: p.id,
        title: p.title,
        group: item.group,
        expanded: false,
        selected: false
      }))
    })

    return acc
  }, [])

  return result
}
