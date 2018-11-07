export * from './lib/+state/auth.reducer';
export { LoginComponent } from './lib/login/login.component';
export * from './lib/df-auth.module';
export * from './lib/models';

export {
    AUTH_FEATURE_KEY,
    initialState as authInitialState,
    authReducer
  } from './lib/+state/auth.reducer';
  export { AuthEffects } from './lib/+state/auth.effects';