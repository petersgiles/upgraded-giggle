import { SharepointJsomService } from '@df/sharepoint'

import { AppSettingsService } from '@digital-first/df-app-core'
import { DiscussionDataLocalService } from './local/discussion-data.service'

import { DiscussionDataService } from './discussion-data.service'
import { DiscussionDataSharepointService } from './sharepoint/discussion-data.service'
import { DiscussionMapperService } from '../../services/mappers/discussion-mapper.service'
import { AppDataService } from '../../services/app-data.service';

const discussionDataServiceFactory = (
  settings: AppSettingsService,
  appDataService: AppDataService,
  sharepointlib: SharepointJsomService,
  discussionMapperService: DiscussionMapperService
) => {

  console.log(
    `discussionDataServiceFactory`,
    settings,
    sharepointlib
  )


  let source = null
  if (settings.host) {
    source = settings.host
  }

  switch (source) {
    case 'sharepoint':
      return new DiscussionDataSharepointService(sharepointlib, discussionMapperService)
    default:
      return new DiscussionDataLocalService(discussionMapperService)
  }
}

export let discussionDataServiceProvider = {
  provide: DiscussionDataService,
  useFactory: discussionDataServiceFactory,
  deps: [AppSettingsService, AppDataService, SharepointJsomService, DiscussionMapperService]
}
