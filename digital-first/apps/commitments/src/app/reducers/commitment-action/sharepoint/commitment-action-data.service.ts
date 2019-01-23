import { Injectable } from '@angular/core'
import { SharepointJsomService, idFromLookup } from '@digital-first/df-sharepoint'
import { CommitmentActionDataService } from '../commitment-action-data.service'
import { Observable, of } from 'rxjs'
import { DataResult, CommitmentActionsResult } from '../../../models'
import { concatMap, map, tap } from 'rxjs/operators'
import { byCommitmentIdQuery, byJoinTableQuery } from '../../../services/sharepoint/caml'
import { mapCommitmentActions, mapCommitmentAction } from './maps'
import { LoggerService } from '@digital-first/df-logging'

@Injectable({
    providedIn: 'root'
})
export class CommitmentActionDataSharePointService implements CommitmentActionDataService {
    removeActionFromCommitment(variables: any): Observable<DataResult<{ commitment: number; }>> {
        const viewXml = byJoinTableQuery({ fieldA: { name: 'Commitment', id: variables.commitment }, fieldB: { name: 'ID', id: variables.action } })

        return this.sharepoint.getItems({
            listName: 'CommitmentAction',
            viewXml: viewXml
        }).pipe(
            map(mapCommitmentActions),
            map(result => result[0]),
            concatMap(result =>
                this.sharepoint.removeItem({
                    listName: 'CommitmentAction', id: result.id
                }).pipe(
                    concatMap(_ =>
                        of({
                            loading: false,
                            data: {
                                commitment: result.commitment
                            }
                        }))
                )
            )
        )
    }
    addActionToCommitment(payload: any): Observable<DataResult<{ commitment: number; }>> {
        const spComment = {
            Title: `${payload.commitment} ${payload.action.id}`,
            Commitment: payload.commitment,
            Portfolio: payload.action.portfolio,
            Description: payload.action.description
        }

        return this.sharepoint.storeItem({
            listName: 'CommitmentAction',
            data: spComment,
            id: payload.action.id
        }).pipe(
            map(mapCommitmentAction),
            concatMap((result: any) =>
                of({
                    data: { commitment: result.commitment },
                    loading: false
                }))
        )
    }
    getActionsByCommitment(commitment: any): Observable<DataResult<CommitmentActionsResult>> {
        return this.sharepoint.getItems({
            listName: 'CommitmentAction',
            viewXml: byCommitmentIdQuery({ id: commitment })
        }).pipe(
            tap(r => this.logger.info(r)),
            concatMap((result: any) =>
                of({
                    data: { commitmentActions: mapCommitmentActions(result) },
                    loading: false
                }))
        )
    }

    constructor(private sharepoint: SharepointJsomService, private logger: LoggerService) { }
}
