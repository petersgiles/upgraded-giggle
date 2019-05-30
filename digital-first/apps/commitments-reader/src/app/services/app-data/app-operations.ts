import { Injectable } from '@angular/core'
import {
  AppUserOperationsService,
  OPERATION_RIGHT_HIDE,
  OPERATION_RIGHT_WRITE
} from '@digital-first/df-app-core'

export const OPERATION_PMO_HANDLING_ADVICE = 'pmohandlingadvice'
export const OPERATION_PMC_HANDLING_ADVICE = 'pmchandlingadvice'
export const OPERATION_PLANNER = 'planner'
export const OPERATION_DISPLAY_ORDER = 'displayorder'

export const APP_OPERATION_DEFAULTS = {}

APP_OPERATION_DEFAULTS[OPERATION_PMO_HANDLING_ADVICE] = OPERATION_RIGHT_WRITE
APP_OPERATION_DEFAULTS[OPERATION_PMC_HANDLING_ADVICE] = OPERATION_RIGHT_WRITE
APP_OPERATION_DEFAULTS[OPERATION_PLANNER] = OPERATION_RIGHT_HIDE
APP_OPERATION_DEFAULTS[OPERATION_DISPLAY_ORDER] = OPERATION_RIGHT_HIDE

@Injectable({
  providedIn: 'root'
})
export class DeckUserOperationsService implements AppUserOperationsService {
  get operations() {
    return APP_OPERATION_DEFAULTS
  }
}
