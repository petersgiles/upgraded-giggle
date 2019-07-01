import { SharepointJsomService } from '@df/sharepoint'

import { AppSettingsService } from '@digital-first/df-app-core'
import { LookupDataLocalService } from './local/lookup-data.service'

import { LookupDataService } from './lookup-data.service'
import { LookupDataSharepointService } from './sharepoint/lookup-data.service'
import { LookupMapperService } from '../../services/mappers/lookup-mapper.service'

const lookupDataServiceFactory = (
  settings: AppSettingsService,
  sharepointlib: SharepointJsomService,
  lookupMapperService: LookupMapperService
) => {
  let source = null
  if (settings.host) {
    source = settings.host
  }

  switch (source) {
    case 'sharepoint':
      return new LookupDataSharepointService(sharepointlib)
    default:
      return new LookupDataLocalService()
  }
}

export let lookupDataServiceProvider = {
  provide: LookupDataService,
  useFactory: lookupDataServiceFactory,
  deps: [AppSettingsService, SharepointJsomService, LookupMapperService]
}
