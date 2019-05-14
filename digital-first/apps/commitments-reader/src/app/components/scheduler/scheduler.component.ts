import {
  Component,
  OnInit,
  OnChanges,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnDestroy
} from '@angular/core'

import { Scheduler } from 'bryntum-scheduler/scheduler.umd.js'
import * as AuLocael from '../../../../../commitments-reader/src/app/components/scheduler/Au.locale.en.min.js'
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'scheduler',
  template: '<div></div>'
})
export class SchedulerComponent implements OnInit, OnChanges, OnDestroy {
  ngOnDestroy(): void {
    this.schedulerEngine.destroy()
  }

  private elementRef: ElementRef
  public schedulerEngine: Scheduler

  // Available features
  private featureInputs = [
    'cellEdit',
    'cellTooltip',
    'columnLines',
    'columnPicker',
    'columnReorder',
    'columnResize',
    'contextMenu',
    'dependencies',
    'eventDrag',
    'eventContextMenu',
    'eventDragCreate',
    'eventEdit',
    'eventFilter',
    'eventResize',
    'eventTooltip',
    'filter',
    'filterBar',
    'group',
    'groupSummary',
    'headerContextMenu',
    'labels',
    'nonWorkingTime',
    'regionResize',
    'search',
    'scheduleTooltip',
    'sort',
    'stripe',
    'summary',
    'timeRanges',
    'tree'
  ]

  // Available configs
  private configInputs = [
    'autoHeight',
    'barMargin',
    'columns',
    'emptyText',
    'events',
    'eventBodyTemplate',
    'eventColor',
    'eventLayout',
    'eventStyle',
    'eventRenderer',
    'resources',
    'readonly',
    'rowHeight',
    'responsiveLevels',
    'viewPreset',
    'crudManager',
    'eventStore',
    'resourceStore',
    'assignmentStore',
    'dependencyStore',
    'listeners'
  ]

  // Configs
  @Input() autoHeight = false
  @Input() barMargin = 5
  @Input() columns: object[]
  @Input() emptyText: string
  @Input() endDate: any
  @Input() events: object[]
  @Input() eventBodyTemplate: any
  @Input() eventColor: string
  @Input() eventLayout: string
  @Input() eventStyle: string
  @Input() eventRenderer: any
  @Input() resources: object[]
  @Input() readonly = true
  @Input() responsiveLevels: any
  @Input() rowHeight = 150
  @Input() startDate: any
  @Input() viewPreset = 'hourAndDay'
  @Input() listeners: Object
  @Input() crudManager: object
  @Input() eventStore: object
  @Input() resourceStore: object
  @Input() dependencyStore: object
  @Input() assignmentStore: object
  // New ones that we have added
  @Input() zoomLevels: object[]
  @Input() zoomLevel: number
  @Input() centerDate: any
  // Config for all features
  @Input() featureConfig: any

  //Features
  @Input() timeRanges: object[]

  @Output() selectedEvent = ''
  @Output() onSchedulerEvents = new EventEmitter<object>()

  constructor(element: ElementRef) {
    // Needed later, used as target when rendering Bryntum Grid
    this.elementRef = element
  }

  ngOnInit() {
    const // Grid config object
      config: any = {
        // Render scheduler to components element
        appendTo: this.elementRef.nativeElement.firstElementChild,
        features: this.featureConfig,
        listeners: this.listeners
      }

    // Pass configs on to scheduler
    this.configInputs.forEach(configName => {
      if (configName in this) {
        config[configName] = this[configName]
      }
    })

    // Add features to config
    this.featureInputs.forEach(featureName => {
      if (featureName in this) {
        config[featureName] = this[featureName]
      }
    })

    // Explicitly handle new configs we add - probs should be like this instead of current enumeration pattern
    if (this.zoomLevels) {
      config.zoomLevels = this.zoomLevels
      config.minZoomLevel = this.zoomLevels[0]
      config.maxZoomLevel = this.zoomLevels[this.zoomLevels.length - 1]
    }

    const engine = (this.schedulerEngine = new Scheduler(config))
    engine.localeManager.locale = AuLocael
    engine.zoomLevel = this.zoomLevel || engine.minZoomLevel

    // Relay events from eventStore and resourceStore, making them a bit easier to catch in your app.
    // The events are prefixed with 'events' and 'resources', turning and 'add' event into either 'eventsAdd' or
    // 'resourcesAdd'
    if (this.centerDate) {
      engine.scrollToDate(this.centerDate)
    }
    engine.eventStore.relayAll(engine, 'events')
    engine.resourceStore.relayAll(engine, 'resources')
    engine.readOnly = this.readonly
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.schedulerEngine) {
      // Iterate over all changes
      Object.entries(changes).forEach(([name, { currentValue }]) => {
        // Apply changes that match configs to grid
        if (this.configInputs.includes(name)) {
          this.schedulerEngine[name] = currentValue
        }

        if (this.featureInputs.includes(name)) {
          this.schedulerEngine[name] = currentValue
        }
      })

      // explicit
      if (changes.zoomLevel) {
        this.schedulerEngine.zoomLevel =
          changes.zoomLevel.currentValue || this.schedulerEngine.minZoomLevel
      }
    }
  }

  removeEvent() {
    const scheduler = this.schedulerEngine
    scheduler.eventStore.remove(scheduler.selectedEvents)
    this.selectedEvent = ''
  }
}
