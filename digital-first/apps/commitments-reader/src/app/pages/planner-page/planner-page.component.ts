import { Component, OnInit, OnDestroy } from '@angular/core'
import { CommitmentRefinerService } from '../../services/commitment-refiner'
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs'
import * as timeRanges from '../../components/planner/data/timeRanges.json'
import * as CommonEventTypes from '../../components/planner/data/eventTypes.json'
import { EventSharepointDataService } from '../../services/commitment-event/sharepoint/commitment-event-sharepoint-data.service'
import {
  switchMap,
  map,
  withLatestFrom,
  concatMap,
  catchError
} from 'rxjs/operators'

@Component({
  selector: 'digital-first-planner-page',
  templateUrl: './planner-page.component.html',
  styleUrls: ['./planner-page.component.scss']
})
export class PlannerPageComponent implements OnInit {
  public plannerCommitments$: Observable<any[]>
  public commitmentEvents$: Observable<any[]>
  public externalEvents$: Observable<any>
  public commitmentEventTypes$: Observable<any[]>
  public plannerSubscription: Subscription
  constructor(
    private dataService: CommitmentRefinerService,
    private sharePointDataService: EventSharepointDataService
  ) {}

  ngOnInit() {
    this.plannerCommitments$ = this.dataService.commitments$.pipe(
      map(result => result.map(c => ({ id: c.id, name: c.title })))
    )

    this.commitmentEvents$ = this.dataService.commitments$.pipe(
      map(result => result.map(c => ({ id: c.id, name: c.title }))),
      switchMap(result =>
        this.sharePointDataService
          .getEventsByCommitments(result)
          .pipe(map(events => events.data))
      )
    )
    this.externalEvents$ = this.sharePointDataService
      .getExternalEvents()
      .pipe(map(result => result.data))

    this.plannerSubscription = this.sharePointDataService
      .getEventTypes()
      .subscribe(result => (this.commitmentEventTypes$ = of(result.data)))

    // this.plannerCommitments$ = of([{ id: 1, name: 'test' }])
    // this.commitmentEvents$ = this.sharePointDataService
    //   .getEventsByCommitments([{ id: 1, name: 'test' }])
    //   .pipe(map(events => events.data))
  }

  handleEventSaved($event: any) {
    this.commitmentEvents$ = this.sharePointDataService.storeEvent($event).pipe(
      switchMap(() => this.plannerCommitments$),
      switchMap(result =>
        this.sharePointDataService
          .getEventsByCommitments(result)
          .pipe(map((events: any) => events.data))
      )
    )
  }

  handleEventRemoved($event: any) {
    this.commitmentEvents$ = this.sharePointDataService
      .removeEvent($event)
      .pipe(
        switchMap(() => this.plannerCommitments$),
        switchMap(result =>
          this.sharePointDataService
            .getEventsByCommitments(result)
            .pipe(map((events: any) => events.data))
        )
      )
  }

  ngOnDestroy(): void {
    this.plannerSubscription.unsubscribe()
  }
}
