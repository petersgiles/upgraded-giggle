import { Action } from '@ngrx/store'
import { DataResult, SubscriptionResult } from '../../models'

export enum CommitmentSubscriptionActionTypes {
  ExpandPanel = '[CommitmentSubscription] Expand Panel',
  CollapsePanel = '[CommitmentSubscription] Collapse Panel',
  LoadSubscriptions = '[CommitmentSubscription] Load Subscriptions',
  GetSubscriptionsByCommitment = '[CommitmentSubscription] Get Subscriptions By Commitment',
  SubscriptionActionFailure = '[CommitmentSubscription] Subscription  Action Failure',
  SubscribeToCommitment = '[CommitmentSubscription] Add Subscription',
  UnsubscribeFromCommitment = '[CommitmentSubscription] Remove Subscription',
}

export class CollapsePanel implements Action {
  readonly type = CommitmentSubscriptionActionTypes.CollapsePanel
}

export class ExpandPanel implements Action {
  readonly type = CommitmentSubscriptionActionTypes.ExpandPanel
}

export class LoadSubscriptions implements Action {
  readonly type = CommitmentSubscriptionActionTypes.LoadSubscriptions

  constructor(public payload: DataResult<SubscriptionResult>) {}
}
export class GetSubscriptionsByCommitment implements Action {
  readonly type = CommitmentSubscriptionActionTypes.GetSubscriptionsByCommitment
  constructor(public payload: { commitment: number }) {}
}

export class SubscribeToCommitment implements Action {
  readonly type = CommitmentSubscriptionActionTypes.SubscribeToCommitment

  constructor(public payload: { commitment: string | number, user: any}) {}
}
export class UnsubscribeFromCommitment implements Action {
  readonly type = CommitmentSubscriptionActionTypes.UnsubscribeFromCommitment

  constructor(public payload: {commitment: string | number, user?: any}) {}
}

export class SubscriptionActionFailure implements Action {
  readonly type = CommitmentSubscriptionActionTypes.SubscriptionActionFailure

  constructor(public payload: any) {
  }
}

export type CommitmentSubscriptionActions =
    CollapsePanel
  | ExpandPanel
  | LoadSubscriptions
  | GetSubscriptionsByCommitment
  | SubscriptionActionFailure
  | SubscribeToCommitment
  | UnsubscribeFromCommitment
