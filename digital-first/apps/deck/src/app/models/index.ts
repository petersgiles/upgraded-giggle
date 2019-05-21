export interface DataResult<T> {
  data: T
  loading?: any
  error?: any
  networkStatus?: number
  stale?: boolean
}

export * from './data-result.model'

export const refinerMap = {
  1: 'commitmentTypes',
  2: 'criticalDates',
  3: 'portfolioLookups'
}
