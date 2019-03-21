import { Component, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'

@Component({
  selector: 'digital-first-map-overview-page',
  templateUrl: './map-overview-page.component.html',
  styleUrls: ['./map-overview-page.component.scss']
})
export class MapOverviewPageComponent implements OnInit {
  public latitude: number
  public longitude: number

  public zoom: number
  mapPoints$: Observable<any[]>
  commitments$: Observable<any>
  columns: { prop: string; name: string }[]

  constructor() {}

  ngOnInit() {
    this.latitude = -27.698
    this.longitude = 133.8807
    this.zoom = 5

    this.mapPoints$ = of(null)
    this.commitments$ = of(null)

    this.columns = [
      { prop: 'commitmentId', name: 'Id' },
      { prop: 'title', name: 'Title' },
      { prop: 'party', name: 'Party' },
      { prop: 'portfolio', name: 'Responsible Portfolio' },
      { prop: 'commitmentType', name: 'Type of Commitment' }
    ]
  }
}
