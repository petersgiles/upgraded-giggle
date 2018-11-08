import { Injectable, Inject } from '@angular/core'
import { Effect, Actions, ofType } from '@ngrx/effects'
import { DataPersistence } from '@nrwl/nx'

import { AuthPartialState } from './auth.reducer'
import {
  AuthActionTypes, LoginRedirect, AuthTokenSuccess, LoginSuccess, LoginFailure
} from './auth.actions'
import { tap, filter, mergeMap, map, switchMap, catchError } from 'rxjs/operators'
import { Router } from '@angular/router'
import { Action } from '@ngrx/store'
import { of } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { LOCALSTORAGE } from '@digital-first/df-utils'
import { LoggerService } from '@digital-first/df-logging'
import { AUTH_KEY } from '../constants'

@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    tap((action: LoginRedirect) =>
      this.router.navigate(['/', 'login'], { queryParams: { o: action.payload } }))
  )

  @Effect()
  // handle location update
  locationUpdate$ = this.actions$
    .pipe(
      ofType('ROUTER_NAVIGATION'),
      filter((n: any) => (n.payload.event.url.indexOf('token=') > 0)),
      switchMap((action: any): Action[] => {

        // extract params from url
        const rS = action.payload.routerState
        const qP = rS.queryParams

        return [
          new AuthTokenSuccess({
            auth: {
              idToken: qP.token
            }
          }),
          //  new Go({ path: [rS.url.split('?')[0]] })
        ]
      }
      ))

  @Effect()
  authSuccess$ = this.actions$.pipe(ofType<AuthTokenSuccess>(AuthActionTypes.AuthTokenSuccess))
    .pipe(
      map((action) => action.payload),
      switchMap((token) =>
        this.authService.claims(token.auth.idToken)
          .pipe(
            tap(_ => this.localStorage.setItem(AUTH_KEY, JSON.stringify({ status: token }))),
            map(user => new LoginSuccess({ user })),
            catchError(error => of(new LoginFailure(error)))
          ))
    )

  constructor(
    @Inject(LOCALSTORAGE) private localStorage: any,
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private logger: LoggerService,
    private dataPersistence: DataPersistence<AuthPartialState>
  ) { }
}
