import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { DeckDataService } from './services/deck-data.service'
import { Observable, of } from 'rxjs'
import { SideBarItem} from '@digital-first/df-layouts'
import {SPAppUserProfile} from '@df/sharepoint'

@Injectable({
  providedIn: 'root'
})
export class AppFullLayoutService {
  _profile: any

  get version(): string {
    return environment.version
  }

  get title(): string {
    return 'Deck'
  }

  get sidebarItems$(): Observable<SideBarItem[]> {
    return of([{
      caption: 'Home',
      icon: 'home',
      routerLink: ['/home']
    }, {
      divider: true
    }
  ])
  }

  get drawerStyle(): 'permanent' | 'dismissible' | 'modal' {
    return 'dismissible'
  }

  get drawOpen$(): Observable<boolean> {
    return this.service.getDrawState()
  }

  setDrawState(appdrawerOpen: any) {
     this.service.setDrawState(appdrawerOpen)
  }

  get notification$(): Observable<string> {
    return this.service.Notification
  }

  get open$(): Observable<boolean>  {
    return this.service.getBusy()
  }

  get profile(): Observable<SPAppUserProfile> {
    return this.service.getCurrentUser()
  }
  constructor(private service: DeckDataService) {
  }
}