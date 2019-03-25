import { Component, ViewChild, ViewEncapsulation } from '@angular/core'
import { SchedulerComponent } from '../scheduler/scheduler.component'
import { Moment } from 'moment'
import moment = require('moment')
import { MdcSliderChange } from '@angular-mdc/web'
import { DateHelper, EventModel } from 'bryntum-scheduler'

@Component({
  selector: 'digital-first-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlannerComponent {
  @ViewChild(SchedulerComponent) scheduler: SchedulerComponent

  featureConfig: Object

  startDate = new Date()
  endDate = DateHelper.add(this.startDate, 100, 'day')
  viewPreset = 'weekDateAndMonth'
  currentZoomView: string = '100 days'

  zoomLevelViews = [
    {
      level: 1,
      view: '3 Years',
      startDate: this.startDate,
      endDate: DateHelper.add(this.startDate, 3, 'year'),
      viewPreset: 'monthAndYear'
    },
    {
      level: 2,
      view: '1 Year',
      startDate: this.startDate,
      endDate: DateHelper.add(this.startDate, 1, 'year'),
      viewPreset: 'weekDateAndMonth'
    },
    {
      level: 3,
      view: '100 Days',
      startDate: this.startDate,
      endDate: DateHelper.add(this.startDate, 100, 'day'),
      viewPreset: 'weekDateAndMonth'
    },
    {
      level: 4,
      view: '1 Month',
      startDate: this.startDate,
      endDate: DateHelper.add(this.startDate, 31, 'day'),
      viewPreset: 'weekDateAndMonth'
    },
    {
      level: 5,
      view: '1 Week',
      startDate: this.startDate,
      endDate: DateHelper.add(this.startDate, 7, 'day'),
      viewPreset: 'dayAndWeek'
    }
  ]

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

  ngOnInit() {
    const scheduler: any = this.scheduler.schedulerEngine
    this.featureConfig = {
      timeRanges: {
        showCurrentTimeLine: true,
        showHeaderElements: false,
        enableResizing: false
      },
      scheduleContextMenu: {
        // Extra items for all events
        extraItems: [
          {
            text: 'Extra',
            icon: 'b-fa b-fa-fw b-fa-flag',
            onItem({ date, resourceRecord, items }) {
              console.log(date, resourceRecord, items)
              // Custom date based action

              const event = new EventModel({
                startDate: new Date(),
                duration: 1,
                name: 'New task'
              })
              scheduler.editEvent(event, resourceRecord)
            }
          }
        ]
      },
      eventEdit: {
        // Add extra widgets to the event editor
        extraWidgets: [
          {
            type: 'text',
            name: 'location',
            label: 'Location',
            index: 1
            // This field is only displayed for meetings
          },
          {
            type: 'combo',
            name: 'eventType',
            label: 'Type',
            index: 2,
            items: ['Appointment', 'Internal', 'Meeting']
          }
        ]
      }
    }
  }

  onSliderInput(event: MdcSliderChange): void {
    this.resetSchedulerZoomLevel(event)
  }

  private resetSchedulerZoomLevel(event: MdcSliderChange) {
    this.zoomLevelViews.forEach(lv => {
      if (lv.level === event.value) {
        this.currentZoomView = lv.view
        this.scheduler.schedulerEngine.viewPreset = lv.viewPreset
        this.scheduler.schedulerEngine.setTimeSpan(this.startDate, lv.endDate)
      }
    })
  }

  eventRenderer({ eventRecord, tplData }) {
    // Add a custom CSS classes to the template element data by setting a property name
    tplData.cls.milestone = eventRecord.isMilestone
    return eventRecord.name
  }
}
