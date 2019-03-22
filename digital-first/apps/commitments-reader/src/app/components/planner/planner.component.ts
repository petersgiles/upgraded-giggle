import { Component, ViewChild } from '@angular/core'
import { SchedulerComponent } from '../scheduler/scheduler.component'
import { Moment } from 'moment'
import moment = require('moment')
import { DateHelper } from 'bryntum-scheduler'

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
      startDate: '2019-03-17 11:00',
      endDate: '2019-03-27 12:00',
      cls: 'striped'
    }
  ]

  // config = {
  //   features: {
  //     timeRanges: {
  //       showCurrentTimeLine: true,
  //       showHeaderElements: false,
  //       enableResizing: false
  //     }
  //   },

  // }
}
