import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { JwtAuthInterceptor } from './services/jwt-auth-interceptor.service'
import { LoginPageComponent } from './components/login-page/login-page.component'
import {
  WINDOW_PROVIDERS,
  LOCALSTORAGE_PROVIDERS
} from '@digital-first/df-utils'
import { DfComponentsModule } from '@digital-first/df-components'
import { DfThemeModule } from '@digital-first/df-theme'

import { DfLoggingModule } from '@digital-first/df-logging'
import { AuthService } from './services/auth.service'
import { AuthGuard } from './services/auth-guard.service'
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt'
import { TokenService } from './services/token.service'
import { AUTH_KEY } from './constants'

export function getToken() {
  return localStorage.getItem(AUTH_KEY)
 }

@NgModule({
  imports: [
    CommonModule,
    DfLoggingModule,
    DfComponentsModule,
    DfThemeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    }),
    RouterModule.forChild([{ path: 'login', component: LoginPageComponent }])
  ],
  providers: [
    WINDOW_PROVIDERS,
    TokenService,
    AuthService,
    JwtHelperService,
    AuthGuard,
    LOCALSTORAGE_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true }
  ],
  declarations: [LoginPageComponent]
})
export class DfAuthModule {
  constructor(private tokenService: TokenService) {}
}
