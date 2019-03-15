import { Injectable } from '@angular/core'
import { of, Observable } from 'rxjs'
export interface SideBarItem {
  caption?: string
  routerLink?: any[] | string
  icon?: string
  divider?: boolean
}
@Injectable({
  providedIn: 'root'
})
export class FullLayoutService {
   get drawerStyle(): 'permanent' | 'dismissible' | 'modal' {
    return 'modal'
  }

  get version(): string {
    return '0.0.0.0'
  }

  get title(): string {
    return 'New Application'
  }

  get profile(): Observable<AppUserProfile> {
    return of({
      name: 'Guest',
      background: 'red',
      displayType: 'circle',
      size: 35
    })
  }

  get drawOpen$(): Observable<boolean> {
    return of(true)
  }

  setDrawState(appdrawerOpen: any): any {
    throw new Error('Method not implemented.')
  }

  get sidebarItems$(): Observable<SideBarItem[]> {
    return of([])
  }

  get notification$(): Observable<any> { return of(null) }

  get open$(): Observable<boolean> { return of(null) }

  get protectiveMarking$(): Observable<any> { return of(null) }

  constructor() { }

}

export interface AppUserProfile {
  name: string
  roles?: any,
  email?: string
  background?: string
  displayType?: string
  size?: number
}