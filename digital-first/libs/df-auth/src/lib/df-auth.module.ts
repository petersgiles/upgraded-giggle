import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  AUTH_FEATURE_KEY,
  initialState as authInitialState,
  authReducer
} from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtAuthInterceptor } from './services/jwt-auth-interceptor.service';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { WINDOW_PROVIDERS } from '@digital-first/df-utils';
import { DfComponentsModule } from '@digital-first/df-components';
import { DfThemeModule } from '@digital-first/df-theme';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    DfComponentsModule,
    DfThemeModule,
    RouterModule.forChild([{ path: 'login', component: LoginPageComponent }]),
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer, {
      initialState: authInitialState
    }),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    WINDOW_PROVIDERS,,
    { provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true }
  ],
  declarations: [LoginPageComponent],
})
export class DfAuthModule { }
