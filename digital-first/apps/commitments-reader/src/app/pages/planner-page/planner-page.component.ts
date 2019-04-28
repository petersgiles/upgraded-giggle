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

    this.externalEvents$ = this.sharePointDataService
      .getExternalEvents()
      .pipe(map(result => result.data))

    this.eventTypesSubscription = this.sharePointDataService
      .getEventTypes()
      .subscribe(result => (this.commitmentEventTypes$ = of(result.data)))

    this.dataService.getRefinedCommitments()
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

  ngOnDestroy(): void {
    this.eventTypesSubscription.unsubscribe()
    this.commitmentsSubscription.unsubscribe()
  }
}
