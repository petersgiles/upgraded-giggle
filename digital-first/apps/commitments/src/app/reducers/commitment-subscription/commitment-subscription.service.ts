import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { Subscription } from './subscription.model'

import * as fromRoot from '..'
import {
  CollapsePanel,
  ExpandPanel,
  LoadSubscriptions,
  GetSubscriptionsByCommitment,
  SubscriptionActionFailure,
  SubscribeToCommitment,
  UnsubscribeFromCommitment
} from './commitment-subscription.actions'

@Injectable({
  providedIn: 'root'
})
export class CommitmentSubscriptionService {
  constructor(private store: Store<fromRoot.State>) {}

  get Notification(): Observable<string> {
    return this.store.pipe(select(fromRoot.getNotification))
  }

  getCurrentUser(): Observable<any> {
    return this.store.pipe(select(fromRoot.getCurrentUserProfile))
  }

  get Expanded(): Observable<boolean> {
    return this.store.pipe(
      select(fromRoot.getCommitmentSubscriptionPanelExpanded)
    )
  }

  getSubscriptionByCommitment(commitment: number): any {
    this.store.dispatch(
      new GetSubscriptionsByCommitment({ commitment: commitment })
    )
  }

  get Subscriptions(): Observable<Comment[]> {
    return this.store.pipe(select(fromRoot.getCurrentCommitmentSubscription))
  }

  get SubscriptionLoading(): Observable<boolean> {
    return this.store.pipe(select(fromRoot.getSubscriptionCommentLoading))
  }

  get SubscriptionError(): Observable<any> {
    return this.store.pipe(select(fromRoot.getSubscriptionCommentError))
  }

  unsubscribeFromCommitment(subscription: { commitment: string | number, user?: any }): any {
    this.store.dispatch(new UnsubscribeFromCommitment(subscription))
  }

  expandPanel() {
    this.store.dispatch(new ExpandPanel())
  }
  collapsePanel() {
    this.store.dispatch(new CollapsePanel())
  }
}
