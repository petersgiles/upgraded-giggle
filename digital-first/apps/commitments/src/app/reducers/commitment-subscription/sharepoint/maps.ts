import { fromLookup, idFromLookup, fromUser } from '@df/sharepoint'

export const mapCommitmentSubscription = (subscription): any =>
  [{
    id: subscription.ID,
    commitment: fromLookup(subscription.Commitment[0]),
    subscription: fromUser(subscription.Subscriber),
}]

export const mapCommitmentSubscriptions = (subscription): [] => subscription.map(mapCommitmentSubscription)
