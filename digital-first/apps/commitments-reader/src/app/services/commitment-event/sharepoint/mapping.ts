import { fromLookup } from '@df/sharepoint'
import {
  CommitmentEvent,
  CommitmentEventType,
  ExternalEvent,
  ExternalEventType
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

export const mapExternalEvent = (externalEvent, externalEventTypes: any[]) => {
  const item: any = externalEvent
  const mapped = {
    name: item.Title,
    startDate: item.StartDate,
    endDate: item.EndDate,
    cls: externalEventTypes.filter(
      e => e.ID === fromLookup(item.ExternalEventType).id
    )[0].CssClass,
    eventTypeId: fromLookup(item.ExternalEventType).id
  }
  return mapped
}

export const mapExternalEvents = (
  externalEvents,
  externalEventTypes: any[]
): ExternalEvent[] =>
  externalEvents.map((c: any) => mapExternalEvent(c, externalEventTypes))

export const mapExternalEventType = externalEventType => {
  const item: any = externalEventType
  const mapped = {
    name: item.Title,
    id: item.ID
  }
  return mapped
}

export const mapExternalEventTypes = (externalEvents): ExternalEventType[] =>
  externalEvents.map(mapExternalEventType)
