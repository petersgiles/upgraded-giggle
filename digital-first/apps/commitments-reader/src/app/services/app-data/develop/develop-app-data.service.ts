import { Observable, of, from } from 'rxjs'
import { AppDataService } from '../app-data.service'
import { AppUserProfile } from '@digital-first/df-layouts'
import { ROLE_VISITORS, ROLE_MEMBERS, ROLE_OWNERS, OPERATION_PMO_HANDLING_ADVICE, OPERATION_PMC_HANDLING_ADVICE, OPERATION_RIGHT_WRITE, OPERATION_RIGHT_HIDE, OPERATION_RIGHT_READ } from '../app-operations'

const testOperations = [
  {
    group: ROLE_OWNERS,
    component: [
      OPERATION_PMO_HANDLING_ADVICE,
      OPERATION_PMC_HANDLING_ADVICE
    ],
    rights: OPERATION_RIGHT_WRITE
  },
  {
    group: ROLE_MEMBERS,
    component: [
      OPERATION_PMO_HANDLING_ADVICE,
      OPERATION_PMC_HANDLING_ADVICE
    ],
    rights: OPERATION_RIGHT_READ
  },
  {
    group: ROLE_VISITORS,
    component: [
      OPERATION_PMO_HANDLING_ADVICE,
      OPERATION_PMC_HANDLING_ADVICE
    ],
    rights: OPERATION_RIGHT_HIDE
  }
]

export class DevelopAppDataService implements AppDataService {
  getCurrentUserOperations(): Observable<any> {
console.log(testOperations)

    return of(testOperations)
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
      roles: [ROLE_VISITORS]
    }

    return of(userprofile)
  }
}
