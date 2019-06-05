import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AppErrorRouteOverrideService {
  routeError(error: Error) {}
}
