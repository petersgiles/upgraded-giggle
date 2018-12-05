import { Component, OnInit } from '@angular/core'
import { CommitmentOverviewMapService } from '../../reducers/commitment-overview-map/commitment-overview-map.service'
import { Observable } from 'rxjs'
import { MapPoint, DataTableConfig } from '@digital-first/df-components'
import { Router } from '@angular/router'

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

  constructor(private router: Router, private service: CommitmentOverviewMapService) { }

  ngOnInit() {
    this.latitude = -27.698
    this.longitude = 133.8807
    this.zoom = 5

    this.mapPoints$ = this.service.MapPoints
    this.commitments$ = this.service.Commitments

    this.service.getMapPoints()
  }

  handleRowClicked(row) {
    this.router.navigate(['/', 'commitment', row.id])

  }

  handleMapPointSelected(_, mapPoint) {
    // tslint:disable-next-line:no-console
    console.log(mapPoint)

    this.service.getOverviewMapCommitment(mapPoint.place_id)

  }

}
