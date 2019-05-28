import { SharepointJsomService } from '@df/sharepoint'
import { DeckDataSharepointService } from './sharepoint/deck-data.service';
import { DeckDataLocalService } from './local/deck-data.service';
import { DeckDataService } from './deck-data.service';
import { AppSettingsService } from '@digital-first/df-app-core';


const deckDataServiceFactory = (
  settings: AppSettingsService,
  sharepointlib: SharepointJsomService
) => {
  let source = null
  if (settings.host) {
    source = settings.host
  }

  switch (source) {
    case 'sharepoint':
      return new DeckDataSharepointService(sharepointlib)
    default:
      return new DeckDataLocalService()
  }
}

export let deckDataServiceProvider = {
  provide: DeckDataService,
  useFactory: deckDataServiceFactory,
  deps: [AppSettingsService, SharepointJsomService]
}
