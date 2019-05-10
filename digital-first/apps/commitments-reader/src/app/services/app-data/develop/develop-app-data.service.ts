import { Observable, of, from} from 'rxjs'
import { AppDataService } from '../app-data.service'
import { AppUserProfile } from '@digital-first/df-layouts'
import { ROLE_VISITORS, ROLE_MEMBERS, ROLE_OWNERS } from '../app-operations'

export class DevelopAppDataService implements AppDataService {
  getCurrentUserOperations(roles: { groupPermissions: any }): Observable<any> {
    return of([
      {
        "group": "ROLE_OWNERS",
        "component": [
          "pmohandlingadvice",
          "pmchandlingadvice"
        ],
        "rights": "write",
        "_id": "0bc5e6f9dd0a4ef795999be061aadb05"
      },
      {
        "group": "ROLE_MEMBERS",
        "component": [
          "pmohandlingadvice",
          "pmchandlingadvice"
        ],
        "rights": "read",
        "_id": "6ef1141ebbca4724b1a8eb6fa4285df1"
      },
      {
        "group": "ROLE_VISITORS",
        "component": [
          "pmohandlingadvice",
          "pmchandlingadvice"
        ],
        "rights": "hide",
        "_id": "c17ab6bf8c694f6ab26ab4e22a68796f"
      }
    ]
    )
  }
  get UserOperation(): Observable<any> {
    return of(null)
  }
  getDrawState(): Observable<boolean> {
    return of(false)
  }
  setDrawState(appdrawerOpen: any): any {
    return of(false)
  }

  getBusy(): Observable<boolean> {
    return of(false)
  }

  constructor() {}

  // Notification

  get Notification(): Observable<string> {
    return of(null)
  }

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
