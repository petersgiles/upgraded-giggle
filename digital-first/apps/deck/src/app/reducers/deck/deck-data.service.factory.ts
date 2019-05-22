import { SharepointJsomService } from '@df/sharepoint'
import { DeckDataSharepointService } from './sharepoint/deck-data.service';
import { DeckDataLocalService } from './local/deck-data.service';
import { DeckDataService } from './deck-data.service';
import { SettingsService } from '../../services/settings.service';

const deckDataServiceFactory = (
  settings: SettingsService,
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
  deps: [SettingsService, SharepointJsomService]
}
