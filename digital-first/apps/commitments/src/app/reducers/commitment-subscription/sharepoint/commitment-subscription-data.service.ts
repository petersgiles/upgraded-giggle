import { Injectable } from '@angular/core'
import { SharepointJsomService } from '@digital-first/df-sharepoint'
import { Observable, of } from 'rxjs'
import { SubscriptionResult, DataResult } from '../../../models'
import { concatMap, tap, map } from 'rxjs/operators'
import { byCommitmentIdQuery, byJoinTableQuery } from '../../../services/sharepoint/caml'
import { mapSubscription, mapSubscriptions } from './maps'
import { CommitmentSubscriptionDataService } from '../commitment-subscription-data.service'
import { AppUserProfile } from '@digital-first/df-layouts'

@Injectable({
  providedIn: 'root'
})
export class CommitmentSubscriptionDataSharePointService implements CommitmentSubscriptionDataService {

  unsubscribeFromCommitment(payload: any): Observable<any> {

    const LISTNAME = 'CommitmentSubscription'

    const viewXml = byJoinTableQuery({ fieldA: { name: 'Commitment', id: payload.commitment }, fieldB: { name: 'Subscriber', id: payload.user.userid } })

    return this.sharepoint.getItems({
      listName: LISTNAME,
      viewXml: viewXml
    }).pipe(
      map(result => result[0]),
      concatMap((result: any) =>
        this.sharepoint.removeItem({
          listName: LISTNAME,
          id: result.ID,
        }).pipe(
          concatMap(_ =>
            of({ commitment: { id: payload.commitment } }))

        )))
  }

  subscribeToCommitment(payload: any): Observable<any> {
    const LISTNAME = 'CommitmentSubscription'

    const subscriptionItem = {
      Title: payload.commitment,
      Subscriber: payload.user.userid,
      Commitment: payload.commitment
    }

    return this.sharepoint.storeItem({
      listName: LISTNAME,
      data: subscriptionItem
    }).pipe(
      concatMap(_ =>
        of({ commitment: { id: payload.commitment } }))
    )
  }

  getCurrentUser(): Observable<AppUserProfile> {
    return this.sharepoint.getCurrentUser()
  }

  constructor(private sharepoint: SharepointJsomService) { }
}
