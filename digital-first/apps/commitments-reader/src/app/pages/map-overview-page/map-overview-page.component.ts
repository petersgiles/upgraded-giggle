import { Component, OnInit } from '@angular/core'
import { Observable, of } from 'rxjs'
import { CommitmentsMapPointSearchGQL } from '../../generated/graphql'
import { tap, map } from 'rxjs/operators';
import { SettingsService } from '../../services/settings.service';

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

  constructor(
    private settings: SettingsService,
    private commitmentsMapPointSearchGQL: CommitmentsMapPointSearchGQL
  ) {}

  ngOnInit() {
    this.latitude = -27.698
    this.longitude = 133.8807
    this.zoom = 5
    this.columns = [
      { prop: 'commitmentId', name: 'Id' },
      { prop: 'title', name: 'Title' },
      { prop: 'party', name: 'Party' },
      { prop: 'portfolio', name: 'Responsible Portfolio' },
      { prop: 'commitmentType', name: 'Type of Commitment' }
    ]

    this.mapPoints$ = this.commitmentsMapPointSearchGQL
    .fetch(
      { input: {} },
      { fetchPolicy: 'network-only' }
      )
    .pipe(
      tap(result => console.log(result)),
      map(result => result.data.mappoints)
      )

    this.commitments$ = of(null)

   
  }

  getIcon(mapPoint) {
    return `${this.settings.assetsPath}/${mapPoint.iconUrl || 'beachflag.png'}`
  }
}
