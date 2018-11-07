import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DfThemeModule } from '@digital-first/df-theme';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  AUTH_FEATURE_KEY,
  initialState as authInitialState,
  authReducer
} from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { reducers } from 'apps/commitments/src/app/reducers';
import { DfAuthGuardService } from './services/df-auth-guard.service';

const COMPONENTS = [LoginComponent];

@NgModule({
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    DfThemeModule,
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer, {
      initialState: authInitialState
    }),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class DfAuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [AuthService, DfAuthGuardService],
    }
  }
}

@NgModule({
  imports: [
    DfAuthModule,
    RouterModule.forChild([{ path: 'login', component: LoginComponent }]),
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class RootAuthModule {}