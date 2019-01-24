import { Injectable, Inject } from '@angular/core'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'
import { LOCALSTORAGE } from '@digital-first/df-utils'
import { LoggerService } from '@digital-first/df-logging'
import { AUTH_KEY } from '../constants'
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(LOCALSTORAGE) private localStorage: any,
    private logger: LoggerService,
    private router: Router,
    private jwtHelper: JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    const auth: any = JSON.parse(this.localStorage.getItem(AUTH_KEY))
    const idToken = auth && auth.status && auth.status.auth && auth.status.auth.idToken

    if (!idToken || this.jwtHelper.isTokenExpired(auth.status.auth.idToken)) {
      // console.log(idToken)
       this.router.navigate(['/', 'login'], { queryParams: { o: state.url } })
       return of(false)
    }
    return of(true)
  }

}
