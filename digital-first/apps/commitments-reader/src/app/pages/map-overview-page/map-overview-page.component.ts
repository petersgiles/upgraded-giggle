import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core'
import { Observable, BehaviorSubject, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  CommitmentsMapPointSearchGQL,
  WhereExpressionGraph,
  ComparisonGraph
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
  public columns$: Observable<DataTableColumn[]>
  public filterCommitmentMapPoints$: BehaviorSubject<CommitmentRow[]>
  public filterCommitments$: Observable<CommitmentRow[]>
  public rows: CommitmentRow[] = []

  subscriptionMapPointSelection: Subscription

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
    this.dataService.mapPoints$.subscribe(value => {
      this.mapPoints = value.map(mp => mp[0])
    })
  }

  handleMapPointSelected(mapPoint) {
    this.filterCommitmentMapPoints$ = null
    this.rows = []
    const whereVal: WhereExpressionGraph = {
      path: 'mapPointId',
      comparison: ComparisonGraph.Equal,
      value: [mapPoint.id.toString()]
    }

    this.subscriptionMapPointSelection = this.commitmentsMapPointSearchGQL
      .fetch(
        { commitmentMapPointsWhere: whereVal },
        { fetchPolicy: 'network-only' }
      )
      .pipe(map(value => value.data.commitmentMapPoints))
      .subscribe(commitmentMapPoints => {
        commitmentMapPoints
          .map(cmp => cmp.commitment)
          .map(commitment => {
            const row: CommitmentRow = {
              id: commitment.id,
              title: commitment.title,
              politicalParty: commitment.politicalParty,
              announcedBy: commitment.announcedBy,
              announcementType: commitment.announcementType
                ? commitment.announcementType.title
                : '',
              criticalDate: commitment.criticalDate
                ? commitment.criticalDate.title
                : '',
              portfolio: commitment.portfolioLookup
                ? commitment.portfolioLookup.title
                : ''
            }
            this.rows.push(row)
          })

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
    if (this.subscriptionMapPointSelection) {
      this.subscriptionMapPointSelection.unsubscribe()
    }
  }
}
