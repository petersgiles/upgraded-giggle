import { Observable, of, from } from 'rxjs'
import { AppDataService } from '../app-data.service'
import { AppUserProfile } from '@digital-first/df-layouts'
import { ROLE_VISITORS, ROLE_MEMBERS, ROLE_OWNERS } from '../app-operations'


export class DevelopAppDataService implements AppDataService {
 data = [
    {
      "group": "ROLE_OWNERS",
      "component": [
        "pmohandlingadvice",
        "pmchandlingadvice"
      ],
      "rights": "write",
      "id": "0bc5e6f9dd0a4ef795999be061aadb05"
    },
    {
      "group": "ROLE_MEMBERS",
      "component": [
        "pmohandlingadvice",
        "pmchandlingadvice"
      ],
      "rights": "read",
      "id": "6ef1141ebbca4724b1a8eb6fa4285df1"
    },
    {
      "group": "ROLE_VISITORS",
      "component": [
        "pmohandlingadvice",
        "pmchandlingadvice"
      ],
      "rights": "hide",
      "id": "c17ab6bf8c694f6ab26ab4e22a68796f"
    }
  ]
  getCurrentUserOperations():Observable<any> {
    return of({data: {groupPermissions: this.data}}
    )
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
      roles: [ROLE_MEMBERS]
    }

    return of(userprofile)
  }
}
