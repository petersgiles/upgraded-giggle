export interface ServiceData<T> {
    data: { [key: string]: T }
}

export interface DataResult<T> {
    data: T
    loading: any
    error?: any
  }
