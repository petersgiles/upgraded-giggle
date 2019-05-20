import { Component, OnInit, OnDestroy } from '@angular/core'
// import { CommitmentRefinerService } from '../../services/commitment-refiner'
import { Observable, Subscription, of } from 'rxjs'
import {
  map,
  concat,
  concatMap,
  combineLatest,
  withLatestFrom,
  tap
} from 'rxjs/operators'
import * as fromPlanner from '../../reducers/planner/planner.reducer'
import * as fromOverview from '../../reducers/overview/overview.reducer'
import * as fromUser from '../../reducers/user/user.reducer'
import { Store, select } from '@ngrx/store'
import {
  GetEventReferenceData,
  StoreCommitmentEvent,
  RemoveCommitmentEvent,
  StoreSelectedExternalEventTypes,
  StoreSchedulerState,
  GetCommitmentEvents,
  SetPlannerPermission,
  GetExternalEvents
} from '../../reducers/planner/planner.actions'

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
  public commitmentsSubscription: Subscription
  public userPermissionSubscription: Subscription
  public errorStateSubscription: Subscription

  constructor(
    private plannerStore: Store<fromPlanner.State>,
    private overViewStore: Store<fromOverview.State>,
    private userStore: Store<fromUser.State>
  ) {}
  ngOnInit() {
    this.filteredCommitments$ = this.overViewStore
      .pipe(select(fromOverview.selectRefinedCommitmentsState))
      .pipe(map(data => data.map(c => ({ id: c.id, name: c.title }))))

    this.commitmentsSubscription = this.userStore
      .pipe(
        select(fromUser.getUserCurrentUserPlannerPermission),
        withLatestFrom(this.filteredCommitments$)
      )
      .subscribe(([permission, filteredCommitments]) => {
        this.plannerStore.dispatch(
          new GetCommitmentEvents({
            commitments: filteredCommitments,
            permission: permission
          })
        )
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

    this.errorStateSubscription = this.plannerStore
      .pipe(select(fromPlanner.selectPlannerErrortate))
      // TODO: send to seq
      .subscribe(error => console.log(`💥 error => `, error))
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
    this.plannerStore.dispatch(new StoreSchedulerState($event))
  }
  ngOnDestroy(): void {
    this.commitmentsSubscription.unsubscribe()
    this.userPermissionSubscription.unsubscribe()
    this.errorStateSubscription.unsubscribe()
  }
}
