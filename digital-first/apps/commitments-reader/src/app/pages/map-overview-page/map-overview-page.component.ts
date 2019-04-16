import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, BehaviorSubject } from 'rxjs'
import { first, map, tap, filter, switchMap } from 'rxjs/operators'
import {
  CommitmentPartsFragment,
  MapPointGraph,
  CommitmentMapPointGraph
} from '../../generated/graphql'
import { SettingsService } from '../../services/settings.service'
import { Router } from '@angular/router'
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
  styleUrls: ['./map-overview-page.component.scss']
})
export class MapOverviewPageComponent implements OnInit, OnDestroy {
  public latitude: number
  public longitude: number

  public zoom: number
  public mapPoints: any[]
  public mapPointCommitments$: Observable<CommitmentPartsFragment[]>
  public columns$: Observable<DataTableColumn[]>
  public commitmentMapTableData$: Observable<CommitmentMapPointGraph[]>
  filterCommitmentMapPoints$: BehaviorSubject<CommitmentRow[]>
  public commitmentsTableData$: Observable<CommitmentMapPointGraph[]>
  rows: CommitmentRow[]
  constructor(
    private router: Router,
    private settings: SettingsService,
    private dataService: CommitmentRefinerService
  ) {}

  ngOnInit() {
    this.latitude = -27.698
    this.longitude = 133.8807
    this.zoom = 5
    this.columns$ = this.dataService.columns$

    // this.mapPoints$ = this.dataService.mapPoints$
    this.mapPointCommitments$ = this.dataService.mapPointCommitments$
    this.commitmentMapTableData$ = this.dataService.commitmentsMapPointAll$

    this.commitmentMapTableData$
      .pipe(tap((result: any) => result))
      .subscribe(value => {
        console.log(value)
        this.rows = value.map(cmp => ({
          id: cmp.commitment.id,
          title: cmp.commitment.title,
          politicalParty: cmp.commitment.politicalParty,
          announcedBy: cmp.commitment.announcedBy,
          announcementType: (cmp.commitment.announcementType || {}).title,
          criticalDate: (cmp.commitment.criticalDate || {}).title,
          portfolio: (cmp.commitment.portfolioLookup || {}).title,
          mapPoint: cmp.mapPoint || {}
        }))

        this.filterCommitmentMapPoints$ = new BehaviorSubject(this.rows)
        this.filterCommitmentMapPoints$
          .pipe(tap((result: any) => result))
          .subscribe(value1 => {
            this.mapPoints = value1.map(item => item.mapPoint)
          })
        console.log(this.filterCommitmentMapPoints$)
      })
    this.dataService.getCommitmentMapPointsAll()
  }

  handleRowClicked($event) {
    console.log($event)
  }

  handleMapPointSelected($event, mapPoint) {
    console.log($event, mapPoint)
    this.dataService.selectMapPoint(mapPoint)
  }

  getIcon(mapPoint) {
    return `${this.settings.assetsPath}/${mapPoint.iconUrl || 'beachflag.png'}`
  }

  ngOnDestroy(): void {
    this.filterCommitmentMapPoints$.unsubscribe()
  }
}
