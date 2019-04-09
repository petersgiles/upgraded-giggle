import { Injectable } from '@angular/core'

import { SharepointJsomService } from '@df/sharepoint'
import { Apollo } from 'apollo-angular'
import { SettingsService } from '../settings.service'
import { GetBriefByIdSharepointService } from './sharepoint/get-brief-by-id-sharepoint.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export abstract class GetBriefByIdService {
  constructor() {}
  abstract getBriefById(briefId: any): Observable<any>
}

const getBriefByIdServiceFactory = (
  settings: SettingsService,
  sharepointlib: SharepointJsomService,
  apollo: Apollo
) => {

  let source = null
  if (settings.datasources) {
    source = settings.datasources['brief'].type
  }

  switch (source) {
    case 'sharepoint':
      return new GetBriefByIdSharepointService(sharepointlib)
    default:
      // return new GetBriefByIdApolloService(apollo)
  }
}

export let getBriefByIdServiceProvider = {
  provide: GetBriefByIdService,
  useFactory: getBriefByIdServiceFactory,
  deps: [SettingsService, SharepointJsomService, Apollo]
}
