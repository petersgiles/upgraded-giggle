import { Injectable, Inject } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { HttpClient } from '@angular/common/http'
import { timer, Observable, of } from 'rxjs'
import { User, AuthResult } from '../+state/models'
import { map, mergeMap } from 'rxjs/operators'
import { AuthTokenRefresh } from '../+state/auth.actions'
import { FEDERATEDLOGINAPIPATH } from '@digital-first/df-app-tokens'
import { LoggerService } from '@digital-first/df-logging'

const CLAIM_EMAIL = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
const CLAIM_NAME = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  expiryAt$: any
  refreshSubscription: any
  jwtHelper: JwtHelperService

  constructor(@Inject(FEDERATEDLOGINAPIPATH) private federatedLoginApiPath: any,
    private http: HttpClient,
    private logger: LoggerService) {

    this.jwtHelper = new JwtHelperService()
  }

  claims(token: string): Observable<User> {

    const decodedToken = this.jwtHelper.decodeToken(token)

    const email = decodedToken[CLAIM_EMAIL]
    const username = decodedToken[CLAIM_NAME]

    const user = {
      title: username,
      background: 'red',
      displayType: 'circle',
      size: 35,
      email: email
    }

    this.logger.info('claims', user)

    return of(user)
  }

  reissue(): Observable<AuthResult> {
    return this.http.get(`${this.federatedLoginApiPath}/api/auth/refresh`, { responseType: 'text' })
      .pipe(
        map(
          token =>
            ({
              idToken: token
            })))
  }

  public renewToken() {
    // this.store.dispatch(new AuthTokenRefresh())
  }

  public scheduleRenewal() {
    const observableTimer = of(true).pipe(
      mergeMap(() => timer(3600000)))

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
