import { DocumentStatus } from '@df/components'

export const classifications = [
  {
    caption: 'UNCLASSIFIED',
    value: 'UNCLASSIFIED'
  },
  {
    caption: 'IN CONFIDENCE',
    value: 'IN CONFIDENCE'
  },
  {
    caption: 'PROTECTED',
    value: 'PROTECTED'
  }
]

export const dlms = [
  {
    caption: 'Not for tabling - For Official Use Only',
    value: 'Not for tabling - For Official Use Only'
  },
  {
    caption: 'For Official Use Only',
    value: 'For Official Use Only'
  },
  {
    caption: 'Sensitive',
    value: 'Sensitive'
  },
  {
    caption: 'Sensitive Cabinet',
    value: 'Sensitive Cabinet'
  },
  {
    caption: 'Sensitive Legal',
    value: 'Sensitive Legal'
  },
  {
    caption: 'Sensitive Personal',
    value: 'Sensitive Personal'
  }
]

export const statuslist: DocumentStatus[] = [
  {
    id: '1',
    icon: 'people',
    caption: 'In Draft',
    colour: 'Pink',
    order: 1
  },
  {
    id: '2',
    icon: 'how_to_reg',
    caption: 'Ready',
    colour: 'GhostWhite',
    order: 2
  },
  {
    id: '3',
    icon: 'cancel_presentation',
    caption: 'Cancelled',
    colour: 'Crimson',
    order: 3
  }
]
