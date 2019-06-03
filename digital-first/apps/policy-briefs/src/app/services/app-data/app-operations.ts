import {
  AppUserOperationsService,
  OPERATION_RIGHT_HIDE
} from '@digital-first/df-app-core'
import { Injectable } from '@angular/core'

export const OPERATION_EDIT_BRIEF = 'editBrief'
export const OPERATION_CREATE_BRIEF = 'createBrief'

export const APP_OPERATION_DEFAULTS = {}

APP_OPERATION_DEFAULTS[OPERATION_EDIT_BRIEF] = OPERATION_RIGHT_HIDE
APP_OPERATION_DEFAULTS[OPERATION_CREATE_BRIEF] = OPERATION_RIGHT_HIDE

@Injectable({
  providedIn: 'root'
})
export class DeckUserOperationsService implements AppUserOperationsService {
  get operations() {
    return APP_OPERATION_DEFAULTS
  }
}
