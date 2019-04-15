import { Injectable } from '@angular/core'

import { SharepointJsomService } from '@df/sharepoint'
import { Apollo } from 'apollo-angular'
import { SettingsService } from '../settings.service'
import { Observable } from 'rxjs'
import { GetPackNavigationSharepointService } from './sharepoint/get-pack-navigation-sharepoint.service'
import { GetPackNavigationApolloService } from './apollo/get-pack-navigation-apollo.service'

@Injectable({
  providedIn: 'root'
})
export abstract class GetPackNavigationService {
  constructor() {}
  abstract getPackNavigation(briefId: any): Observable<any>
}

const getPackNavigationServiceFactory = (
  settings: SettingsService,
  sharepointlib: SharepointJsomService,
  apollo: Apollo
) => {

  let source = null
  if (settings.datasources) {
    source = settings.datasources['packNavigation'].type
  }

  switch (source) {
    case 'sharepoint':
      return new GetPackNavigationSharepointService(sharepointlib)
    default:
      return new GetPackNavigationApolloService(apollo)
  }
}

export let getPackNavigationServiceProvider = {
  provide: GetPackNavigationService,
  useFactory: getPackNavigationServiceFactory,
  deps: [SettingsService, SharepointJsomService, Apollo]
}
