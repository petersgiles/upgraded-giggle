import { Component, OnInit, OnDestroy } from '@angular/core'
// import { CommitmentRefinerService } from '../../services/commitment-refiner'
import { Observable, Subscription, of, concat } from 'rxjs'
import { map, tap, concatMap, withLatestFrom } from 'rxjs/operators'
import * as fromPlanner from '../../reducers/planner/planner.reducer'
import * as fromOverview from '../../reducers/overview/overview.reducer'
import * as fromUser from '../../reducers/user/user.reducer'
import { Store, select } from '@ngrx/store'
import {
  GetEventReferenceData,
  StoreCommitmentEvent,
  RemoveCommitmentEvent,
  GetExternalEvents,
  StoreSelectedExternalEventTypes,
  StoreSchedulerState,
  GetCommitmentEvents,
  GetPlannerPermission
} from '../../reducers/planner/planner.actions'
import {
  OPERATION_RIGHT_WRITE,
  OPERATION_PLANNER
} from '../../services/app-data/app-operations'
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
  public selectedExternalEventTypes$: Observable<any[]>
  public readonly$: Observable<boolean>
  public zoomLevel$: Observable<any>
  public centerDate$: Observable<any>
  public commitmentsSubscription: Subscription
  public errorStateSubscription: Subscription

  constructor(
    private plannerStore: Store<fromPlanner.State>,
    private overViewStore: Store<fromOverview.State>,
    private userStore: Store<fromUser.UserState>
  ) {}
  ngOnInit() {
    this.filteredCommitments$ = this.overViewStore
      .pipe(select(fromOverview.selectRefinedCommitmentsState))
      .pipe(map(data => data.map(c => ({ id: c.id, name: c.title }))))

    this.commitmentsSubscription = this.filteredCommitments$.subscribe(
      filteredCommitments => {
        this.plannerStore.dispatch(new GetCommitmentEvents(filteredCommitments))
      }
    )
    this.plannerStore.dispatch(new GetEventReferenceData(null))
    this.plannerStore.dispatch(new GetPlannerPermission(null))
    
    this.externalEventTypes$ = this.plannerStore.pipe(
      select(fromPlanner.selectExternalEventTypesState)
    )
    this.commitmentEvents$ = this.plannerStore.pipe(
      select(fromPlanner.selectEventsState)
    )
    this.commitmentEventTypes$ = this.plannerStore.pipe(
      select(fromPlanner.selectEventTypesState)
    )
    this.selectedExternalEventTypes$ = this.plannerStore.pipe(
      select(fromPlanner.selectSelectedExternalEventTypesState)
    )
    this.readonly$ = this.plannerStore.pipe(
      select(fromPlanner.selectPlannerPermissionState)
    )
    this.externalEvents$ = this.plannerStore.pipe(
      select(fromPlanner.selectExternalEventsState)
    )
    this.centerDate$ = this.plannerStore.pipe(
      select(fromPlanner.selectSchedulerCenterDateState)
    )
    this.zoomLevel$ = this.plannerStore.pipe(
      select(fromPlanner.selectSchedulerZoomLevelState)
    )

    this.errorStateSubscription = this.plannerStore
      .pipe(select(fromPlanner.selectPlannerErrortate))
      // TODO: send to seq
      .subscribe(error => console.log(error))
  }

  handleEventSaved($event: any) {
    this.plannerStore.dispatch(new StoreCommitmentEvent($event))
  }

  handleEventRemoved($event: any) {
    this.plannerStore.dispatch(new RemoveCommitmentEvent($event))
  }

  handleExternalEventChange($event) {
    this.plannerStore.dispatch(new StoreSelectedExternalEventTypes($event))
  }
  handelZoomLevelChange($event) {
    this.plannerStore.dispatch(new StoreSchedulerState($event))
  }
  ngOnDestroy(): void {
    this.commitmentsSubscription.unsubscribe()
    this.errorStateSubscription.unsubscribe()
  }
}
