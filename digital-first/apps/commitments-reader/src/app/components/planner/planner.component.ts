import { Component, ViewChild } from '@angular/core'
import {SchedulerComponent} from "../scheduler/scheduler.component";

@Component({
  selector: 'digital-first-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss']
})
export class PlannerComponent {
  @ViewChild(SchedulerComponent) scheduler: SchedulerComponent;

  events = [
    { id : 1, name : 'First event', startDate : new Date(2018, 8, 27), duration : 1 },
  ];
  
  resources = [
    { id : 1, name : 'First resource' },
  ];
  
  startDate = new Date(2018, 1, 7, 8);
  endDate = new Date(2018, 1, 7, 19);
}
