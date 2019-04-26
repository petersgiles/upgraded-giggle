import { fromLookup } from '@df/sharepoint'
import {
  CommitmentEvent,
  CommitmentEventType,
  ExternalEvent
} from '../../../models/commitment-event.model'

export const mapCommitmentEvent = commitmentEvent => {
  const item: any = commitmentEvent
  const mapped = {
    id: item.ID,
    resourceId: item.CommitmentId,
    name: item.Title,
    eventType: fromLookup(item.EventType).id,
    eventColor: item.Colour,
    iconCls: item.Icon,
    eventCls: item.CssClass,
    startDate: item.StartDate,
    endDate: item.EndDate
  }
  return mapped
}

export const mapCommitmentEvents = (commitmentEvents): CommitmentEvent[] =>
  commitmentEvents.map(mapCommitmentEvent)

export const mapCommitmentEventType = commitmentEventType => {
  const item: any = commitmentEventType
  const mapped = {
    id: item.ID,
    type: item.Title,
    duration: item.Duration,
    durationUnit: item.DurationUnit,
    icon: item.Icon,
    color: item.Colour
  }
  return mapped
}

export const mapCommitmentEventTypes = (
  commitmentEventTypes
): CommitmentEventType[] => commitmentEventTypes.map(mapCommitmentEventType)

export const mapExternalEvent = externalEvent => {
  const item: any = externalEvent
  const mapped = {
    name: item.Title,
    startDate: item.StartDate,
    endDate: item.EndDate,
    cls: item.CssClass
  }
  return mapped
}

export const mapExternalEvents = (externalEvents): ExternalEvent[] =>
  externalEvents.map(mapExternalEvent)
