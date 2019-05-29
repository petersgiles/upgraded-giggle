import {
  OPERATION_RIGHT_READ,
  AppUserOperationsService
} from '@digital-first/df-app-core'
import { Injectable } from '@angular/core'

export const OPERATION_EDIT_CARD = 'editCard'

export const APP_OPERATION_DEFAULTS = {}

APP_OPERATION_DEFAULTS[OPERATION_EDIT_CARD] = OPERATION_RIGHT_READ

@Injectable({
  providedIn: 'root'
})
export class DeckUserOperationsService implements AppUserOperationsService {
  get operations() {
    return APP_OPERATION_DEFAULTS
  }
}
