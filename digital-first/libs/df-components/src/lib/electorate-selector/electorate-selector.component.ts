import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FormControl } from '@angular/forms'
import { sortBy } from '@df/utils'

@Component({
  selector: 'digital-first-electorate-selector',
  templateUrl: './electorate-selector.component.html',
  styleUrls: ['./electorate-selector.component.scss']
})
export class ElectorateSelectorComponent implements OnInit {

  _electorates: any

  @Input() selected

  @Input()
  set electorates(val) {
    this._electorates = val

    this._electorates.sort(sortBy('title'))
  }
  @Output() onAddElectorate: EventEmitter<any> = new EventEmitter()
  @Output() onRemoveElectorate: EventEmitter<any> = new EventEmitter()

  public selectControl: FormControl

  constructor() { }

  ngOnInit() {
    // create search FormControl
    this.selectControl = new FormControl()
  }

  handleSelect($event) {

    const id = $event.target.value

    this.onAddElectorate.emit(this._electorates.find(e => e.id === id))

    this.selectControl.setValue(null)

  }

  handleRemove($event) {
    this.onRemoveElectorate.emit($event)
  }
}
