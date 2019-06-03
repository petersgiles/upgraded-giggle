import { SharepointJsomService } from '@df/sharepoint'

import { AppSettingsService } from '@digital-first/df-app-core'
import { DiscussionDataLocalService } from './local/discussion-data.service'

import { DiscussionDataService } from './discussion-data.service'
import { DiscussionDataSharepointService } from './sharepoint/discussion-data.service'

const discussionDataServiceFactory = (
  settings: AppSettingsService,
  sharepointlib: SharepointJsomService
) => {
  let source = null
  if (settings.host) {
    source = settings.host
  }

  switch (source) {
    case 'sharepoint':
      return new DiscussionDataSharepointService(sharepointlib)
    default:
      return new DiscussionDataLocalService()
  }
}

export let discussionDataServiceProvider = {
  provide: DiscussionDataService,
  useFactory: discussionDataServiceFactory,
  deps: [AppSettingsService, SharepointJsomService]
}
