import { LoggerService } from '@digital-first/df-logging'
import { Component, OnInit } from '@angular/core'
import { CommitmentOverviewMapService } from '../../reducers/commitment-overview-map/commitment-overview-map.service'
import { Observable } from 'rxjs'
import { MapPoint } from '@digital-first/df-map'
import { Router } from '@angular/router'
import { DataTableConfig } from '@digital-first/df-datatable'

@Component({
  selector: 'digital-first-commitment-overview-map',
  templateUrl: './commitment-overview-map.component.html',
  styleUrls: ['./commitment-overview-map.component.scss']
})
export class CommitmentOverviewMapComponent implements OnInit {
  public latitude: number
  public longitude: number

  public zoom: number
  mapPoints$: Observable<MapPoint[]>
  commitments$: Observable<DataTableConfig>
  columns: { prop: string; name: string }[]

  constructor(
    private router: Router,
    private service: CommitmentOverviewMapService
  ) {}

  ngOnInit() {
    this.latitude = -27.698
    this.longitude = 133.8807
    this.zoom = 5

    this.mapPoints$ = this.service.RefinedMapPoints
    this.commitments$ = this.service.Commitments

    this.columns = [
      { prop: 'commitmentId', name: 'Id' },
      { prop: 'title', name: 'Title' },
      { prop: 'party', name: 'Party' },
      { prop: 'portfolio', name: 'Responsible Portfolio' },
      { prop: 'commitmentType', name: 'Type of Commitment' }
    ]

    this.service.getAllCommitments()
    this.service.getCommitmentOverviewCommitmentMapPoints()
    this.service.getMapPoints()
  }

  handleRowClicked(row) {
    this.router.navigate(['/', 'commitment', row.id])
  }

  handleMapPointSelected(_, mapPoint) {
    this.service.getOverviewMapCommitment(mapPoint.place_id)
  }

  getIcon(mapPoint) {
    return `/assets/${mapPoint.iconUrl || 'beachflag.png'}`
  }
}
