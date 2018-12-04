import { Injectable } from '@angular/core'
import { SharepointJsomService, idFromLookup } from '@digital-first/df-sharepoint'
import { CommitmentActionDataService } from '../commitment-action-data.service'
import { Observable, of } from 'rxjs'
import { DataResult, ContactsResult, CommitmentActionsResult } from '../../../models'
import { concatMap, map } from 'rxjs/operators'
import { byIdQuery, byJoinTableQuery, byCommitmentIdQuery } from '../../../services/sharepoint/caml'
import { mapCommitmentActions } from './maps'

@Injectable({
    providedIn: 'root'
})
export class CommitmentActionDataSharePointService implements CommitmentActionDataService {
    removeActionFromCommitment(payload: any): Observable<DataResult<{ commitment: number; }>> {
        throw new Error('Method not implemented.')
    }
    addActionToCommitment(payload: any): Observable<DataResult<{ commitment: number; }>> {
        throw new Error('Method not implemented.')
    }
    getActionsByCommitment(commitment: any): Observable<DataResult<CommitmentActionsResult>> {
        throw new Error('Method not implemented.')
    }

    constructor(private sharepoint: SharepointJsomService) { }
}
