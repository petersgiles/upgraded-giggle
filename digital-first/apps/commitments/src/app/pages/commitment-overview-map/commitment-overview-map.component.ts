import { Component, OnInit } from '@angular/core'
import { CommitmentOverviewMapService } from '../../reducers/commitment-overview-map/commitment-overview-map.service'
import { Observable } from 'rxjs'
import { MapPoint } from '@digital-first/df-components'

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

  constructor(private service: CommitmentOverviewMapService) { }

  ngOnInit() {
    this.latitude = -27.698
    this.longitude = 133.8807
    this.zoom = 5

    this.mapPoints$ = this.service.MapPoints

    this.service.getMapPoints()
  }

}
