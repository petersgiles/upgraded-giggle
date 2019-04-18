import {
  CommitmentEvent,
  CommitmentEventType,
  ExternalEvent
} from '../../models/commitment-event.model'
import { fromLookup } from '@df/sharepoint'

export const mapCommitmentEvent = commitmentEvent => {
  const item: any = commitmentEvent

  const mapped = {}
  return mapped
}

export const mapCommitmentEvents = commitmentEvents => {
  commitmentEvents.map(mapCommitmentEvent)
}
