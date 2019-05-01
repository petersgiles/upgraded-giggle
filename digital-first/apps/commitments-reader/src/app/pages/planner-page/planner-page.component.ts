import { Component, OnInit, OnDestroy } from '@angular/core'
import { CommitmentRefinerService } from '../../services/commitment-refiner'
import { Observable, Subscription, of } from 'rxjs'
import { EventSharepointDataService } from '../../services/commitment-event/sharepoint/commitment-event-sharepoint-data.service'
import { switchMap, map, concatMap } from 'rxjs/operators'

@Component({
  selector: 'digital-first-planner-page',
  templateUrl: './planner-page.component.html',
  styleUrls: ['./planner-page.component.scss']
})
export class PlannerPageComponent implements OnInit, OnDestroy {
  public commitmentEvents$: Observable<any[]>
  public externalEvents$: Observable<any>
  public commitmentEventTypes$: Observable<any[]>
  public filteredCommitments: any[]

  public externalEventTypes$: Observable<any[]>
  public selectedExternalEventTypes: any[]
  public readOnly: false
  public commitmentsSubscription: Subscription
  public spReferenceDataSubscription: Subscription
  constructor(
    private dataService: CommitmentRefinerService,
    private sharePointDataService: EventSharepointDataService
  ) {}

  selectedExternalEventTypesKey = 'SelectedExternalEventTypes'
  ngOnInit() {
    this.commitmentsSubscription = this.dataService.commitments$.subscribe(
      result => {
        const commitments = result.map(c => ({ id: c.id, name: c.title }))
        this.filteredCommitments = commitments
        this.commitmentEvents$ = this.sharePointDataService
          .getEventsByCommitments(result)
          .pipe(map(events => events.data))
      }
    )

    this.spReferenceDataSubscription = this.sharePointDataService
      .getEventTypes()
      .subscribe(result => (this.commitmentEventTypes$ = of(result.data)))

    this.externalEventTypes$ = this.sharePointDataService
      .getExternalEventTypes()
      .pipe(concatMap(result => of(result.data)))

    this.dataService.getRefinedCommitments()

    this.getExternalEvents()
  }

  private getExternalEvents() {
    this.selectedExternalEventTypes =
      (localStorage.getItem(this.selectedExternalEventTypesKey) &&
        JSON.parse(localStorage.getItem(this.selectedExternalEventTypesKey))) ||
      []
    if (
      this.selectedExternalEventTypes &&
      this.selectedExternalEventTypes.length > 0
    ) {
      this.externalEvents$ = this.sharePointDataService
        .getExternalEvents(this.selectedExternalEventTypes)
        .pipe(map(result => result.data))
    } else {
      this.externalEvents$ = of([])
    }
  }

  handleEventSaved($event: any) {
    this.commitmentEvents$ = this.sharePointDataService
      .storeEvent($event)
      .pipe(
        switchMap(_ =>
          this.sharePointDataService
            .getEventsByCommitments(this.filteredCommitments)
            .pipe(map((events: any) => events.data))
        )
      )
  }

  handleEventRemoved($event: any) {
    this.commitmentEvents$ = this.sharePointDataService
      .removeEvent($event)
      .pipe(
        switchMap(_ =>
          this.sharePointDataService
            .getEventsByCommitments(this.filteredCommitments)
            .pipe(map((events: any) => events.data))
        )
      )
  }

  handleExternalEventChange($event) {
    localStorage.setItem(
      this.selectedExternalEventTypesKey,
      JSON.stringify($event)
    )
    this.getExternalEvents()
  }

  ngOnDestroy(): void {
    this.spReferenceDataSubscription.unsubscribe()
    this.commitmentsSubscription.unsubscribe()
  }
}
