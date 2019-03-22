import { Component, ViewChild } from '@angular/core'
import { SchedulerComponent } from '../scheduler/scheduler.component'
import { Moment } from 'moment'
import moment = require('moment')

@Component({
  selector: 'digital-first-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss']
})
export class PlannerComponent {
  @ViewChild(SchedulerComponent) scheduler: SchedulerComponent

  events = [
    {
      id: 1,
      name: 'First event',
      startDate: new Date(),
      duration: 1
    }
  ]

  resources = [
    { id: 1, name: 'Commitment A' },
    { id: 2, name: 'Commitment B' },
    { id: 3, name: 'Commitment C' }
  ]

  startDate = new Date()
  endDate = new Date(2019, 5, 7, 0)

  columns = [
    {
      text: 'Commitments',
      field: 'name',
      editable: false
    }
  ]

  featureConfig = {
    timeRanges: {
      showCurrentTimeLine: true,
      showHeaderElements: false,
      enableResizing: false
    }
  }
  timeRanges = [
    {
      name: 'Both sitting',
      startDate: '2019-04-02 00:00',
      duration: 2,
      cls: 'timerange-sitting-both'
    },
    {
      name: 'House sitting',
      startDate: '2019-04-04 00:00',
      duration: 1,
      cls: 'timerange-sitting-house'
    },
    {
      name: 'House sitting',
      startDate: '2019-04-15 00:00',
      endDate: '2019-04-18 0:00',
      cls: 'timerange-sitting-house'
    },
    {
      name: 'International travel',
      startDate: '2019-04-19 00:00',
      endDate: '2019-04-21 0:00',
      cls: 'timerange-sitting-senate'
    },
    {
      name: 'State election',
      startDate: '2019-04-22 00:00'
    }
  ]
}
