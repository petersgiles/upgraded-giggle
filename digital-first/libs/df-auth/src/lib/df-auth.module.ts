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

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer, {
      initialState: authInitialState
    }),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class DfAuthModule {}
