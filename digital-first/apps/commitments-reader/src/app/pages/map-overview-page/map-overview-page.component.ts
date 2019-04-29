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

  public mapPoints$: Observable<MapPointGraph[]>

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
  }

  // getMapPointsOfCommitments() {
  //   // TODO: Trim this down to just map points
  //   this.mapPoints = []
  //   this.dataService.commitments$.subscribe(value => {
  //     value.map(row => ({
  //       id: row.id,
  //       title: row.title,
  //       politicalParty: row.politicalParty,
  //       announcedBy: row.announcedBy,
  //       announcementType: row.announcementType
  //         ? row.announcementType.title
  //         : '',
  //       criticalDate: row.criticalDate ? row.criticalDate.title : '',
  //       portfolio: row.portfolioLookup ? row.portfolioLookup.title : '',
  //       mapPoints: []
  //     }))

  //     value.map(item => {
  //       item.commitmentMapPoints.map(x => {
  //         if (!this.mapPoints.find(fnd => fnd.id === x.id)) {
  //           this.mapPoints.push(x.mapPoint)
  //         }
  //       })
  //     })
  //     console.log(this.mapPoints.length)
  //     this.changeDetector.detectChanges()
  //   })
  // }

  getMapPointsOfCommitments() {
    this.dataService.mapPoints$.subscribe(value => {
      console.log(value)
      const mapPoint = value.map(mp => {
        return mp
      })
      this.mapPoints$ = of(mapPoint)
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
