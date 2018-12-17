import {Injectable, Inject} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router'
import {Observable, of} from 'rxjs'
import {LOCALSTORAGE} from '@digital-first/df-utils'
import {LoggerService} from '@digital-first/df-logging'
import {AUTH_KEY} from '@digital-first/df-auth';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  jwtHelper: JwtHelperService;

  constructor(
    @Inject(LOCALSTORAGE)
    private localStorage: any,
    private logger: LoggerService,
    private router: Router) {

    //TODO:  inject this in via DI
    this.jwtHelper = new JwtHelperService()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    const auth: any = JSON.parse(this.localStorage.getItem(AUTH_KEY));
    const idToken = auth && auth.status && auth.status.auth && auth.status.auth.idToken;

    if (!idToken || this.jwtHelper.isTokenExpired(auth.status.auth.idToken)) {

      this.router.navigate(['login'], {queryParams: {o: state.url}});

      return of(false)
    }
    return of(true)
  }
}
