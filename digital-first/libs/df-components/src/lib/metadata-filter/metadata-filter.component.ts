import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'digital-first-metadata-filter',
  templateUrl: './metadata-filter.component.html',
  styleUrls: ['./metadata-filter.component.scss']
})
export class MetadataFilterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  startVisible: boolean

  @Input()
  filterGroups: any[]

  @Output()
  onFilterSelected: EventEmitter<any> = new EventEmitter()

  @Output()
  onSearchCriteriaChanged: EventEmitter<any> = new EventEmitter()

  @Output()
  onSaveFilter: EventEmitter<any> = new EventEmitter()

  @Output()
  onClear: EventEmitter<any> = new EventEmitter()
}
