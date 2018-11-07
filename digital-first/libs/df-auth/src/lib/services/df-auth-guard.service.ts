import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../+state/auth.reducer'
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ActivatedRouteSnapshot } from '@angular/router';
import { LoginRedirect } from '../+state/auth.actions';
import { DfAuthService } from './df-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DfAuthGuardService implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private dfAuthService: DfAuthService, private store: Store<fromAuth.AuthState>) {}

  canActivate(): Observable<boolean> {
    return this.dfAuthService.redirectMagic.pipe(
      map(authed => {
        if (!authed.loggedIn) {

          this.store.dispatch(new LoginRedirect(authed.url))
          return false
        }

        return true
      }),
      take(1)
    )
  }

}
