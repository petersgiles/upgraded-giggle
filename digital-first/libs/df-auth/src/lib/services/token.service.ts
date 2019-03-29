import { Injectable, Inject } from '@angular/core'
import { Router, GuardsCheckStart } from '@angular/router'
import { filter, map, tap, switchMap } from 'rxjs/operators'
import { LOCALSTORAGE } from '@df/utils'
import { AUTH_KEY } from '../constants'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(
    @Inject(LOCALSTORAGE) private localStorage: any,
    private router: Router,
    private authService: AuthService
  ) {

    this.authService.scheduleRenewal()

    this.router.events
      .pipe(
        // // tslint:disable-next-line:no-console
        // tap((event: any) => console.log(event)),
        filter((event: any) => event instanceof GuardsCheckStart),
        filter((event: any) => event.url.indexOf('token=') > 0),
        map((event: any) => {
          const rS = event.state.root
          const qP = rS.queryParams
          return qP.token
        }),
        switchMap((token: string) => this.authService.claims(token)
          .pipe(
            tap(_ => this.localStorage.setItem(AUTH_KEY, JSON.stringify({ status: {auth: {idToken: token} }})))
          )
        )
      )
      .subscribe(evt => {
        // tslint:disable-next-line:no-console
        console.log('TokenService', evt)
      })
  }
}
