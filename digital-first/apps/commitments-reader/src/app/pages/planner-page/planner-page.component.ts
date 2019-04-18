import { Component, OnInit, OnDestroy } from '@angular/core'
import { tap, map } from 'rxjs/operators'
import { CommitmentRefinerService } from '../../services/commitment-refiner'
import { Observable, Subject, BehaviorSubject, Subscription, of } from 'rxjs'
import * as timeRanges from '../../components/planner/data/timeRanges.json'
import * as CommonEventTypes from '../../components/planner/data/eventTypes.json'
import {
  CommitmentEvent,
  CommitmentEventType,
  ExternalEvent
} from '../../models/commitment-event.model'
import { CommitmentGraph } from '../../generated/graphql'

@Component({
  selector: 'digital-first-planner-page',
  templateUrl: './planner-page.component.html',
  styleUrls: ['./planner-page.component.scss']
})
export class PlannerPageComponent implements OnInit {
  public plannerCommitments$: Observable<any[]>
  public commitmentEvents$: BehaviorSubject<any[]> = new BehaviorSubject(
    CommonEventTypes
  )
  public externalEvents$: BehaviorSubject<any[]> = new BehaviorSubject(
    timeRanges
  )
  public commitmentEventTypes$: BehaviorSubject<any> = new BehaviorSubject([])

  private plannerSubscription$: Subscription
  constructor(private dataService: CommitmentRefinerService) {}

  ngOnInit() {
    this.dataService.commitments$.subscribe(commitments => {
      const rows = commitments.map(c => ({
        id: c.id,
        name: c.title
      }))
      this.plannerCommitments$ = of(rows)
    })
    if (JSON.parse(localStorage.getItem('commitmentEvents'))) {
      this.commitmentEvents$.next(
        JSON.parse(localStorage.getItem('commitmentEvents'))
      )
    }
    this.commitmentEventTypes$.next(CommonEventTypes)
    this.dataService.getRefinedCommitments()
  }

  handleEventSaved($event: any) {
    const events = this.commitmentEvents$.getValue()
    if (!events.find(c => c.id === $event.id)) {
      events.push($event)
    }
    this.commitmentEvents$.next(events)
    localStorage.setItem('commitmentEvents', JSON.stringify(events))
  }
  handleEventRemoved($event: any) {
    const events = this.commitmentEvents$.getValue()
    this.commitmentEvents$.next(events.filter(e => e.id === $event.id))
    // TODO: Delete data from sharepoint then refresh current events
  }

  ngOnDestroy(): void {}
}
