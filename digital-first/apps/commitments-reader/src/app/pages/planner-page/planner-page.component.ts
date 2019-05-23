import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, Subscription, of } from 'rxjs'
import { map, withLatestFrom } from 'rxjs/operators'
import * as fromPlanner from '../../reducers/planner/planner.reducer'
import * as fromOverview from '../../reducers/overview/overview.reducer'
import * as fromUser from '../../reducers/user/user.reducer'
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

@Component({
  selector: 'digital-first-planner-page',
  templateUrl: './planner-page.component.html',
  styleUrls: ['./planner-page.component.scss']
})
export class PlannerPageComponent implements OnInit, OnDestroy {
  private pageSize = 100
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
  public commitmentsSubscription: Subscription
  public userPermissionSubscription: Subscription
  public errorStateSubscription: Subscription

  constructor(
    private plannerStore: Store<fromPlanner.State>,
    private overViewStore: Store<fromOverview.State>,
    private userStore: Store<fromUser.State>
  ) {}
  ngOnInit() {
    // this.plannerStore.dispatch(new StoreSchedulerPageIndex({ pageIndex: 0 }))
    this.filteredCommitments$ = this.overViewStore
      .pipe(select(fromOverview.selectRefinedCommitmentsState))
      .pipe(map(data => data.map(c => ({ id: c.id, name: c.title }))))

    this.commitmentsSubscription = this.filteredCommitments$.subscribe(_ => {
      this.plannerStore.dispatch(new ResetCommitmentEvents(null))
      this.plannerStore.dispatch(new StoreSchedulerPageIndex(0))
      this.plannerStore.dispatch(new GetCommitmentEvents(null))
    })

    this.userPermissionSubscription = this.userStore
      .pipe(select(fromUser.getUserCurrentUserPlannerPermission))
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
