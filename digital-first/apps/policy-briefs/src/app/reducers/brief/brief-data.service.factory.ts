import { SharepointJsomService } from '@df/sharepoint'

import { AppSettingsService } from '@digital-first/df-app-core'
import { BriefDataLocalService } from './local/brief-data.service'
import { BriefDataSharepointService } from './sharepoint/brief-data.service'
import { BriefDataService } from './brief-data.service'
import { HttpClient } from '@angular/common/http'
import { BriefMapperService } from '../../services/mappers/brief-mapper.service'
import { RecommendedDirectionMapperService } from '../../services/mappers/recommended-direction-mapper.service'
import { RecommendationMapperService } from '../../services/mappers/recommendation-mapper.service'
import { AttachmentMapperService } from '../../services/mappers/attachment-mapper.service'
import { LookupMapperService } from '../../services/mappers/lookup-mapper.service'

const briefDataServiceFactory = (
  http: HttpClient,
  settings: AppSettingsService,
  sharepointlib: SharepointJsomService,
  briefMapperService: BriefMapperService,
  recommendedDirectionMapperService: RecommendedDirectionMapperService,
  recommendationMapperService: RecommendationMapperService,
  attachmentMapperService: AttachmentMapperService,
  lookupMapperService: LookupMapperService
) => {

  let source = null

  if (settings.host) {
    source = settings.host
  }

  switch (source) {
    case 'sharepoint':
      return new BriefDataSharepointService(
        http,
        sharepointlib,
        briefMapperService,
        recommendedDirectionMapperService,
        recommendationMapperService,
        attachmentMapperService,
        lookupMapperService
      )
    default:
      return new BriefDataLocalService(http, settings, briefMapperService)
  }
}

export let briefDataServiceProvider = {
  provide: BriefDataService,
  useFactory: briefDataServiceFactory,
  deps: [
    HttpClient,
    AppSettingsService,
    SharepointJsomService,
    BriefMapperService,
    RecommendedDirectionMapperService,
    RecommendationMapperService,
    AttachmentMapperService,
    LookupMapperService
  ]
}
