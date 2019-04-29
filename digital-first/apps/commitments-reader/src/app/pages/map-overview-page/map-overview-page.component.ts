import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core'
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  CommitmentsMapPointSearchGQL,
  WhereExpressionGraph,
  ComparisonGraph,
  MapPointGraph
} from '../../generated/graphql'
import { SettingsService } from '../../services/settings.service'
import {
  CommitmentRefinerService,
  DataTableColumn
} from '../../services/commitment-refiner'
interface CommitmentRow {
  id: number
  title: string
  politicalParty: string
  announcedBy: string
  announcementType?: string
  criticalDate?: string
  portfolio?: string
  mapPoints?: any[]
}
@Component({
  selector: 'digital-first-map-overview-page',
  templateUrl: './map-overview-page.component.html',
  styleUrls: ['./map-overview-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapOverviewPageComponent implements OnInit, OnDestroy {
  public latitude: number
  public longitude: number

  public zoom: number
  public mapPoints: any[] = []
  public mapPointSelectedCommitments: any[] = []
  public columns$: Observable<DataTableColumn[]>
  public filterCommitmentMapPoints$: BehaviorSubject<CommitmentRow[]>
  public filterCommitments$: Observable<CommitmentRow[]>
  public rows: CommitmentRow[] = []

  subscription1: Subscription
  subscription2: Subscription
  subscriptionRefiner: Subscription

  constructor(
    private settings: SettingsService,
    private dataService: CommitmentRefinerService,
    private commitmentsMapPointSearchGQL: CommitmentsMapPointSearchGQL,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.latitude = -27.698
    this.longitude = 133.8807
    this.zoom = 5
    this.columns$ = this.dataService.columns$

    this.getMapPointsOfCommitments()
    this.dataService.getRefinedCommitments()
    this.dataService.getMapPoints()
  }

  getMapPointsOfCommitments() {
    console.log('WHAT IS EVEN GOING ON HERE?')
    this.dataService.mapPoints$.subscribe(value => {
      this.mapPoints = value.map(mp => mp[0])
    })
  }

  handleMapPointSelected(mapPoint) {
    this.filterCommitmentMapPoints$ = null
    this.rows = []
    const whereVal: WhereExpressionGraph = {
      path: 'id',
      comparison: ComparisonGraph.Equal,
      value: [mapPoint.id.toString()]
    }

    this.subscription2 = this.commitmentsMapPointSearchGQL
      .fetch({ mapPointWhere: whereVal }, { fetchPolicy: 'network-only' })
      .pipe(map(value => value.data.mapPoints))
      .subscribe(mapPoints => {
        mapPoints.map(x =>
          x.commitmentMapPoints.map(dbItem => {
            const row: CommitmentRow = {
              id: dbItem.commitment.id,
              title: dbItem.commitment.title,
              politicalParty: dbItem.commitment.politicalParty,
              announcedBy: dbItem.commitment.announcedBy,
              announcementType: dbItem.commitment.announcementType
                ? dbItem.commitment.announcementType.title
                : '',
              criticalDate: dbItem.commitment.criticalDate
                ? dbItem.commitment.criticalDate.title
                : '',
              portfolio: dbItem.commitment.portfolioLookup
                ? dbItem.commitment.portfolioLookup.title
                : '',
              mapPoints: []
            }
            this.rows.push(row)
          })
        )
        this.filterCommitmentMapPoints$ = new BehaviorSubject(this.rows)
        this.changeDetector.detectChanges()
      })
  }

  getIcon() {
    // This will be based on the commitments portfolio. Pete will provide graphics
    return `${this.settings.assetsPath}/
      beachflag.png
    `
  }
  ngOnDestroy(): void {
    // this.subscription1.unsubscribe()
    if (this.subscription2) {
      this.subscription2.unsubscribe()
    }
  }
}
