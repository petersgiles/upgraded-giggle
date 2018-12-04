import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { callQuery, callMutate } from '../../../services/apollo/apollo-helpers'
import { DataResult, ContactsResult, CommitmentActionsResult } from '../../../models'
import { CommitmentActionDataService } from '../commitment-action-data.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CommitmentActionDataApolloService implements CommitmentActionDataService {
  removeActionFromCommitment(payload: any): Observable<DataResult<{ commitment: number; }>> {
    throw new Error('Method not implemented.')
  }
  addActionToCommitment(payload: any): Observable<DataResult<{ commitment: number; }>> {
    throw new Error('Method not implemented.')
  }
  getActionsByCommitment(commitment: any): Observable<DataResult<CommitmentActionsResult>> {
    throw new Error('Method not implemented.')
  }

  constructor(private apollo: Apollo) { }
}
