// import { Injectable, Inject } from '@angular/core'
// import { Effect, Actions, ofType } from '@ngrx/effects'
// import {
//   AuthActionTypes, LoginRedirect, AuthTokenSuccess, LoginSuccess, LoginFailure, AuthTokenRefresh, AuthTokenRefreshSuccess, AuthTokenRefreshFailure, StartAutoTokenRefresh
// } from './+state/auth.actions'
// import { tap, filter, map, switchMap, catchError} from 'rxjs/operators'
// import { Router } from '@angular/router'
// import { Action } from '@ngrx/store'
// import { of } from 'rxjs'
// import { AuthService } from './services/auth.service'
// import { LOCALSTORAGE } from '@df/utils'
// import { AUTH_KEY } from './constants'

// @Injectable()
// export class AuthEffects {

//   @Effect()
//   authSuccess$ = this.actions$.pipe(ofType<AuthTokenSuccess>(AuthActionTypes.AuthTokenSuccess))
//     .pipe(
//       map((action) => action.payload),
//       switchMap((token) => this.authService.claims(token.auth.idToken)
//         .pipe(
//           tap(_ => this.localStorage.setItem(AUTH_KEY, JSON.stringify({ status: token }))),
//           map(user => new LoginSuccess({ user })),
//           catchError(error => of(new LoginFailure(error)))
//         ))
//     )

//   @Effect({ dispatch: false })
//   loginRedirect$ = this.actions$.pipe(
//     ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
//     tap((action: LoginRedirect) =>
//       this.router.navigate(['/', 'login'], { queryParams: { o: action.payload } }))
//   )

//   @Effect()
//   // handle location update
//   locationUpdate$ = this.actions$
//     .pipe(
//       ofType('ROUTER_NAVIGATION'),
//       filter((n: any) => (n.payload.event.url.indexOf('token=') > 0)),
//       switchMap((action: any): Action[] => {

//         // extract params from url
//         const rS = action.payload.routerState
//         const qP = rS.queryParams

//         return [
//           new AuthTokenSuccess({
//             auth: {
//               idToken: qP.token
//             }
//           }),
//           //  new Go({ path: [rS.url.split('?')[0]] })
//         ]
//       }
//       ))

//   @Effect()
//   loginReissue$ = this.actions$
//     .pipe(
//       ofType<AuthTokenRefresh>(AuthActionTypes.AuthTokenRefresh),
//       switchMap(_ => this.authService.reissue()
//         .pipe(
//           map(authResult => new AuthTokenRefreshSuccess(authResult)),
//           catchError(error => of(new AuthTokenRefreshFailure(error)))
//         )
//       ))

//   // TODO: this should dispath succes and failure
//   @Effect({ dispatch: false })
//   startAutoTokenRefresh$ = this.actions$
//     .pipe(
//       ofType<StartAutoTokenRefresh>(AuthActionTypes.StartAutoTokenRefresh),
//       map(_ => this.authService.scheduleRenewal())
//     )

//   @Effect()
//   tokenExpired$ = this.actions$
//     .pipe(
//       ofType<AuthTokenRefreshFailure>(AuthActionTypes.AuthTokenRefreshFailure),
//       map(_ => new LoginRedirect('')
//       )
//     )

//   constructor(
//     @Inject(LOCALSTORAGE) private localStorage: any,
//     private actions$: Actions,
//     private router: Router,
//     private authService: AuthService
//   ) { }
// }
