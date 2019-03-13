import { DocumentStatus } from '@df/components'

import { sortBy } from '@digital-first/df-utils'

export const workflowStatuses: DocumentStatus[] = [
  {
    id: '1',
    icon: 'how_to_reg',
    caption: 'With SCIT',
    colour: 'GhostWhite',
    active: false,
    order: 1
  },
  {
    id: '2',
    icon: 'how_to_reg',
    caption: 'With Policy Area',
    colour: 'GhostWhite',
    active: false,
    order: 2
  },
  {
    id: '3',
    icon: 'how_to_reg',
    caption: 'Cleared by Policy Area',
    colour: 'GhostWhite',
    active: false,
    order: 3
  },
  {
    id: '4',
    icon: 'how_to_reg',
    caption: 'For Costing',
    colour: 'GhostWhite',
    active: false,
    order: 4
  },
  {
    id: '5',
    icon: 'how_to_reg',
    caption: 'Final QA Done',
    colour: 'GhostWhite',
    active: false,
    order: 5
  }
].sort(sortBy('order'))
