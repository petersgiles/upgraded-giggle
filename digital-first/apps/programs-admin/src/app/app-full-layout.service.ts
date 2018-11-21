import {Injectable} from '@angular/core'
import {environment} from '../environments/environment'
import {of, Observable} from 'rxjs'
import {SideBarItem, AppUserProfile} from '@digital-first/df-layouts'
import {routes} from "./app-routing.module";

@Injectable({
  providedIn: 'root'
})
export class AppFullLayoutService {
  private readonly sidebarRoutes: { caption: string; icon: string; routerLink: string[] }[];

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
    return of(this.sidebarRoutes)
  }

  constructor() {

    this.sidebarRoutes = routes.filter(r => r.data).map(r => ({
      caption: r.data.title,
      icon: r.data.icon,
      routerLink: [`/${r.path}`]
    }))
  }

}
