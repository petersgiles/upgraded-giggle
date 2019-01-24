import { Injectable, Inject } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { HttpClient } from '@angular/common/http'
import { timer, Observable, of } from 'rxjs'
import { User, AuthResult } from '../models'
import { map, mergeMap, first } from 'rxjs/operators'
import { FEDERATEDLOGINAPIPATH } from '@digital-first/df-app-tokens'
import { LoggerService } from '@digital-first/df-logging'
import { AUTH_KEY } from '../constants'
import { LOCALSTORAGE } from '@digital-first/df-utils'

const CLAIM_EMAIL =
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
const CLAIM_NAME = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  expiryAt$: any

  constructor(
    @Inject(FEDERATEDLOGINAPIPATH) private federatedLoginApiPath: any,
    @Inject(LOCALSTORAGE) private localStorage: any,
    private http: HttpClient,
    private logger: LoggerService,
    private jwtHelper: JwtHelperService
  ) {}

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

    

    return of(user)
  }

  reissue(): Observable<AuthResult> {
    // tslint:disable-next-line:no-console
    console.log('reissue')
    return this.http
      .get(`${this.federatedLoginApiPath}/api/auth/refresh`, {
        responseType: 'text'
      })
      .pipe(
        map(token => ({
          idToken: token
        }))
      )
  }

  public scheduleRenewal() {
    of(true)
      .pipe(
        mergeMap(() => timer(300000)),
        first()
      )
      .subscribe(() => {
        this.reissue().subscribe((token: any) => {
          this.localStorage.setItem(AUTH_KEY, JSON.stringify({ status: {auth: token }}))
          this.scheduleRenewal()
        })
      })
  }

  public getExpiryDateFrom(token: string): Date {
    return this.jwtHelper.getTokenExpirationDate(token)
  }
}
