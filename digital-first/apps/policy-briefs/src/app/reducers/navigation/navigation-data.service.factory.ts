import { SharepointJsomService } from '@df/sharepoint'

import { AppSettingsService } from '@digital-first/df-app-core'
import { NavigationDataSharepointService } from './sharepoint/navigation-data.service'
import { NavigationDataLocalService } from './local/navigation-data.service'
import { NavigationDataService } from './navigation-data.service'
import { BriefNavigationMapperService } from '../../services/mappers/brief-navigation-mapper.service'

const navigationDataServiceFactory = (
  settings: AppSettingsService,
  sharepointlib: SharepointJsomService,
  briefNavigationMapperService: BriefNavigationMapperService
) => {
  let source = null
  if (settings.host) {
    source = settings.host
  }

  switch (source) {
    case 'sharepoint':
      return new NavigationDataSharepointService(
        sharepointlib,
        briefNavigationMapperService
      )
    default:
      return new NavigationDataLocalService(briefNavigationMapperService)
  }
}

export let navigationDataServiceProvider = {
  provide: NavigationDataService,
  useFactory: navigationDataServiceFactory,
  deps: [
    AppSettingsService,
    SharepointJsomService,
    BriefNavigationMapperService
  ]
}
