import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { of, Observable } from 'rxjs'
import { SideBarItem, AppUserProfile } from '@digital-first/df-layouts'

@Injectable({
  providedIn: 'root'
})
export class AppFullLayoutService {

  get version(): string {
    return environment.version
  }

  get title(): string {
    return 'Programs Admin'
  }

  get profile(): Observable<AppUserProfile> {
    return of(null)
  }

  get sidebarItems$(): Observable<SideBarItem[]> {
    return of([{
      caption: 'Settings',
      icon: 'settings',
      routerLink: ['/']
    }])
  }

  constructor() { }

}