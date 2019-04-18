import { Component, OnInit, OnDestroy } from '@angular/core'
import { tap, map } from 'rxjs/operators'
import { CommitmentRefinerService } from '../../services/commitment-refiner'
import { Observable, BehaviorSubject } from 'rxjs'
import { CommitmentEvent } from '../../models/commitment-event.model'
import { CommitmentGraph } from '../../generated/graphql'

interface CommitmentRow {
  id: number
  title: string
  politicalParty: string
  announcedBy: string
  announcementType?: string
  criticalDate?: string
  portfolio?: string
}
@Component({
  selector: 'digital-first-planner-page',
  templateUrl: './planner-page.component.html',
  styleUrls: ['./planner-page.component.scss']
})
export class PlannerPageComponent implements OnInit {
  public plannerCommitments$: Observable<CommitmentGraph[]>
  public commitmentEvents$: BehaviorSubject<
    CommitmentEvent[]
  > = new BehaviorSubject([])

  constructor(private dataService: CommitmentRefinerService) {}

  ngOnInit() {
    this.plannerCommitments$ = this.dataService.commitments$
    if (JSON.parse(localStorage.getItem('commitmentEvents'))) {
      this.commitmentEvents$.next(
        JSON.parse(localStorage.getItem('commitmentEvents'))
      )
    }
    this.dataService.getRefinedCommitments()
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
