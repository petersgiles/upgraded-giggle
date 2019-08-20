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
        title: p.title,
        group: item.group,
        expanded: false,
        selected: false,
        children: item.children,
        singleSelection: item.singleSelection,
        groupBy: item.group === 'electorates' ? p.state : '',
        cascadGroups: getCascadeGroups(p.title)
      }))
    })

    return acc
  }, [])
  return result
}

function getCascadeGroups(refinerName) {
  let results: string[] = []
  if (refinerName === 'State') {
    results.push('states')
  }
  if (refinerName === 'Electorate') {
    results.push('electorates')
  }
  return results
}
