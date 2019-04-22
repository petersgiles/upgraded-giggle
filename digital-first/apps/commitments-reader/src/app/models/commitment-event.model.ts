export interface CommitmentEvent {
  id: string
  resourceId: string  // to match Bryntum Scheduler name convention
  name: string
  eventType: string
  eventColor: string
  iconCls: string
  eventCls: string
  startDate: Date
  endDate: Date
}

export interface CommitmentEventType {
  id: string
  type: string
  duration: number
  durationUnit: string
  icon: string
  color: string
}

export interface ExternalEvent {
  name: string
  startDate: Date
  endDate: Date
  cssClass: string
}
