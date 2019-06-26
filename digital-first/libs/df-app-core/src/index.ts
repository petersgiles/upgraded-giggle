
import { InjectionToken } from '@angular/core'

export * from './lib/df-app-core.module'
export * from './lib/reducers'
export * from './lib/reducers/router.effects'
export * from './lib/reducers/app/app.effects'
export * from './lib/reducers/app/app.model'
export * from './lib/reducers/user/user.effects'
export {
  ROLE_OWNERS,
  ROLE_MEMBERS,
  ROLE_VISITORS,
  OPERATION_RIGHT_READ,
  OPERATION_RIGHT_WRITE,
  OPERATION_RIGHT_HIDE,
  OPERATION_RIGHTS_PRECEDENT
} from './lib/reducers/user/user.reducer'

export { reducer as UserReducer } from './lib/reducers/user/user.reducer'
export {
  State as UserState,
  getUserCurrentUser,
  getUserCurrentUserOperations,
  getUserOperationMatrix
} from './lib/reducers/user/user.reducer'

export { reducer as AppReducer } from './lib/reducers/app/app.reducer'
export {
  State as AppState,
  selectAppConfigState,
  selectNotification,
  selectAppSpinnerState
} from './lib/reducers/app/app.reducer'
export {
  ShowSpinner,
  HideSpinner,
  AppNotification,
  ClearAppNotification,
  HandleGlobalError
} from './lib/reducers/app/app.actions'
export { initApplication } from './lib/app-init'
export { Config, App, Logo } from './lib/services/config/config-model'
export { AppDataService } from './lib/services/app-data.service'
export { AppSettingsService } from './lib/services/app-settings.service'
export { AppConfigService } from './lib/services/config/config.service'
export {
  configServiceProvider
} from './lib/services/config/config.service.factory'
export {
  AppUserOperationsService
} from './lib/services/app-user-operations.service'
export {
  AppErrorHandlerToSeqService
} from './lib/services/app-error-seq.service'
export {
  AppErrorRouteOverrideService
} from './lib/services/app-error-route-override.service'

export const HTTPSERVICE = new InjectionToken('http-service')
export const HTTPSERVICESETTINGS = new InjectionToken('http-service-settings')

export const FEDERATEDLOGINAPIPATH = new InjectionToken('federated-login-api-path')
export const APPBASEPATH = new InjectionToken('app-base-path')
