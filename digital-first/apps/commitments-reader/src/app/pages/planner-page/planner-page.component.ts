import { Component, OnInit } from '@angular/core'
import { CommitmentPartsFragment } from '../../generated/graphql'
import { CommitmentRefinerService } from '../../services/commitment-refiner'
import { Observable, Subject, BehaviorSubject } from 'rxjs'
import { CommitmentEvent } from '../../models/commitment-event.model'
@Component({
  selector: 'digital-first-planner-page',
  templateUrl: './planner-page.component.html',
  styleUrls: ['./planner-page.component.scss']
})
export class PlannerPageComponent implements OnInit {
  public plannerCommitments$: Observable<CommitmentPartsFragment[]>
  public commitmentEvents$: BehaviorSubject<CommitmentEvent[]> = new BehaviorSubject([])

  constructor(private dataService: CommitmentRefinerService) {}

  ngOnInit() {
    this.plannerCommitments$ = this.dataService.commitments$
    this.dataService.getPlannerPage()
    if (JSON.parse(localStorage.getItem('commitmentEvents'))) {
      this.commitmentEvents$.next(
        JSON.parse(localStorage.getItem('commitmentEvents'))
      )
    }
  }

  handelEventSaved($event: any) {
    const events = this.commitmentEvents$.getValue()
    // this is where upsert happening
    // TODO Reload data from sharepoint
    this.commitmentEvents$.next(events)
    localStorage.setItem('commitmentEvents', JSON.stringify(events))
  }
  handelEventDeleted($event: any) {
    // TODO Delete data from sharepoint then refresh current events
  }
}
