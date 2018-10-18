import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { environment } from '../environments/environment'
import { CommitmentDataService } from './services/commitment-data.service'
import { Observable, of } from 'rxjs'
import { SideBarItem } from '@digital-first/df-layouts'

@Injectable({
  providedIn: 'root'
})
export class AppFullLayoutService implements OnInit, OnDestroy {

  get version(): string {
    return environment.version
  }

  get title(): string {
    return 'Election Commitments'
  }

  get sidebarItems$(): Observable<SideBarItem[]> {
    return of([{
      caption: 'Settings',
      icon: 'settings',
      routerLink: ['/']
    }])
  }

  constructor(private service: CommitmentDataService) { }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }

}