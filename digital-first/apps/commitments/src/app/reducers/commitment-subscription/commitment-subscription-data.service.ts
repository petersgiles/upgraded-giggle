import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { Apollo } from 'apollo-angular'
import { SettingsService } from '../../services/settings.service'
import { Observable } from 'rxjs'
import { SubscriptionResult, DataResult } from '../../models'
import { CommitmentSubscriptionDataSharePointService } from './sharepoint/commitment-subscription-data.service'
import { CommitmentSubscriptionDataApolloService } from './apollo/commitment-subscription-data.service'

@Injectable({
  providedIn: 'root'
})
export abstract class CommitmentSubscriptionDataService {
  abstract deleteSubscription(variables: { id: any; commitment: any }): Observable<DataResult<{ commitment: number }>>
  abstract storeSubscription(comment: {
    commitment: any;
    parent: any;
    comment: any;
    author: any;
  }): Observable<DataResult<{ commitment: number }>>
  abstract getSubscriptionByCommitment(commitment: any): Observable<DataResult<SubscriptionResult>>
}

const subscriptionDataServiceFactory = (settings: SettingsService, sharepointlib: SharepointJsomService, apollo: Apollo) => {

  let source = null
  if (settings.datasource) {
    source = settings.datasource.type
  }

  switch (source) {
    case 'sharepoint':
      return new CommitmentSubscriptionDataSharePointService(sharepointlib)
    default:
      return new CommitmentSubscriptionDataApolloService(apollo)
  }

}

export let subscriptionDataServiceProvider = {
  provide: CommitmentSubscriptionDataService,
  useFactory: subscriptionDataServiceFactory,
  deps: [SettingsService, SharepointJsomService, Apollo]
}
