export interface DataResult<T> {
  data: T
  loading?: any
  error?: any
  networkStatus?: number
  stale?: boolean
}

export interface GroupPermission {
  id: string
  rights: string
  component: string[]
  group: string
}

export interface GroupPermissionsResult {
  groupPermissions: GroupPermission[]
}