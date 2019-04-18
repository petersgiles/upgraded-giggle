import {
  Component,
  ViewChild,
  ViewEncapsulation,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core'
import { SchedulerComponent } from '../scheduler/scheduler.component'
import { MdcSliderChange } from '@angular-mdc/web'
import { DateHelper, EventModel } from 'bryntum-scheduler/scheduler.umd.js'
import * as ZoomLevels from './data/zoomLevels.json'
import { webSafeColours } from './data/webSafeColours'

@Component({
  selector: 'digital-first-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlannerComponent implements OnInit {
  @Input()
  commitments: any[]
  @Input()
  events: any[]
  @Input()
  externalEvents: any[]
  @Input()
  commitmentEventTypes: any[]

  @Output()
  public onEventSaved: EventEmitter<any> = new EventEmitter()
  @Output()
  public onEventRemoved: EventEmitter<any> = new EventEmitter()

  @ViewChild(SchedulerComponent) scheduler: SchedulerComponent

  featureConfig: Object
  listeners: Object

  startDate = DateHelper.add(new Date(), -1, 'months')
  endDate = DateHelper.add(new Date(), 3, 'years')
  today = new Date()
  // TODO: actually get this from the next MYEFO date
  myEofyDate = new Date('2019-12-10')

  // TODO: set widths based on size of parent container
  // Setup data for scheduler

  zoomLevels = ZoomLevels
  columns = [
    {
      text: 'Commitments',
      field: 'name',
      width: 250,
      editable: true
    }
  ]
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
    this.zoomSlider.levelId = 3
    this.buildFeatureConfig(me)
    this.buildEventListeners(me)
  }

  private buildEventListeners(me: this) {
    this.listeners = {
      afterEventSave({ source, eventRecord }) {
        me.onEventSaved.emit(eventRecord.data)
      },
      beforeeventdelete({ source, eventRecord }) {
        me.onEventRemoved.emit(eventRecord.data)
      },
      zoomchange({ column, level }) {
        me.zoomSlider.levelId = level.id
        me.scheduler.schedulerEngine.setTimeSpan(me.startDate, me.endDate)
        me.scheduler.schedulerEngine.scrollToDate(me.today)
      }
    }
  }

  private buildFeatureConfig(me: this) {
    this.featureConfig = {
      timeRanges: {
        showCurrentTimeLine: true,
        showHeaderElements: false,
        enableResizing: false,
        currentDateFormat: 'D'
      },
      scheduleContextMenu: {
        // Extra items for all events
        extraItems: me.populateExtraItems(me)
      },
      eventEdit: {
        autoClose: false,
        // Add extra widgets to the event editor
        extraWidgets: [
          {
            type: 'text',
            name: 'iconCls',
            id: 'iconCls'
          },
          {
            type: 'combo',
            name: 'eventType',
            id: 'eventType',
            label: 'Type',
            index: 2,
            items: me.populateExtraEventTypes(),
            listeners: {
              select: ({ source: combo, record }) => {
                const eventType = this.commitmentEventTypes.find(
                  c => c.type === combo.value
                )
                if (eventType) {
                  const eventColor = combo.owner.widgets.find(
                    w => w.name === 'eventColor'
                  )
                  const startDate = combo.owner.widgets.find(
                    w => w.name === 'startDate'
                  )
                  const endDate = combo.owner.widgets.find(
                    w => w.name === 'endDate'
                  )
                  const iconCls = combo.owner.widgets.find(
                    w => w.name === 'iconCls'
                  )
                  const name = combo.owner.widgets.find(w => w.name === 'name')
                  name.value = eventType.type
                  record.iconCls = eventType.icon
                  eventColor.value = eventType.color
                  endDate.value = DateHelper.add(
                    startDate.value,
                    eventType.duration,
                    eventType.durationUnit
                  )
                  iconCls.value = eventType.icon
                }
              }
            }
          },
          {
            type: 'combo',
            listCls: 'b-list-colour',
            label: 'Colour',
            name: 'eventColor',
            id: 'colour',
            index: 3,
            items: webSafeColours,
            listItemTpl: item =>
              `<h5 class='colour-title ${item.value}' style='background-color:${
                item.value
              }'> ${item.text}</h5>`
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
    if (eventRecord.isMilestone) {
      tplData.cls.milestone = true
    }
    if (eventRecord.eventColor) {
      tplData.cls[eventRecord.eventColor] = true
    }
    return eventRecord.name
  }

  populateExtraItems(me: any) {
    const extraItems = []
    this.commitmentEventTypes.forEach(e => {
      extraItems.push({
        text: e.type,
        icon: e.icon,
        onItem({ date, resourceRecord }) {
          const event = new EventModel({
            id: crypto.getRandomValues(new Uint32Array(4)).join('-'),
            resourceId: resourceRecord.id,
            startDate: date,
            duration: e.duration,
            durationUnit: e.durationUnit,
            name: e.type,
            eventType: e.type,
            eventColor: e.color,
            iconCls: e.icon
          })
          ;(me.scheduler.schedulerEngine as any).editEvent(event)
        }
      })
    })
    return extraItems
  }

  populateExtraEventTypes() {
    const extraTypes = []
    this.commitmentEventTypes.forEach(c => {
      extraTypes.push(c.type)
    })
    return extraTypes
  }

  scrollToDate(date: Date) {
    this.scheduler.schedulerEngine.scrollToDate(date, { block: 'center' })
  }
}
