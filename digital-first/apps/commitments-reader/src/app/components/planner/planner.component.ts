import {
  Component,
  ViewChild,
  ViewEncapsulation,
  Input,
  ɵConsole
} from '@angular/core'
import { SchedulerComponent } from '../scheduler/scheduler.component'
import { MdcSliderChange } from '@angular-mdc/web'
import { DateHelper, EventModel, Store } from 'bryntum-scheduler'
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading'
import { CommitmentEventType } from '../../models/commitment-event-type'

declare var window: any
@Component({
  selector: 'digital-first-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlannerComponent {
  @Input()
  commitments: any[]

  @ViewChild(SchedulerComponent) scheduler: SchedulerComponent

  featureConfig: Object

  startDate = new Date()
  endDate = DateHelper.add(this.startDate, 3, 'year')

  //TODO: set widths based on size of parent container
  //TODO: raise request to have these internally sorted
  //TODO: infer id based on index
  zoomLevels = [
    {
      id: 0,
      label: '3 years',
      width: 140,
      increment: 1,
      resolution: 1,
      preset: 'year',
      resolutionUnit: 'day'
    },
    {
      id: 1,
      label: '1 year',
      width: 100,
      increment: 1,
      resolution: 12,
      preset: 'monthAndYear',
      resolutionUnit: 'day'
    },
    {
      id: 2,
      label: '100 days',
      width: 100,
      increment: 1,
      resolution: 1,
      preset: 'weekAndMonth',
      resolutionUnit: 'day'
    },
    {
      id: 3,
      label: 'month',
      width: 250,
      increment: 1,
      resolution: 1,
      preset: 'weekAndMonth',
      resolutionUnit: 'day'
    },
    {
      id: 4,
      label: 'fortnight',
      width: 100,
      increment: 1,
      resolution: 7,
      preset: 'weekAndDay',
      resolutionUnit: 'hour'
    },
    {
      id: 5,
      label: 'week',
      width: 200,
      increment: 1,
      resolution: 1,
      preset: 'weekAndDay',
      resolutionUnit: 'hour'
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
      width: 250,
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

  commonEventTypes: CommitmentEventType[] = [
    {
      id: '0001',
      type: 'Policy development',
      duration: 30,
      durationUnit: 'd',
      icon: ''
    },
    {
      id: '0002',
      type: 'Cabinet Meeting',
      duration: 1,
      durationUnit: 'd',
      icon: ''
    },
    {
      id: '0003',
      type: 'Drafting the Explanatory Memorandum',
      duration: 7,
      durationUnit: 'd',
      icon: ''
    },
    {
      id: '0004',
      type: 'drafting legislative',
      duration: 30,
      durationUnit: 'd',
      icon: ''
    },
    {
      id: '0005',
      type: 'Legislative introduction',
      duration: 1,
      durationUnit: 'd',
      icon: ''
    },
    {
      id: '0006',
      type: 'Announcement',
      duration: 1,
      durationUnit: 'd',
      icon: ''
    },
    {
      id: '0007',
      type: 'Review',
      duration: 90,
      durationUnit: 'd',
      icon: ''
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
    const me = this
    this.zoomSlider.min = 0
    this.zoomSlider.max = this.zoomLevels.length - 1
    this.zoomSlider.levelId = 0

    this.featureConfig = {
      timeRanges: {
        showCurrentTimeLine: true,
        showHeaderElements: false,
        enableResizing: false
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
        icon: 'b-fa b-fa-fw b-fa-document',
        onItem({ date, resourceRecord }) {
          const event = new EventModel({
            resourceId: resourceRecord.id,
            startDate: date,
            duration: e.duration,
            durationUnit: e.durationUnit,
            name: e.type,
            eventType: e.type
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
    return extraTypes;
  }
}
