import { Observable, of, from } from 'rxjs'
import { AppDataService } from '@digital-first/df-app-core'
import { AppUserProfile } from '@digital-first/df-layouts'
import {
  ROLE_VISITORS,
  ROLE_MEMBERS,
  ROLE_OWNERS,
  OPERATION_RIGHT_WRITE,
  OPERATION_RIGHT_HIDE,
  OPERATION_RIGHT_READ
} from '@digital-first/df-app-core'
import {
  OPERATION_PMO_HANDLING_ADVICE,
  OPERATION_PMC_HANDLING_ADVICE
} from '../app-operations'

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
  data = [
    {
      group: 'ROLE_OWNERS',
      component: ['pmohandlingadvice', 'pmchandlingadvice'],
      rights: 'write',
      id: '0bc5e6f9dd0a4ef795999be061aadb05'
    },
    {
      group: 'ROLE_MEMBERS',
      component: ['pmohandlingadvice', 'pmchandlingadvice'],
      rights: 'read',
      id: '6ef1141ebbca4724b1a8eb6fa4285df1'
    },
    {
      group: 'ROLE_VISITORS',
      component: ['pmohandlingadvice', 'pmchandlingadvice'],
      rights: 'hide',
      id: 'c17ab6bf8c694f6ab26ab4e22a68796f'
    }
  ]
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

  constructor() {}

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
