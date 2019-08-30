import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'
import {
  GetEventReferenceData,
  StoreCommitmentEvent,
  RemoveCommitmentEvent,
  StoreSelectedExternalEventTypes,
  StoreSchedulerZoomLevel,
  GetCommitmentEvents,
  SetPlannerPermission,
  GetExternalEvents,
  StoreSchedulerCenterDate,
  StoreSchedulerPageIndex,
  ResetCommitmentEvents
} from '../../reducers/planner/planner.actions'
import { getUserCurrentUserPlannerPermission } from '../../reducers/user/user.reducer'
import * as fromRefiner from '../../reducers/refiner/refiner.reducer'
import { GetRefinedCommitments } from '../../reducers/overview/overview.actions'
import * as fromPlanner from '../../reducers/planner/planner.reducer'
import * as fromOverview from '../../reducers/overview/overview.reducer'
import { UserState } from '@digital-first/df-app-core'

@Component({
  selector: 'digital-first-planner-page',
  templateUrl: './planner-page.component.html',
  styleUrls: ['./planner-page.component.scss']
})
export class PlannerPageComponent implements OnInit, OnDestroy {
  public commitmentEvents$: Observable<any[]>
  public externalEvents$: Observable<any>
  public eventTypes$: Observable<any[]>
  public filteredCommitments$: Observable<any[]>
  public externalEventTypes$: Observable<any[]>
  public selectedExternalEventTypes$: Observable<any[]>
  public readonly$: Observable<boolean>
  public zoomLevel$: Observable<any>
  public centerDate$: Observable<any>
  public pageIndex$: Observable<any>
  public layoutChange$: Observable<boolean>

  public commitmentsSubscription: Subscription
  public userPermissionSubscription: Subscription
  public refinerGroupsSubscription: any

  constructor(
    private plannerStore: Store<fromPlanner.State>,
    private overViewStore: Store<fromOverview.State>,
    private userStore: Store<UserState>,
    private refinerStore: Store<fromRefiner.State>
  ) {}

  ngOnInit() {
    this.refinerGroupsSubscription = this.plannerStore
      .pipe(select(fromRefiner.selectRefinerGroups))
      .subscribe(() => {
        this.plannerStore.dispatch(new GetRefinedCommitments(null))
      })

    this.filteredCommitments$ = this.overViewStore
      .pipe(select(fromOverview.selectRefinedCommitmentsState))
      .pipe(map(data => data.map(c => ({ id: c.id, name: c.title }))))

    this.commitmentsSubscription = this.filteredCommitments$.subscribe(_ => {
      // this.plannerStore.dispatch(new ResetCommitmentEvents(null))
      this.plannerStore.dispatch(new StoreSchedulerPageIndex(0))
      this.plannerStore.dispatch(new GetCommitmentEvents(null))
    })

    this.userPermissionSubscription = this.userStore
      .pipe(select(getUserCurrentUserPlannerPermission))
      .subscribe(permission => {
        this.plannerStore.dispatch(new GetEventReferenceData(permission))
        this.plannerStore.dispatch(new SetPlannerPermission(permission))
        this.plannerStore.dispatch(
          new GetExternalEvents({
            permission: permission,
            selectedExternalEventTypes: null
          })
        )
      })
    this.wireUpState()
  }

  private wireUpState() {
    this.layoutChange$ = this.refinerStore.pipe(
      select(fromRefiner.selectcurrentRrefinerDrawerOpen)
    )
    this.externalEventTypes$ = this.plannerStore.pipe(
      select(fromPlanner.selectExternalEventTypesState)
    )
    this.commitmentEvents$ = this.plannerStore.pipe(
      select(fromPlanner.selectEventsState)
    )
    this.eventTypes$ = this.plannerStore.pipe(
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
    this.pageIndex$ = this.plannerStore.pipe(
      select(fromPlanner.selectSchedulerPageIndexState)
    )
  }

  handleEventSaved($event: any) {
    this.plannerStore.dispatch(new StoreCommitmentEvent({ data: $event }))
  }

  handleEventRemoved($event: any) {
    this.plannerStore.dispatch(new RemoveCommitmentEvent({ data: $event }))
  }

  handleExternalEventChange($event) {
    this.plannerStore.dispatch(new StoreSelectedExternalEventTypes($event))
    this.plannerStore.dispatch(
      new GetExternalEvents({
        permission: '',
        selectedExternalEventTypes: $event
      })
    )
  }

  handelZoomLevelChange($event) {
    this.plannerStore.dispatch(new StoreSchedulerZoomLevel($event))
  }

  handelCenterDateChange($event) {
    this.plannerStore.dispatch(new StoreSchedulerCenterDate($event))
  }

  handelPageIndexChange($event) {
    this.plannerStore.dispatch(new StoreSchedulerPageIndex($event))
    this.plannerStore.dispatch(new GetCommitmentEvents(null))
  }

  ngOnDestroy(): void {
    this.commitmentsSubscription.unsubscribe()
    this.userPermissionSubscription.unsubscribe()
  }
}
