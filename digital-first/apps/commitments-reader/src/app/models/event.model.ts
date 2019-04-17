export interface Event {
  id: string
  commitmentId: string
  name: string
  eventType: string
  eventColor: string
  iconCls: string
  eventCls: string
  startDate: Date
  endDate: Date
  durationUnit: string
}

export interface EventType {
  id: string
  type: string
  duration: number
  durationUnit: string
  icon: string
  color: string
}

export interface TimeRange {
  name: string
  startDate: Date
  duration: number
  cssClass: string
}
