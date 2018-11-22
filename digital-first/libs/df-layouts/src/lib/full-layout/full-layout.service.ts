import { Injectable } from '@angular/core'
import { of, Observable } from 'rxjs'
export interface SideBarItem {
  caption: string
  routerLink: any[] | string
  icon: string
}
@Injectable({
  providedIn: 'root'
})
export class FullLayoutService {

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

  get sidebarItems$(): Observable<SideBarItem[]> {
    return of([])
  }

  get notification$(): Observable<any>  { return of(null) }

  constructor() { }

}

export interface AppUserProfile {
  name: string
  email?: string
  background?: string
  displayType?: string
  size?: number
}