import { Component, ViewChild, ViewEncapsulation, Input } from '@angular/core'
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
  @Input() 
  commitments:any[]

  @ViewChild(SchedulerComponent) scheduler: SchedulerComponent

  featureConfig: Object

  startDate = new Date()
  endDate = DateHelper.add(this.startDate, 100, 'day')

  //TODO: set widths based on size of parent container
  //TODO: raise request to have these internally sorted
  //TODO: infer id based on index
  zoomLevels = [
    {
      id: 0,
      label: '3 years',
      width: 100,
      increment: 1,
      resolution: 1,
      preset: 'year',
      resolutionUnit: 'year'
    },
    {
      id: 1,
      label: '1 year',
      width: 100,
      increment: 1,
      resolution: 12,
      preset: 'monthAndYear',
      resolutionUnit: 'month'
    },
    {
      id: 2,
      label: '100 days',
      width: 100,
      increment: 1,
      resolution: 1,
      preset: 'weekAndMonth',
      resolutionUnit: 'month'
    },
    {
      id: 3,
      label: 'month',
      width: 250,
      increment: 1,
      resolution: 1,
      preset: 'weekAndMonth',
      resolutionUnit: 'week'
    },
    {
      id: 4,
      label: 'fortnight',
      width: 100,
      increment: 1,
      resolution: 7,
      preset: 'weekAndDay',
      resolutionUnit: 'day'
    },
    {
      id: 5,
      label: 'week',
      width: 200,
      increment: 1,
      resolution: 1,
      preset: 'weekAndDay',
      resolutionUnit: 'day'
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

  //TODO: type or componentize
  zoomSlider: any = {}

  get currentZoomLevel() {
    return (
      this.zoomLevels &&
      this.zoomSlider &&
      this.zoomLevels.find(_ => _.id === this.zoomSlider.levelId)
    )
  }

  ngOnInit() {
    this.zoomSlider.min = 0
    this.zoomSlider.max = this.zoomLevels.length - 1
    this.zoomSlider.levelId = 0

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
    console.log(event)
    this.zoomSlider.levelId = event.value
  }

  eventRenderer({ eventRecord, tplData }) {
    // Add a custom CSS classes to the template element data by setting a property name
    tplData.cls.milestone = eventRecord.isMilestone
    return eventRecord.name
  }

  handleEvent(event: Event) {
    switch (event.type) {
      case 'zoomchange':
        const level: any = (event as any).level
        this.zoomSlider.levelId = level.id
    }
  }
}
