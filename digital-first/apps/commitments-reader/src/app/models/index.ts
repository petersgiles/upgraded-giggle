
export interface DataResult<T> {
    data: T
    loading?: any
    error?: any
    networkStatus?: number
    stale?: boolean
  }

  export { Commitment } from '../models/commitment.model'
export * from './data-result.model'
export * from './commitment-event.model'
export * from './app-config.model'


export const refinerMap = {
  1: 'commitmentTypes',
  2: 'criticalDates',
  3: 'portfolioLookups'
}
