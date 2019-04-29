
export interface DataResult<T> {
    data: T
    loading?: any
    error?: any
    networkStatus?: number
    stale?: boolean
  }

  export { Commitment } from '../models/commitment.model'