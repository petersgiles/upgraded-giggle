import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { of, Observable, BehaviorSubject } from 'rxjs'
import { SideBarItem} from '@digital-first/df-layouts'
import {SPAppUserProfile} from '@df/sharepoint'
import { routes } from './app-routing.module'

@Injectable({
  providedIn: 'root'
})
export class AppFullLayoutService {
  private readonly sidebarRoutes: {
    caption: string
    icon: string
    routerLink: string[]
  }[]

  appdrawerOpen: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor() {
    this.sidebarRoutes = routes[0].children
      .filter(r => r.data && r.data.nav)
      .map(r => ({
        caption: r.data.title,
        icon: r.data.icon,
        routerLink: [`/${r.path}`]
      }))
  }

  get version(): string {
    return `V ${environment.version} - '${environment.commitHash}'`
  }

  get title(): string {
    return 'Programs Admin'
  }

  get open$(): Observable<boolean> {
    return of(false)
  }

  get profile(): Observable<SPAppUserProfile> {
    return of(null)
  }

  get sidebarItems$(): Observable<SideBarItem[]> {
    return of(this.sidebarRoutes)
  }

  get notification$(): Observable<string> {
    return of(null)
  }

  get drawOpen$(): Observable<boolean> {
    return this.appdrawerOpen.asObservable()
  }

  get drawerStyle(): 'permanent' | 'dismissible' | 'modal' {
    return 'permanent'
  }

  setDrawState(appdrawerOpen: any): any {
    this.appdrawerOpen.next(appdrawerOpen)
  }
}
