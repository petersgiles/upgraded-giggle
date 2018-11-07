import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //const auth: AuthState = JSON.parse(localStorage.getItem('auth'))
    const idToken = null; // auth && auth.status && auth.status.auth && auth.status.auth.idToken

    if (!idToken) {
      // this.store.dispatch(new Auth.LoginRedirect(req.url))
    }
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + idToken)
    });

    return next.handle(cloned);
  }

  constructor() {}
}
