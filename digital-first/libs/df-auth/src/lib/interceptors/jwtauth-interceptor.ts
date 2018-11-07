import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth: any = JSON.parse(localStorage.getItem('auth'));
    const idToken =
      auth && auth.status && auth.status.auth && auth.status.auth.idToken;

    if (!idToken) {
      // this.store.dispatch(new Auth.LoginRedirect(req.url))
    }
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + idToken)
    });

    return next.handle(cloned);
  }
}
