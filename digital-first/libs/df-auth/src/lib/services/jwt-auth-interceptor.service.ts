import { Injectable, Inject } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { LOCALSTORAGE } from '@df/utils'

import { AUTH_KEY } from '../constants'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class JwtAuthInterceptor implements HttpInterceptor {

  constructor(
    @Inject(LOCALSTORAGE) private localStorage: any,
    private router: Router
    ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth: any = JSON.parse(this.localStorage.getItem(AUTH_KEY))
    const idToken = auth && auth.status && auth.status.auth && auth.status.auth.idToken

    if (!idToken) {
       this.router.navigate(['/', 'login'], { queryParams: { o: req.url } })
    }
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + idToken)
    })

    return next.handle(cloned)
  }

}
