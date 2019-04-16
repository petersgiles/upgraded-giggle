import { Injectable } from '@angular/core'

import { SharepointJsomService } from '@df/sharepoint'

import { SettingsService } from '../settings.service'
import { Observable } from 'rxjs'
import { GetPackNavigationSharepointService } from './sharepoint/get-pack-navigation-sharepoint.service'
import { GetPackNavigationApolloService } from './apollo/get-pack-navigation-apollo.service'
import {
  GetPackNavigationGQL,
  ToggleExpandPackNavigationNodeGQL,
  ActivatePackNavigationNodeGQL
} from '../../generated/graphql'

@Injectable({
  providedIn: 'root'
})
export abstract class GetPackNavigationService {
  constructor() {}
  abstract getPackNavigation(input?: any): Observable<any>
  abstract toggleExpandPackNavigationNode(input: {id: string, isExpanded: boolean}): Observable<any>
  abstract activatePackNavigationNode(input: {id: string, isActive: boolean}): Observable<any> 
}

const getPackNavigationServiceFactory = (
  settings: SettingsService,
  sharepointlib: SharepointJsomService,
  getPackNavigationGQL: GetPackNavigationGQL,
  toggleExpandPackNavigationNodeGQL: ToggleExpandPackNavigationNodeGQL,
  activatePackNavigationNodeGQL: ActivatePackNavigationNodeGQL
) => {
  let source = null
  if (settings.datasources) {
    source = settings.datasources['packNavigation'].type
  }

  switch (source) {
    case 'sharepoint':
      return new GetPackNavigationSharepointService(sharepointlib)
    default:
      // tslint:disable-next-line:no-console
      console.log('GetPackNavigationApolloService')
      return new GetPackNavigationApolloService(
        getPackNavigationGQL,
        toggleExpandPackNavigationNodeGQL,
        activatePackNavigationNodeGQL
      )
  }
}

export let getPackNavigationServiceProvider = {
  provide: GetPackNavigationService,
  useFactory: getPackNavigationServiceFactory,
  deps: [
    SettingsService,
    SharepointJsomService,
    GetPackNavigationGQL,
    ToggleExpandPackNavigationNodeGQL,
    ActivatePackNavigationNodeGQL
  ]
}
