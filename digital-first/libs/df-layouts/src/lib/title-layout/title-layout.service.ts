import { Injectable } from '@angular/core'
import { of, Observable } from 'rxjs'
import { AppUserProfile, SideBarItem } from '../models'

@Injectable({
  providedIn: 'root'
})
export class TitleLayoutService {

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

  setDrawState(appdrawerOpen: any): any {
    throw new Error('Method not implemented.')
  }

  get sidebarItems$(): Observable<SideBarItem[]> {
    return of([])
  }

  get notification$(): Observable<any> { return of(null) }

  get protectiveMarking$(): Observable<any> { return of(null) }

  constructor() { }

}
