import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { map, mergeMap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import * as fromAuth from '../+state/auth.reducer'
import { Observable, of, timer } from 'rxjs'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Logout, AuthTokenRefresh } from '../+state/auth.actions';
import { AuthResult, LoggedInUser } from '../models';
import { DfAuthService } from './df-auth.service';


const CLAIM_EMAIL = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
const CLAIM_NAME = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  expiryAt$: any
  refreshSubscription: any
  jwtHelper: JwtHelperService

  constructor(private http: HttpClient, private store: Store<fromAuth.AuthState>, private dfAuthService: DfAuthService) {
    this.jwtHelper = new JwtHelperService()
  }

  logout() {
    this.store.dispatch(new Logout())
  }

  claims(token: string): Observable<LoggedInUser> {

    const decodedToken = this.jwtHelper.decodeToken(token)

    const email = decodedToken[CLAIM_EMAIL]
    const username = decodedToken[CLAIM_NAME]

    return of({
      title: username,
      background: 'red',
      displayType: 'circle',
      size: 35,
      email: email
    })
  }

  reissue(): Observable<AuthResult> {


    const url = `${this.dfAuthService.ApiPath}/api/auth/refresh`

    return this.http.get(url, { responseType: 'text' })
      .pipe(
        map(
          token =>
            ({
              idToken: token
            })))
  }

  public renewToken() {
    this.store.dispatch(new AuthTokenRefresh())
  }

  public scheduleRenewal() {
    const observableTimer = of(true).pipe(mergeMap(
      () =>
        timer(3600000)))

    // Once the delay time from above is
    // reached, dispatch a request for a token refresh and schedule another renewal
    this.refreshSubscription = observableTimer.subscribe(() => {
      this.renewToken()
      this.scheduleRenewal()
    })
  }

  public getExpiryDateFrom(token: string): Date {
    return this.jwtHelper.getTokenExpirationDate(token)
  }
}