import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs'
import {
  CommitmentMapPointGraph,
  CommitmentGraph
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
  public mapPoints: any[] = []
  public columns$: Observable<DataTableColumn[]>
  filterCommitmentMapPoints$: BehaviorSubject<CommitmentRow[]>
  rows: CommitmentRow[]
  public commitmentsTableData$: Observable<CommitmentGraph[]>
  filterCommitments$: Observable<CommitmentRow[]>

  constructor(
    private settings: SettingsService,
    private dataService: CommitmentRefinerService
  ) {}

  ngOnInit() {
    this.latitude = -27.698
    this.longitude = 133.8807
    this.zoom = 5
    this.columns$ = this.dataService.columns$
    this.getCommitments()
    this.dataService.getRefinedCommitments()
  }

  getCommitments() {
    this.dataService.commitments$.subscribe(value => {
      const rows = value.map(row => ({
        id: row.id,
        title: row.title,
        politicalParty: row.politicalParty,
        announcedBy: row.announcedBy,
        announcementType: row.announcementType
          ? row.announcementType.title
          : '',
        criticalDate: row.criticalDate ? row.criticalDate.title : '',
        portfolio: row.portfolioLookup ? row.portfolioLookup.title : '',
        mapPoints: []
      }))

      value.map(item => {
        item.commitmentMapPoints.map(x => {
          if (!this.mapPoints.find(fnd => fnd.id === x.id)) {
            this.mapPoints.push(x.mapPoint)
          }
        })
      })
      this.filterCommitments$ = of(rows)
    })
    this.dataService.getRefinedCommitments()
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

  ngOnDestroy(): void {}
}
