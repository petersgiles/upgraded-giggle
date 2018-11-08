import { Injectable, Inject } from '@angular/core'
import { CanActivate } from '@angular/router'
import { Observable, of } from 'rxjs'
import { Store } from '@ngrx/store'
import { LoginRedirect } from '../+state/auth.actions'
import * as fromAuthState from '../+state/auth.reducer'
import { LOCALSTORAGE } from '@digital-first/df-utils'
import { LoggerService } from '@digital-first/df-logging'
import { AUTH_KEY } from '../constants'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(LOCALSTORAGE) private localStorage: any,
    private store: Store<fromAuthState.AuthState>,
    private logger: LoggerService) { }

  canActivate(): Observable<boolean> {

    const auth: any = JSON.parse(this.localStorage.getItem(AUTH_KEY))
    const idToken = auth && auth.status && auth.status.auth && auth.status.auth.idToken

    this.logger.info('AuthGuard', auth, idToken)

    if (!idToken) {
      this.store.dispatch(new LoginRedirect(''))
      return of(false)
    }
    return of(true)
  }

}
