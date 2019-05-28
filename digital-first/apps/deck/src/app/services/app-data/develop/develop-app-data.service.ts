import { Observable, of, from } from 'rxjs'

import { AppUserProfile } from '@digital-first/df-layouts'
import {
  OPERATION_PMO_HANDLING_ADVICE,
  OPERATION_PMC_HANDLING_ADVICE
} from '../app-operations'
import {
  ROLE_OWNERS,
  OPERATION_RIGHT_WRITE,
  ROLE_MEMBERS,
  OPERATION_RIGHT_READ,
  ROLE_VISITORS,
  OPERATION_RIGHT_HIDE,
  AppDataService
} from '@digital-first/df-app-core'

const testOperations = [
  {
    group: ROLE_OWNERS,
    component: [OPERATION_PMO_HANDLING_ADVICE, OPERATION_PMC_HANDLING_ADVICE],
    rights: OPERATION_RIGHT_WRITE
  },
  {
    group: ROLE_MEMBERS,
    component: [OPERATION_PMO_HANDLING_ADVICE, OPERATION_PMC_HANDLING_ADVICE],
    rights: OPERATION_RIGHT_READ
  },
  {
    group: ROLE_VISITORS,
    component: [OPERATION_PMO_HANDLING_ADVICE, OPERATION_PMC_HANDLING_ADVICE],
    rights: OPERATION_RIGHT_HIDE
  }
]

export class DevelopAppDataService implements AppDataService {
  getCurrentUserOperations(): Observable<any> {
    return of({
      data: { groupPermissions: testOperations },
      loading: false,
      error: null
    })
  }
  get UserOperation(): Observable<any> {
    return of(null)
  }

  getBusy(): Observable<boolean> {
    return of(false)
  }

  constructor() {
    // tslint:disable-next-line: no-console
    console.log('DevelopAppDataService')
  }

  getCurrentUser(): Observable<AppUserProfile> {
    const userprofile = {
      userid: 0,
      login: 'guest',
      isSiteAdmin: true,
      systemUserKey: 'guest',
      name: 'Guest User',
      roles: [ROLE_OWNERS]
    }

    return of(userprofile)
  }
}
