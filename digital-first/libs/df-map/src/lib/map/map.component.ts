/// <reference types="@types/googlemaps" />
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  NgZone,
  Output,
  EventEmitter
} from '@angular/core'
import { MapsAPILoader } from '@agm/core'
import { FormControl } from '@angular/forms'
import { MapPoint } from './map-point-model'
import { getLatLngCenter } from '@df/utils'
import { DataTableConfig } from '@digital-first/df-datatable'

@Component({
  selector: 'digital-first-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public latitude: number
  public longitude: number

  public searchControl: FormControl
  public zoom: number
  public mapPoint: MapPoint
  _mapPoints: MapPoint[]
  _mapPointTableData: DataTableConfig

  @ViewChild('search', { static: true }) public searchElementRef: ElementRef
  centre: any

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  @Input() readOnly = false

  @Input()
  centreDefault = {
    latitude: -33.8688,
    longitude: 151.2092
  }

  @Input()
  set mapPoints(val: MapPoint[]) {
    this._mapPoints = val

    this._mapPointTableData = this.mapMapPointToDataTable(val)

    // set centre position
    if (this._mapPoints && this._mapPoints.length) {
      this.zoom = Math.max(12 - val.length, 2)
      this.centre = getLatLngCenter(val)
    }

    this.setCurrentPosition(this.centre)
  }

  get mapPoints() {
    return this._mapPoints
  }

  mapMapPointToDataTable(data: MapPoint[]) {
    const rows = data
      ? data.filter(c => c && c.place_id).map(c => ({
          id: c.place_id,
          cells: [
            {
              value: c.address
            }
          ]
        }))
      : []

    const dtc: DataTableConfig = {
      title: 'map points',
      headings: [{ caption: 'Address' }],
      rows: rows
    }

    return dtc
  }

  @Output() onAddMapPoint: EventEmitter<any> = new EventEmitter()
  @Output() onDeleteMapPoint: EventEmitter<any> = new EventEmitter()

  handleAddItem($event) {
    this.onAddMapPoint.emit({ ...this.mapPoint })
    this.mapPoint = null
  }

  handleMapPointTableDeleteClicked($event) {
    const mapPointtoRemove = $event
    this.onDeleteMapPoint.emit(mapPointtoRemove)
  }

  ngOnInit() {
    // set google maps defaults
    this.zoom = 8

    this.latitude = this.centreDefault.latitude
    this.longitude = this.centreDefault.longitude

    // set centre position
    if (!this._mapPoints || this._mapPoints.length === 0) {
      this.centre = this.centreDefault
    } else {
      this.centre = getLatLngCenter(this._mapPoints)
    }

    this.setCurrentPosition(this.centre)

    // create search FormControl
    this.searchControl = new FormControl()
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = null
      if (this.searchElementRef) {
        autocomplete = new google.maps.places.Autocomplete(
          this.searchElementRef.nativeElement,
          {}
        )

        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            this.mapPoint = null
            // get the place result
            const place: google.maps.places.PlaceResult = autocomplete.getPlace()

            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return
            }

            this.mapPoint = {
              place_id: place.place_id,
              address: place.formatted_address,
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng()
            }
            // set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat()
            this.longitude = place.geometry.location.lng()
          })
        })
      }
    })
  }

  private setCurrentPosition(centre?) {
    if (centre) {
      this.latitude = centre.latitude
      this.longitude = centre.longitude
    } else if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
      })
    }
  }
}
