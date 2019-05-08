import { Component, OnInit, OnDestroy } from '@angular/core'
// import { CommitmentRefinerService } from '../../services/commitment-refiner'
import { Observable, Subscription, of } from 'rxjs'
import { EventSharepointDataService } from '../../services/commitment-event/sharepoint/commitment-event-sharepoint-data.service'
import { switchMap, map, concatMap, tap } from 'rxjs/operators'
import * as fromPlanner from '../../reducers/planner/planner.reducer'
import * as fromOverview from '../../reducers/overview/overview.reducer'
import { Store, select } from '@ngrx/store'
import {
  GetPlannerData,
  PlannerActionTypes
} from '../../reducers/planner/planner.actions'
@Component({
  selector: 'digital-first-planner-page',
  templateUrl: './planner-page.component.html',
  styleUrls: ['./planner-page.component.scss']
})
export class PlannerPageComponent implements OnInit, OnDestroy {
  public commitmentEvents$: Observable<any[]>
  public externalEvents$: Observable<any>
  public commitmentEventTypes$: Observable<any[]>
  public filteredCommitments$: Observable<any[]>
  public externalEventTypes$: Observable<any[]>
  public selectedExternalEventTypes: any[]
  public readOnly: false
  public commitmentsSubscription: Subscription

  constructor(
    private plannerStore: Store<fromPlanner.State>,
    private overviewStore: Store<fromOverview.State>
  ) {}

  selectedExternalEventTypesKey = 'SelectedExternalEventTypes'
  ngOnInit() {
    this.commitmentsSubscription = this.overviewStore
      .pipe(select(fromOverview.selectRefinedCommitmentsState))
      .subscribe(_ => this.plannerStore.dispatch(new GetPlannerData(null)))

    this.filteredCommitments$ = this.plannerStore.pipe(
      select(fromPlanner.selectRefinedCommitmentsState)
    )
    
    this.externalEventTypes$ = of([{ id: '1', name: 'Ext' }])
    this.commitmentEventTypes$ = of(['ext'])
  }

  handleEventSaved($event: any) {
    // this.commitmentEvents$ = this.sharePointDataService
    //   .storeEvent($event)
    //   .pipe(
    //     switchMap(_ =>
    //       this.sharePointDataService
    //         .getEventsByCommitments(this.filteredCommitments)
    //         .pipe(map((events: any) => events.data))
    //     )
    //   )
  }

  handleEventRemoved($event: any) {
    // this.commitmentEvents$ = this.sharePointDataService
    //   .removeEvent($event)
    //   .pipe(
    //     switchMap(_ =>
    //       this.sharePointDataService
    //         .getEventsByCommitments(this.filteredCommitments)
    //         .pipe(map((events: any) => events.data))
    //     )
    //   )
  }

  handleExternalEventChange($event) {
    // localStorage.setItem(
    //   this.selectedExternalEventTypesKey,
    //   JSON.stringify($event)
    // )
    // this.getExternalEvents()
  }

  ngOnDestroy(): void {
    this.commitmentsSubscription.unsubscribe()
  }
}
