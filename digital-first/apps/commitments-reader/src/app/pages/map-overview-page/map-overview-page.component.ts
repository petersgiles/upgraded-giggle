import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core'
import { Observable, BehaviorSubject, Subscription } from 'rxjs'
import { SettingsService } from '../../services/settings.service'
// import {
//   CommitmentRefinerService
// } from '../../services/commitment-refiner'
import { DataTableColumn } from '../../models/data-table-column'
import { Router } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as fromMap from '../../reducers/map/map.reducer'
import { MapPoint } from '@digital-first/df-map'
import { CommitmentRow } from '../../models/commitment.model'

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
  public columns = [
    { prop: 'id', name: 'Id' },
    { prop: 'title', name: 'Title' },
    { prop: 'portfolio', name: 'Responsible Portfolio' },
    { prop: 'commitmentType', name: 'Type of Commitment' },
    { prop: 'criticalDate', name: 'Critical Date' }
  ]
  public filteredMapPoints$: Observable<MapPoint[]>
  public selectedMapPointCommitments$: BehaviorSubject<
    CommitmentRow[]
  > = new BehaviorSubject(null)

  constructor(
    private settings: SettingsService,
    private router: Router,
    private store: Store<fromMap.State>
  ) {}

  ngOnInit() {
    this.latitude = -27.698
    this.longitude = 133.8807
    this.zoom = 5

    this.filteredMapPoints$ = this.store.pipe(
      select(fromMap.selectRefinedMapPointsState)
    )
  }

  handleMapPointSelected(mapPoint) {
    const commitments = (
      mapPoint.commitmentMapPoints.map(p => p.commitment) || []
    ).map(row => ({
      id: row.id,
      title: row.title,
      portfolio: row.portfolioLookup ? row.portfolioLookup.title : '',
      commitmentType: row.commitmentType ? row.commitmentType.title : '',
      criticalDate: row.criticalDate ? row.criticalDate.title : ''
    }))

    console.log(`🐲 `, commitments)
    this.selectedMapPointCommitments$.next(commitments)
  }

  getIcon(mapPoint) {
    return `${this.settings.assetsPath}/mapicons/${mapPoint.iconUrl ||
      'beachflag.png'}`
  }

  handleCommitmentsRowClicked(item) {
    this.router.navigate(['/', 'commitment', item.id])
  }

  ngOnDestroy(): void {}
}
