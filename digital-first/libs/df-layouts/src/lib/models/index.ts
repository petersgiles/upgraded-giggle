export interface SideBarItem {
  caption?: string
  routerLink?: any[] | string
  icon?: string
  divider?: boolean
}

export interface AppUserProfile {
  name: string
  roles?: any
  email?: string
  background?: string
  displayType?: string
  size?: number
}
