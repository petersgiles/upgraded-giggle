import { LoggerService } from '@digital-first/df-logging'
import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { callQuery, callMutate } from '../../../services/apollo/apollo-helpers'
import { DataResult, ContactsResult, CommitmentActionsResult, RelatedLinksResult } from '../../../models'
import { RelatedLinkDataService } from '../related-link-data.service'
import { Observable } from 'rxjs'
import { STORE_RELATED_LINK, REMOVE_RELATED_LINK, RELATED_LINKS_BY_COMMITMENT } from './queries'

@Injectable({
  providedIn: 'root'
})
export class RelatedLinkDataApolloService implements RelatedLinkDataService {

  addItemToCommitment = (variables: { commitment: any, relatedTo: any }) => callMutate<any>(this.apollo,
    { mutation: STORE_RELATED_LINK, variables: { ...variables } },
    (result: any) => ({ commitment: result.data.storeRelatedLink })
  )

  removeItemFromCommitment = (variables: { id: any }) => callMutate<any>(this.apollo,
    { mutation: REMOVE_RELATED_LINK, variables: { ...variables } },
    (result: any) => ({ commitment: result.data.deleteRelatedLink })
  )

  getItemsByCommitment = (commitment: any) => callQuery<RelatedLinksResult>(this.apollo, { query: RELATED_LINKS_BY_COMMITMENT, variables: { commitment: commitment } })

  constructor(private apollo: Apollo, private logger: LoggerService) { }

}
