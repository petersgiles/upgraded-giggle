export interface ServiceData<T> {
  data: { [key: string]: T }
}

export interface DataResult<T> {
  data: T
  loading: any
  error?: any
  networkStatus?: number
  stale?: boolean
}

export interface CommentsResult {
  comments: any[]
}

export interface ContactsResult {
  contacts: any[]
}
