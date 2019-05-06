import { CRMenu } from './refiner.models';

export const REFINER_GROUP_MAP = [
    {
      id: 1,
      group: 'commitmentTypes',
      title: 'Commitment Types'
    },
    {
      id: 2,
      group: 'criticalDates',
      title: 'Critical Date'
    },
    {
      id: 3,
      group: 'portfolioLookups',
      title: 'Portfolios'
    }
  ]

export const buildRefiner = (...args: any): CRMenu[] => {
    const result: CRMenu[] = REFINER_GROUP_MAP.reduce(
      (acc: any, item: any) => {
        acc.push({
          id: item.id,
          title: item.title,
          expanded: false,
          selected: false,
          groupId: item.id,
          group: item.group,
          children: args[item.id - 1].map(p => ({
            id: p.id,
            title: p.title,
            groupId: item.id,
            group: item.group,
            expanded: false,
            selected: false
          }))
        })

        return acc
      },
      []
    )

    return result
  }