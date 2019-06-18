export interface DataResult<T> {
  data: T
  loading?: any
  error?: any
  networkStatus?: number
  stale?: boolean
}

export * from './data-result.model'

export enum DiscussionType {
  Agency = 'Agency',
  Office = 'Office'
}

export const refinerMap = {
  1: 'commitmentTypes',
  2: 'criticalDates',
  3: 'portfolioLookups'
}

export interface DisplayLookup {
  id: string | number,
  title: string
}

export interface Author {
  username: string
  name: string
  email: string
  phone: string
  color: string
}

export interface Comment {
  id: string
  title: string
  created: string
  text: string
  brief: string
  parent: string
  author: string
}

export interface Discussion {
  
    id:  string
    sortOrder:  string
    briefId:  string
    parent:  string
    text:  string
    created:  string
    channel:  DiscussionType
    author: Author
  
}

export interface NavigationNode {
  id: string
  briefId: string
  caption: string
  parent: string
  colour: string
  order: string
  active: boolean
  expanded: boolean
}

export interface Brief {
  id: string
  fileLeafRef: string
  title: string
  reference: string
  securityClassification: string
  dLM: string
  policyDirection: string
  order: string
  modified: string
  dueDate: string
  editor: DisplayLookup
  subPolicy: DisplayLookup
  policy: DisplayLookup
  briefStatus: DisplayLookup
  briefDivision: DisplayLookup
}

export interface RecommendedDirection {
  id: string
  title: string
  recommendation: string
  brief: string
}

export interface Attachment {
  id: string
  fileLeafRef: string
  notes: string
  title: string
  briefId: string
  order: string
}

export interface Recommendation {
  id: string
  title: string
  recommendation: string
  order: string
  outcome1: string
  outcome2: string
  outcome3: string
  colour: string
  brief: string
  subPolicy: string
  policy: string
}

export interface Lookup {
  id: string | number
  title: string
  order: string | number
}
