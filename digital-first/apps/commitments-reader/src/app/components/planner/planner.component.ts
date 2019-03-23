import { Component, ViewChild, ViewEncapsulation } from '@angular/core'
import { SchedulerComponent } from '../scheduler/scheduler.component'
import { Moment } from 'moment'
import moment = require('moment')
import { MdcSliderChange } from '@angular-mdc/web';
import { DateHelper } from 'bryntum-scheduler';

@Component({
  selector: 'digital-first-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlannerComponent {
  @ViewChild(SchedulerComponent) scheduler: SchedulerComponent

  startDate = new Date()
  endDate = DateHelper.add(this.startDate,100,"day");
  viewPreset = "weekDateAndMonth";
  currentZoomView:string="100 days";

  zoomLevelViews=[
          {level:1,view:"3 year", startDate:this.startDate,endDate:DateHelper.add(this.startDate,3,"year"),viewPreset:"monthAndYear"},
          {level:2,view:"1 year",startDate:this.startDate,endDate:DateHelper.add(this.startDate,1,"year"),viewPreset:"weekDateAndMonth"},
          {level:3,view:"100 days",startDate:this.startDate,endDate:DateHelper.add(this.startDate,100,"day"),viewPreset:"weekDateAndMonth"},
          {level:4,view:"1 month",startDate:this.startDate,endDate:DateHelper.add(this.startDate,1,"month"),viewPreset:"dayAndWeek"},
          {level:5, view:"1 week",startDate:this.startDate,endDate:DateHelper.add(this.startDate,7,"day"),viewPreset:"dayAndWeek"}
        ]
  //  zoomLevels: [
  //         { width: 40,    increment: 5,   resolution: 60, preset: 'dayAndWeek', resolutionUnit: 'day' },     
  //         { width: 50,    increment: 4,   resolution: 60, preset: 'dayAndWeek', resolutionUnit: 'day' },
  //         { width: 60,    increment: 3,   resolution: 60, preset: 'weekDateAndMonth', resolutionUnit: 'day' },
  //         { width: 80,    increment: 2,   resolution: 30, preset: 'weekDateAndMonth', resolutionUnit: 'day' },
  //         { width: 100,   increment: 1,   resolution: 15, preset: 'monthAndYear', resolutionUnit: 'day' }
      // ]
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
      startDate: '2019-04-02',
      duration: 2,
      cls: 'timerange-sitting-both'
    },
    {
      name: 'House sitting',
      startDate: '2019-04-04',
      duration: 1,
      cls: 'timerange-sitting-house'
    },
    {
      name: 'House sitting',
      startDate: '2019-04-15',
      endDate: '2019-04-19',
      cls: 'timerange-sitting-house'
    },
    {
      name: 'State election',
      startDate: '2019-04-22'
    }
  ]

onSliderInput(event: MdcSliderChange): void {
 this.resetSchedulerZoomLevel(event);
 console.log( this.scheduler.schedulerEngine.startDate);
  }

private resetSchedulerZoomLevel(event: MdcSliderChange) {
    this.zoomLevelViews.forEach(lv => {
      if (lv.level === event.value) {
        this.currentZoomView = lv.view;
        this.endDate = lv.endDate;
        this.viewPreset = lv.viewPreset;
      }
    });
  }

  eventRenderer({ eventRecord, tplData }) {
    // Add a custom CSS classes to the template element data by setting a property name
    tplData.cls.milestone = eventRecord.isMilestone
    return eventRecord.name
  }
}
