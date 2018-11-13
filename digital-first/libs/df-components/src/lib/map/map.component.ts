/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core'
import { MouseEvent, MapsAPILoader } from '@agm/core'
import { FormControl } from '@angular/forms'
import { MapPoint } from './map-point-model'
import { DataTableConfig } from '../data-table/data-table-model'

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

  @ViewChild('search')
  public searchElementRef: ElementRef

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  @Input()
  set mapPoints(val: MapPoint[]) {
    this._mapPoints = val
    this._mapPointTableData = this.mapMapPointToDataTable(val)
  }

  mapMapPointToDataTable(data: MapPoint[]) {
    const rows = data.map(c => ({
      id: c.place_id,
      cells: [{
        value: c.address
      }]
    }))

    const dtc: DataTableConfig = {
      title: 'map points',
      hasDeleteItemButton: true,
      headings: [
        { caption: 'Address' }
      ],
      rows: rows
    }

    return dtc

  }

  @Output() onAddMapPoint: EventEmitter<any> = new EventEmitter()
  @Output() onDeleteMapPoint: EventEmitter<any> = new EventEmitter()

  handleAddItem($event) {
    this.onAddMapPoint.emit(this.mapPoint)
  }

  handleMapPointTableDeleteClicked($event) {
    const mapPointtoRemove = $event
    this.onDeleteMapPoint.emit(mapPointtoRemove)
  }

  ngOnInit() {
    // set google maps defaults
    this.zoom = 8
    this.latitude = 51.678418
    this.longitude = 7.809007

    // create search FormControl
    this.searchControl = new FormControl()

    // set current position
    this.setCurrentPosition()

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      })

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
          this.zoom = 8
        })
      })
    })
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        this.zoom = 8
      })
    }
  }
}