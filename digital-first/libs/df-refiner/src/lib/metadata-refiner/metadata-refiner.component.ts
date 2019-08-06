import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { RefinerType, RefinerGroup } from '@digital-first/df-refiner'
import { FormControl, FormGroup } from '@angular/forms'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RefinerActionService {
  constructor() {}

  // tslint:disable-next-line:variable-name
  public message: BehaviorSubject<string> = new BehaviorSubject(null)
}
@Component({
  selector: 'digital-first-metadata-refiner',
  templateUrl: './metadata-refiner.component.html',
  styleUrls: ['./metadata-refiner.component.scss']
})
export class MetadataRefinerComponent implements OnInit {
  searchControl: FormControl = new FormControl(null, [])

  textRefinerForm = new FormGroup({
    searchControl: this.searchControl
  })

  action$: any
  _refinerGroups: RefinerGroup[]

  constructor() {}

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(
        searchResult => {
          this.onSearchCriteriaChanged.emit(searchResult)
        },
        (err: Error) => {
          // tslint:disable-next-line:no-console
          console.log(err)
        }
      )
  }

  startVisible: boolean

  @Input()
  set refinerGroups(val) {
    this._refinerGroups = val
  }

  get refinerGroups(): RefinerGroup[] {
    return this._refinerGroups
  }

  @Input()
  set searchText(val) {
    this.searchControl.setValue(val)
  }

  @Output()
  onRefinerGroupSelected: EventEmitter<RefinerGroup> = new EventEmitter()

  @Output()
  onRefinerSelected: EventEmitter<RefinerType> = new EventEmitter()

  @Output()
  onSearchCriteriaChanged: EventEmitter<any> = new EventEmitter()

  @Output()
  onSaveRefiner: EventEmitter<any> = new EventEmitter()

  @Output()
  onClear: EventEmitter<any> = new EventEmitter()

  handleOnClear() {
    this.searchControl.reset()
  }
}
