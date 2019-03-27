import {
  Component,
  ViewChild,
  ViewEncapsulation,
  Input,
  ɵConsole,
  OnInit
} from '@angular/core'
import { SchedulerComponent } from '../scheduler/scheduler.component'
import { MdcSliderChange } from '@angular-mdc/web'
import { DateHelper, EventModel, Store } from 'bryntum-scheduler'
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading'
import { CommitmentEventType } from '../../models/commitment-event-type'
import * as CommonEventTypes from './data/eventTypes.json'
import * as ZoomLevels from './data/zoomLevels.json'
import * as timeRanges from './data/timeRanges.json'

declare var window: any

@Component({
  selector: 'digital-first-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlannerComponent implements OnInit {
  @Input()
  commitments: any[]

  @ViewChild(SchedulerComponent) scheduler: SchedulerComponent

  featureConfig: Object

  startDate = new Date()
  endDate = DateHelper.add(this.startDate, 3, 'year')
  myEofyDate =DateHelper.add(this.startDate, 3, 'month')
  // TODO: set widths based on size of parent container
  // TODO: raise request to have these internally sorted
  // TODO: infer id based on index

  // Setup data for scheduler
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
      width: 250,
      editable: false
    }
  ]
  timeRanges = timeRanges
  zoomLevels = ZoomLevels
  commonEventTypes = CommonEventTypes

  zoomSlider: any = {}

  get currentZoomLevel() {
    return (
      this.zoomLevels &&
      this.zoomSlider &&
      this.zoomLevels.find(_ => _.id === this.zoomSlider.levelId)
    )
  }

  ngOnInit() {
    const me = this
    this.zoomSlider.min = 0
    this.zoomSlider.max = this.zoomLevels.length - 1
    this.zoomSlider.levelId = 0

    this.featureConfig = {
      timeRanges: {
        showCurrentTimeLine: true,
        showHeaderElements: false,
        enableResizing: false,
        currentDateFormat:"D"
      },
      scheduleContextMenu: {
        // Extra items for all events
        extraItems: me.populateExtraItems(me)
      },
      eventEdit: {
        // Add extra widgets to the event editor
        extraWidgets: [
          {
            type: 'combo',
            name: 'eventType',
            id: 'eventType',
            label: 'Type',
            index: 2,
            items: me.populateExtraEventTypes()
          }
        ]
      }
    }
  }

  onSliderInput(event: MdcSliderChange): void {
    this.resetSchedulerZoomLevel(event)
  }

  private resetSchedulerZoomLevel(event: MdcSliderChange) {
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
        console.log(level.id)
    }
  }

  populateExtraItems(me: any) {
    let extraItems = []
    this.commonEventTypes.forEach(e => {
      extraItems.push({
        text: e.type,
        icon: e.icon,
        onItem({ date, resourceRecord }) {
          const event = new EventModel({
            resourceId: resourceRecord.id,
            startDate: date,
            duration: e.duration,
            durationUnit: e.durationUnit,
            name: e.type,
            eventType: e.type,
            eventColor: e.color
          })
          ;(me.scheduler.schedulerEngine as any).editEvent(event)
        }
      })
    })
    return extraItems
  }

  populateExtraEventTypes() {
    let extraTypes = []
    this.commonEventTypes.forEach(c => {
      extraTypes.push(c.type)
    })
    return extraTypes
  }

  scrollToDate(date: Date) {
    // this.scheduler.schedulerEngine.zoomTo(5)
    this.scheduler.schedulerEngine.scrollToDate(date,{block:"center"})
  }
}
