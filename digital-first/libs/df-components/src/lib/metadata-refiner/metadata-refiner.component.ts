import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { RefinerGroup, RefinerType } from './refiner-model'

@Component({
  selector: 'digital-first-metadata-refiner',
  templateUrl: './metadata-refiner.component.html',
  styleUrls: ['./metadata-refiner.component.scss']
})
export class MetadataRefinerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

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
}
