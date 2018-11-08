import { Injectable, Inject } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { LOCALSTORAGE } from '@digital-first/df-utils'
import { Store } from '@ngrx/store'
import * as fromAuthState from '../+state/auth.reducer'
import { LoginRedirect } from '../+state/auth.actions'
import { AUTH_KEY } from '../constants'

@Injectable({
  providedIn: 'root'
})
export class JwtAuthInterceptor implements HttpInterceptor {

  constructor(
    @Inject(LOCALSTORAGE) private localStorage: any,
    private store: Store<fromAuthState.AuthState>) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth: any = JSON.parse(this.localStorage.getItem(AUTH_KEY))
    const idToken = auth && auth.status && auth.status.auth && auth.status.auth.idToken

    if (!idToken) {
      this.store.dispatch(new LoginRedirect(req.url))
    }
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + idToken)
    })

    return next.handle(cloned)
  }

}
