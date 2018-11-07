import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  AuthActionTypes, AuthTokenSuccess, LoginSuccess, LoginFailure, LoginRedirect, AuthTokenRefresh, AuthTokenRefreshSuccess, AuthTokenRefreshFailure, StartAutoTokenRefresh
} from './auth.actions';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { map, switchMap, catchError, tap, filter, mergeMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { Go } from 'apps/commitments/src/app/reducers/router.actions';
import { DfAuthService } from '../services/df-auth.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dfAuthService: DfAuthService
  ) {
  }

  @Effect()
  authSuccess$ = this.actions$.pipe(ofType<AuthTokenSuccess>(AuthActionTypes.AuthTokenSuccess))
    .pipe(
      map((action) => action.payload),
      switchMap((token) =>
        this.authService.claims(token.auth.idToken)
          .pipe(
            map(user => new LoginSuccess({ user })),
            catchError(error => of(new LoginFailure(error)))
          ))
    )

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    tap((action: LoginRedirect) =>
      this.router.navigate(['/', 'login'], { queryParams: { o: action.payload } }))
  )

  @Effect()
  // handle location update
  locationUpdate$ = this.actions$
    .ofType('ROUTER_NAVIGATION')
    .pipe(
      filter((n: any) => (n.payload.event.url.indexOf('token=') > 0)),
      mergeMap((action: any): any[] => {

        // extract params from url
        const rS = action.payload.routerState
        const qP = rS.queryParams

        return [
          new AuthTokenSuccess({
            auth: {
              idToken: qP.token
            }
          }),
          new Go({ path: [rS.url.split('?')[0]] })
        ]
      }
      ))

  @Effect()
  loginReissue$ = this.actions$
    .ofType(AuthActionTypes.AuthTokenRefresh)
    .pipe(
      switchMap(
        () => this.authService.reissue()
          .pipe(
            map(authResult =>
              new AuthTokenRefreshSuccess(authResult)),
            catchError(error => of(new AuthTokenRefreshFailure(error)))
          )
      ))

  // TODO: this should dispath succes and failure
  @Effect({ dispatch: false })
  startAutoTokenRefresh$ = this.actions$
    .ofType(AuthActionTypes.StartAutoTokenRefresh)
    .pipe(
      map(_ => {
        this.authService.scheduleRenewal()
      })
    )

  @Effect()
  tokenExpired$ = this.actions$
    .ofType(AuthActionTypes.AuthTokenRefreshFailure)
    .pipe(
      switchMap(_ => this.dfAuthService.redirectMagic
        .pipe(
          take(1),
          map(authed => new LoginRedirect(authed.url))
        )
      )
    )
}
