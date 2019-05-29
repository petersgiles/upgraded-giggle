import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@df/sharepoint'
import { Apollo } from 'apollo-angular'
import { SettingsService } from '../../services/settings.service'
import { Observable } from 'rxjs'
import {  DataResult, RelatedCommitmentsResult } from '../../models'
import { RelatedCommitmentDataSharePointService } from './sharepoint/related-commitment-data.service'
import { RelatedCommitmentDataApolloService } from './apollo/related-commitment-data.service'


@Injectable({
  providedIn: 'root'
})
export abstract class RelatedCommitmentDataService {
  abstract removeItemFromCommitment(payload: any): Observable<DataResult<{ commitment: number }>>
  abstract addItemToCommitment(payload: any): Observable<DataResult<{ commitment: number }>>
  abstract getItemsByCommitment(commitment: any): Observable<DataResult<RelatedCommitmentsResult>>
}

const relatedCommitmentsDataServiceFactory = (settings: SettingsService, sharepointlib: SharepointJsomService, apollo: Apollo) => {

  let source = null
  if (settings.datasource) {
    source = settings.datasource.type
  }

  switch (source) {
    case 'sharepoint':
      return new RelatedCommitmentDataSharePointService(sharepointlib)
    default:
      return new RelatedCommitmentDataApolloService(apollo)
  }

}

export let relatedCommitmentsDataServiceProvider = {
  provide: RelatedCommitmentDataService,
  useFactory: relatedCommitmentsDataServiceFactory,
  deps: [SettingsService, SharepointJsomService, Apollo]
}
