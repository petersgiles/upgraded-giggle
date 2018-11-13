import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'digital-first-electorate-selector',
  templateUrl: './electorate-selector.component.html',
  styleUrls: ['./electorate-selector.component.scss']
})
export class ElectorateSelectorComponent implements OnInit {

  @Input() selected
  @Input() electorates
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

    this.onAddElectorate.emit(this.electorates.find(e => e.id === id))
  }

  handleRemove($event) {
    this.onRemoveElectorate.emit($event)
  }
}
