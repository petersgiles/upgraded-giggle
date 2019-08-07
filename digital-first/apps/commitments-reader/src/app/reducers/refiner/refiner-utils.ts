import { CRMenu } from './refiner.models'

export const REFINER_GROUP_MAP = [
  {
    group: 'commitmentTypes',
    title: 'Commitment Types',
    singleSelection: true
  },
  {
    group: 'electorates',
    title: 'Electorates',
    enableSlide: true
  },
  {
    group: 'states',
    title: 'States'
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
  deckItemBriefSummaries: []
  electorates: []
  states: []
}): CRMenu[] => {
  console.log(':')

  const result: CRMenu[] = REFINER_GROUP_MAP.reduce((acc: any, item: any) => {
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
        children: item.children,
        singleSelection: item.singleSelection,
        additionalInfo: item.group === 'electorates' ? p.state.name : ''
      }))
    })
   
    return acc
  }, [])
  return result
}
