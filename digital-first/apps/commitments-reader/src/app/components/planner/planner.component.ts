import { Component, ViewChild, ModuleWithComponentFactories } from '@angular/core'
import { SchedulerComponent } from '../scheduler/scheduler.component'
import{ Moment} from 'moment'
import moment = require('moment');
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
}
