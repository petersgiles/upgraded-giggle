import { Component, OnInit } from '@angular/core'
import { CommitmentRefinerService } from '../../services/commitment-refiner'
import { Observable, Subscription, of } from 'rxjs'
import { EventSharepointDataService } from '../../services/commitment-event/sharepoint/commitment-event-sharepoint-data.service'
import { switchMap, map, concatMap } from 'rxjs/operators'

@Component({
  selector: 'digital-first-planner-page',
  templateUrl: './planner-page.component.html',
  styleUrls: ['./planner-page.component.scss']
})
export class PlannerPageComponent implements OnInit {
  public filteredCommitments: any[]
  public commitmentEvents$: Observable<any[]>
  public externalEvents$: Observable<any>
  public commitmentEventTypes$: Observable<any[]>
  public commitmentsSubscription: Subscription
  public eventTypesSubscription: Subscription
  public readOnly: false
  public showKeyDates: boolean
  constructor(
    private dataService: CommitmentRefinerService,
    private sharePointDataService: EventSharepointDataService
  ) {}

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

    this.eventTypesSubscription = this.sharePointDataService
      .getEventTypes()
      .subscribe(result => (this.commitmentEventTypes$ = of(result.data)))

    this.dataService.getRefinedCommitments()

    this.showKeyDates =
      !localStorage.getItem('showKeyDates') ||
      localStorage.getItem('showKeyDates') === 'true'
    if (this.showKeyDates) {
      this.externalEvents$ = this.sharePointDataService
        .getExternalEvents()
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

  handleToggleKeyDates($event) {
    if ($event) {
      this.externalEvents$ = this.sharePointDataService
        .getExternalEvents()
        .pipe(map(result => result.data))
      this.showKeyDates = true
      localStorage.setItem('showKeyDates', 'true')
    } else {
      this.externalEvents$ = of([])
      this.showKeyDates = false
      localStorage.setItem('showKeyDates', 'false')
    }
  }

  ngOnDestroy(): void {
    this.eventTypesSubscription.unsubscribe()
    this.commitmentsSubscription.unsubscribe()
  }
}
