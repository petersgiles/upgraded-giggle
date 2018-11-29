export interface CriticalDate {
  id: number
  title: string
  icon?: string
  colour?: string
}

export interface CriticalDatesResult {
  criticalDates: CriticalDate[]
}