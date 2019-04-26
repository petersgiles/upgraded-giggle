import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, BehaviorSubject, Subscription } from 'rxjs'
import {
  CommitmentGraph
} from '../../generated/graphql'
import { SettingsService } from '../../services/settings.service'
import {
  CommitmentRefinerService,
  DataTableColumn
} from '../../services/commitment-refiner'

@Component({
  selector: 'digital-first-map-overview-page',
  templateUrl: './map-overview-page.component.html',
  styleUrls: ['./map-overview-page.component.scss']
})
export class MapOverviewPageComponent implements OnInit, OnDestroy {
  public latitude: number
  public longitude: number
  public mapPointClicked: boolean
  public zoom: number
  public mapPoints: any[] = []
  public columns$: Observable<DataTableColumn[]>
  tableFilterCommitments: any[]
  subscription: Subscription

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
    this.subscription = this.dataService.commitments$.subscribe(
      value => {
        this.tableFilterCommitments = value.map(row => ({
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
    })
  }

  getIcon() {
    const tempIconsToBeReplacedByPortfolio = [
      'constructioncrane.png',
      'jetfighter.png',
      'powerlinepole.png',
      'shipwreck.png',
      'welding.png',
      'beachflag.png'
    ]
    const index = Math.floor(
      Math.random() * tempIconsToBeReplacedByPortfolio.length
    )

    return `${this.settings.assetsPath}/${
      tempIconsToBeReplacedByPortfolio[index]
    }`
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
