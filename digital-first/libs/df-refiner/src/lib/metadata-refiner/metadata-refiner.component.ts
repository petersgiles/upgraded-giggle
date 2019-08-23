import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core'
import { RefinerType, RefinerGroup } from '@digital-first/df-refiner'
import { FormControl, FormGroup } from '@angular/forms'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'digital-first-metadata-refiner',
  templateUrl: './metadata-refiner.component.html',
  styleUrls: ['./metadata-refiner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetadataRefinerComponent implements OnInit, OnDestroy {
  searchControl: FormControl = new FormControl(null, [])
  textRefinerSubscription: Subscription
  textRefinerForm = new FormGroup({
    searchControl: this.searchControl
  })

  moreOptionsLimit: number = 10
  action$: any
  _refinerGroups: RefinerGroup[]
  constructor() {}

  ngOnInit() {
    this.textRefinerSubscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(
        searchResult => {
          this.onSearchCriteriaChanged.emit(searchResult)
        },
        (err: Error) => {
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

  @Output()
  onMoreOptionsClick: EventEmitter<any> = new EventEmitter()

  handleOnRefinerSelected(refiner) {
    this.onRefinerSelected.emit(refiner)
  }
  handleOnClear() {
    this.searchControl.reset()
  }
  trackRefiner(index, refiner) {
    return refiner ? refiner.id : undefined
  }
  ngOnDestroy(): void {
    this.textRefinerSubscription.unsubscribe()
  }
}
