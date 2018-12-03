import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { Apollo } from 'apollo-angular'
import { SettingsService } from '../../services/settings.service'
import { Observable } from 'rxjs'
import { CommentsResult, DataResult, ContactsResult } from '../../models'
import { CommitmentContactDataSharePointService } from './sharepoint/commitment-contact-data.service'
import { CommitmentContactDataApolloService } from './apollo/commitment-contact-data.service'

@Injectable({
  providedIn: 'root'
})
export abstract class CommitmentContactDataService {
  abstract getContactsByCommitment(commitment: any): Observable<DataResult<ContactsResult>>
  abstract addContactToCommitment(variables: { commitment: any, contact: any })
  abstract removeContactFromCommitment(variables: { id: any })
}

const commitmentContactsDataServiceFactory = (settings: SettingsService, sharepointlib: SharepointJsomService, apollo: Apollo) => {

  let source = null
  if (settings.datasource) {
    source = settings.datasource.type
  }

  switch (source) {
    case 'sharepoint':
      return new CommitmentContactDataSharePointService(sharepointlib)
    default:
      return new CommitmentContactDataApolloService(apollo)
  }

}

export let commitmentContactsDataServiceProvider = {
  provide: CommitmentContactDataService,
  useFactory: commitmentContactsDataServiceFactory,
  deps: [SettingsService, SharepointJsomService, Apollo]
}