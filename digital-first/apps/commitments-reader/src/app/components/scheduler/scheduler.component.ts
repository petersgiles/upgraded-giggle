import {Component, OnInit, OnChanges, ElementRef, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {Scheduler} from 'bryntum-scheduler';

@Component({
  selector: 'scheduler',
  template: '<div></div>'
})
export class SchedulerComponent implements OnInit, OnChanges {

  private elementRef: ElementRef;
  public schedulerEngine: Scheduler;

  // Available features
  private featureInputs = [
    'cellEdit', 'cellTooltip', 'columnLines', 'columnPicker', 'columnReorder', 'columnResize', 'contextMenu',
    'dependencies', 'eventDrag', 'eventContextMenu', 'eventDragCreate', 'eventEdit',
    'eventFilter', 'eventResize', 'eventTooltip', 'filter', 'filterBar', 'group', 'groupSummary', 'headerContextMenu', 'labels',
    'nonWorkingTime', 'regionResize', 'search', 'scheduleTooltip', 'sort', 'stripe', 'summary', 'timeRanges', 'tree'
  ];

  // Available configs
  private configInputs = ['autoHeight', 'barMargin', 'columns', 'emptyText', 'endDate', 'events',
    'eventBodyTemplate', 'eventColor', 'eventLayout', 'eventStyle', 'eventRenderer', 'resources', 'readOnly',
    'rowHeight', 'responsiveLevels', 'viewPreset', 'startDate', 'crudManager', 'eventStore', 'resourceStore',
    'assignmentStore', 'dependencyStore'
  ];

  // Configs
  @Input() autoHeight: boolean = true;
  @Input() barMargin: number = 5;
  @Input() columns: object[];
  @Input() emptyText: string;
  @Input() endDate: any;
  @Input() events: object[];
  @Input() eventBodyTemplate: any;
  @Input() eventColor: string;
  @Input() eventLayout: string;
  @Input() eventStyle: string;
  @Input() eventRenderer: any;
  @Input() resources: object[];
  @Input() readOnly: boolean = false;
  @Input() responsiveLevels: any;
  @Input() rowHeight: number = 60;
  @Input() startDate: any;
  @Input() viewPreset: string = 'weekAndDay';

  @Input() crudManager: object;
  @Input() eventStore: object;
  @Input() resourceStore: object;
  @Input() dependencyStore: object;
  @Input() assignmentStore: object;

  // Features, only used for initialization
  @Input() cellEdit: boolean | object = true;
  @Input() cellTooltip: boolean | object = true;
  @Input() columnLines: boolean | object = true;
  @Input() columnPicker: boolean = true;
  @Input() columnReorder: boolean = true;
  @Input() columnResize: boolean = true;
  @Input() contextMenu: boolean | object;
  @Input() dependencies: boolean | object = false;
  @Input() eventDrag: boolean | object = true;
  @Input() eventContextMenu: boolean | object = true;
  @Input() eventDragCreate: boolean | object = true;
  @Input() eventEdit: boolean | object = true;
  @Input() eventFilter: boolean | object = true;
  @Input() eventResize: boolean | object = true;
  @Input() eventTooltip: boolean | object = true;
  @Input() filter: boolean | object;
  @Input() filterBar: boolean | object;
  @Input() group: boolean | object | string = true;
  @Input() groupSummary: boolean | object;
  @Input() headerContextMenu: boolean | object;
  @Input() labels: boolean | object;
  @Input() nonWorkingTime: boolean;
  @Input() regionResize: boolean;
  @Input() search: boolean;
  @Input() scheduleTooltip: boolean | object = true;
  @Input() sort: boolean | object | string = true;
  @Input() stripe: boolean;
  @Input() summary: boolean | object;
  @Input() timeRanges: boolean | object[] = true;
  @Input() tree: boolean;

  @Output() selectedEvent: string = '';
  @Output() onSchedulerEvents = new EventEmitter<object>();

  constructor(element: ElementRef) {
    // Needed later, used as target when rendering Bryntum Grid
    this.elementRef = element;
  }

  ngOnInit() {
    const
      // Features config object
      featureConfig = {},
      // Grid config object
      config = {
        // Render scheduler to components element
        appendTo: this.elementRef.nativeElement.firstElementChild,

        // Listeners, will relay events
        listeners: {
          catchAll(event) {
            if (event.type === 'eventselectionchange') {
              this.selectedEvent = event.selected.length ? event.selected[0].name : '';
            }

            this.onSchedulerEvents.emit(event);
          },

          thisObj: this
        },

        features: featureConfig
      };

    // Pass configs on to scheduler
    this.configInputs.forEach(configName => {
      if (configName in this) {
        config[configName] = this[configName];
      }
    });

    // Pass feature configs on to scheduler
    this.featureInputs.forEach(featureName => {
      if (featureName in this) {
        featureConfig[featureName] = this[featureName];
      }
    });

    const engine = this.schedulerEngine = new Scheduler(config);

    // Relay events from eventStore and resourceStore, making them a bit easier to catch in your app.
    // The events are prefixed with 'events' and 'resources', turning and 'add' event into either 'eventsAdd' or
    // 'resourcesAdd'
    engine.eventStore.relayAll(engine, 'events');
    engine.resourceStore.relayAll(engine, 'resources');
  }

  ngOnChanges(changes: SimpleChanges) {

    const me = this;

    if (me.schedulerEngine) {
      // Iterate over all changes
      Object.entries(changes).forEach(([name, {currentValue}]) => {
        // Apply changes that match configs to grid
        if (me.configInputs.includes(name)) {
          me.schedulerEngine[name] = currentValue;
        }

        if (me.featureInputs.includes(name)) {
          me.schedulerEngine[name] = currentValue;
        }
      });
    }
  }

  removeEvent() {
    const scheduler = this.schedulerEngine;
    scheduler.eventStore.remove(scheduler.selectedEvents);
    this.selectedEvent = '';
  }

  addEvent() {
    const scheduler = this.schedulerEngine;

    const event = new scheduler.eventStore.modelClass({
      resourceId   : scheduler.resourceStore.first.id,
      startDate    : scheduler.startDate,
      duration     : 1,
      durationUnit : 'h',
      name         : 'New task',
      eventType    : 'Meeting'
    });

    // editEvent is dynamically assigned to Scheduler from the EditEvent feature, and is thus not part of typings
    //@ts-ignore
    scheduler.editEvent(event);
  }
}
