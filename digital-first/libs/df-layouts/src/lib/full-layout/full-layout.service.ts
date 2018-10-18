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

  get sidebarItems$(): Observable<SideBarItem[]> {
    return of([])
  }

  constructor() { }

}
