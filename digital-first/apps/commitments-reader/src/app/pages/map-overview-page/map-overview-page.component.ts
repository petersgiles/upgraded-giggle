import { Component, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
import { CommitmentPartsFragment, MapPoint } from '../../generated/graphql'
import { SettingsService } from '../../services/settings.service'
import { Router } from '@angular/router'
import { CommitmentRefinerService, DataTableColumn } from '../../services/commitment-refiner'

@Component({
  selector: 'digital-first-map-overview-page',
  templateUrl: './map-overview-page.component.html',
  styleUrls: ['./map-overview-page.component.scss']
})
export class MapOverviewPageComponent implements OnInit {
  public latitude: number
  public longitude: number

  public zoom: number
  public mapPoints$: Observable<MapPoint[]>
  public mapPointCommitments$: Observable<CommitmentPartsFragment[]>
  public columns$: Observable<DataTableColumn[]>

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
    this.mapPoints$ = this.dataService.mapPoints$
    this.mapPointCommitments$ = this.dataService.mapPointCommitments$
  }

  handleRowClicked(row) {
    // this.router.navigate(['/', 'commitment', row.id])
  }

  handleMapPointSelected(_, mapPoint) {}

  getIcon(mapPoint) {
    return `${this.settings.assetsPath}/${mapPoint.iconUrl || 'beachflag.png'}`
  }
}
