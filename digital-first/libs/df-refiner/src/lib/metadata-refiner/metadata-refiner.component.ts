import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core'
import { RefinerType, RefinerGroup } from '@digital-first/df-refiner'
import { FormControl } from '@angular/forms'
import { debounceTime, distinctUntilChanged, flatMap } from 'rxjs/operators'

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
  searchControl: FormControl = new FormControl()
  action$: any

  constructor(private ngZone: NgZone, private service: RefinerActionService) {}

  ngOnInit() {
    this.action$ = this.service.message.subscribe(_ => {
      this.searchControl.reset()
    })

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

  @ViewChild('search')
  public searchElementRef: ElementRef

  startVisible: boolean

  @Input()
  refinerGroups: RefinerGroup[]

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

  handleOnClear($event) {
    this.searchControl.reset()
  }
}
