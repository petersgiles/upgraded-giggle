import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { of, Observable } from 'rxjs'
import { SideBarItem, AppUserProfile } from '@digital-first/df-layouts'
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
    return environment.version
  }

  get title(): string {
    return 'Programs Admin'
  }

  get open$(): Observable<boolean> {
    return of(false)
  }

  get profile(): Observable<AppUserProfile> {
    return of(null)
  }

  get sidebarItems$(): Observable<SideBarItem[]> {
    return of(this.sidebarRoutes)
  }

  get notification$(): Observable<string> {
    return of(null)
  }

  get drawOpen$(): Observable<boolean> {
    return of(true) // TODO: set up state for these
  }

  get drawerStyle(): 'permanent' | 'dismissible' | 'modal' {
    return 'dismissible'
  }

  setDrawState(appdrawerOpen: any): any {
    return of(true) // TODO: set up state for these
  }
}
