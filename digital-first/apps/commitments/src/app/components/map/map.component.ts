import { Component, OnInit, Input, ViewChild, ElementRef, NgZone } from '@angular/core'
import { } from 'googlemaps'
import { MouseEvent, MapsAPILoader } from '@agm/core'
import { FormControl } from '@angular/forms'

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

  @ViewChild('search')
  public searchElementRef: ElementRef

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

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
            // get the place result
            const place: google.maps.places.PlaceResult = autocomplete.getPlace()

            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return
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