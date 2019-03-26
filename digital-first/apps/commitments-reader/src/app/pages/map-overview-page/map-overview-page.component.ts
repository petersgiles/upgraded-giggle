import { Component, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
import { CommitmentsMapPointSearchGQL } from '../../generated/graphql'
import { tap, map } from 'rxjs/operators'
import { SettingsService } from '../../services/settings.service'
import { Router } from '@angular/router'
import { CommitmentRefinerService } from '../../services/commitment-refiner.service'

@Component({
  selector: 'digital-first-map-overview-page',
  templateUrl: './map-overview-page.component.html',
  styleUrls: ['./map-overview-page.component.scss']
})
export class MapOverviewPageComponent implements OnInit {
  public latitude: number
  public longitude: number

  public zoom: number

  constructor(
    private router: Router,
    private settings: SettingsService,
    private dataService: CommitmentRefinerService
  ) {}

  ngOnInit() {
    this.latitude = -27.698
    this.longitude = 133.8807
    this.zoom = 5
  }

  handleRowClicked(row) {
    // this.router.navigate(['/', 'commitment', row.id])
  }

  handleMapPointSelected(_, mapPoint) {}

  getIcon(mapPoint) {
    return `${this.settings.assetsPath}/${mapPoint.iconUrl || 'beachflag.png'}`
  }
}
