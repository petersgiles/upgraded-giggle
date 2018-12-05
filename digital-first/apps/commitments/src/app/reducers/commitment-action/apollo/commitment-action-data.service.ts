import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { callQuery, callMutate } from '../../../services/apollo/apollo-helpers'
import { DataResult, ContactsResult, CommitmentActionsResult } from '../../../models'
import { CommitmentActionDataService } from '../commitment-action-data.service'
import { Observable } from 'rxjs'
import { GET_COMMITMENT_ACTIONS, REMOVE_COMMITMENT_ACTION } from './queries'

@Injectable({
  providedIn: 'root'
})
export class CommitmentActionDataApolloService implements CommitmentActionDataService {

  removeActionFromCommitment = (variables: { commitment: any, contact: any }): Observable<DataResult<{ commitment: number }>> =>
    callMutate<any>(this.apollo,
      { mutation: REMOVE_COMMITMENT_ACTION, variables: { ...variables } },
      (result: any) => ({ data: { commitment: result.data.deleteCommitmentAction.id } })
  )
  addActionToCommitment(payload: any): Observable<DataResult<{ commitment: number; }>> {
    throw new Error('Method not implemented.')
  }
  getActionsByCommitment = (commitment: any): Observable<DataResult<CommitmentActionsResult>> =>
  callQuery<CommitmentActionsResult>(this.apollo, { query: GET_COMMITMENT_ACTIONS, variables: { commitment: commitment } }
    , result => ({ data: { commitmentActions: result.data.commitmentActions } })
  )

  constructor(private apollo: Apollo) { }
}
