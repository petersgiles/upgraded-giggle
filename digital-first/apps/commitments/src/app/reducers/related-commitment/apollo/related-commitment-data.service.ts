import { LoggerService } from '@digital-first/df-logging'
import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { callQuery, callMutate } from '../../../services/apollo/apollo-helpers'
import { RelatedCommitmentsResult } from '../../../models'
import { RelatedCommitmentDataService } from '../related-commitment-data.service'
import { STORE_RELATED_COMMITMENT, REMOVE_RELATED_COMMITMENT, RELATED_COMMITMENTS_BY_COMMITMENT } from './queries'

@Injectable({
  providedIn: 'root'
})
export class RelatedCommitmentDataApolloService implements RelatedCommitmentDataService {

  addItemToCommitment = (variables: { commitment: any, relatedTo: any }) => callMutate<any>(this.apollo,
    { mutation: STORE_RELATED_COMMITMENT, variables: { ...variables } },
    (result: any) => ({ commitment: result.data.storeRelatedCommitment })
  )

  removeItemFromCommitment = (variables: { relatedTo: any }) => callMutate<any>(this.apollo,
    { mutation: REMOVE_RELATED_COMMITMENT, variables: { ...variables } },
    (result: any) => ({ commitment: result.data.deleteRelatedCommitment })
  )

  getItemsByCommitment = (commitment: any) => callQuery<RelatedCommitmentsResult>(this.apollo, { query: RELATED_COMMITMENTS_BY_COMMITMENT, variables: { commitment: commitment } })

  constructor(private apollo: Apollo, private logger: LoggerService) { }
}
