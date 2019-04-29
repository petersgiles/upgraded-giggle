export interface DataResult<T> {
  data: T
  loading?: any
  error?: any
  networkStatus?: number
  stale?: boolean
}
