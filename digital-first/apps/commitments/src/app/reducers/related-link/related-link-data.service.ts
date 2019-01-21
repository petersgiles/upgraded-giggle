import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { Apollo } from 'apollo-angular'
import { SettingsService } from '../../services/settings.service'
import { Observable } from 'rxjs'
import {  DataResult, RelatedLinksResult } from '../../models'
import { RelatedLinkDataSharePointService } from './sharepoint/related-link-data.service'
import { RelatedLinkDataApolloService } from './apollo/related-link-data.service'

@Injectable({
  providedIn: 'root'
})
export abstract class RelatedLinkDataService {
  abstract removeItemFromCommitment(payload: any): Observable<DataResult<{ commitment: number }>>
  abstract addItemToCommitment(payload: any): Observable<DataResult<{ commitment: number }>>
  abstract getItemsByCommitment(commitment: any): Observable<DataResult<RelatedLinksResult>>
}

const relatedLinksDataServiceFactory = (settings: SettingsService, sharepointlib: SharepointJsomService, apollo: Apollo) => {

  let source = null
  if (settings.datasource) {
    source = settings.datasource.type
  }

  switch (source) {
    case 'sharepoint':
      return new RelatedLinkDataSharePointService(sharepointlib)
    default:
      return new RelatedLinkDataApolloService(apollo)
  }

}

export let relatedLinksDataServiceProvider = {
  provide: RelatedLinkDataService,
  useFactory: relatedLinksDataServiceFactory,
  deps: [SettingsService, SharepointJsomService, Apollo]
}